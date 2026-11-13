// ========================================================
// 하루트립 (HARU TRIP) - 전국 당일치기 관광 프론트엔드 로직
//   - 첫 화면(지역 미선택): 전국 히어로 + 지도 버튼
//   - 지역 선택: 지도 레이어 팝업 → 도시 화면 (?city=<id>)
// 도시를 추가하려면 data_<도시>.js 에 map 좌표를 넣으면 지도·목록에 자동으로 나타납니다.
// ========================================================

// 상태 관리
const state = {
  currentCity: null, // CITIES_DATA의 키 (mokpo, busan, ...) — 첫 화면에서는 null
  activeCourseFilter: 'ALL', // 'ALL' | 'A' | 'B' | 'C'
  searchQuery: '',
  likes: {},      // { [destId]: { count: number, userLiked: boolean } }
  comments: {},   // { [destId]: Array<Comment> }
  activeModalDestId: null,
  sliderIndices: {}, // { [cardId]: currentIndex }
  recs: []           // 현재 도시의 여행자 추천 명소
};

// 로그인 후 자동으로 누를 좋아요 (로그인 전에 좋아요를 눌렀던 명소)
let pendingLikeDest = null;

// 첫 화면 문구 (index.html 에 적힌 기본값을 기억해 두었다가 첫 화면으로 돌아올 때 복원)
const landing = {};

// 동적 로컬스토리지 키
function getStorageKeys() {
  const city = CITIES_DATA[state.currentCity];
  // _v2: 예전에 브라우저에 복사된 예시 후기/좋아요 데이터는 더 이상 쓰지 않음
  return {
    likesKey: `${city.storageKeyLikes}_v2`,
    commentsKey: `${city.storageKeyComments}_v2`
  };
}

// --------------------------------------------------------
// 초기화
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  rememberLanding();
  initNavbarScroll();
  setupSearchEvents();
  setupModalEvents();
  renderRegionPickers();

  // ?city=<id> 가 있으면 그 도시, 없으면 첫 화면. ?map=1 이면 지도 팝업을 바로 엶 (가이드 페이지의 "지역 선택" 링크)
  const params = new URLSearchParams(window.location.search);
  const cityFromUrl = params.get('city');
  if (cityFromUrl && CITIES_DATA[cityFromUrl]) {
    switchCity(cityFromUrl, { scroll: false, history: 'replace' });
  } else {
    showLanding({ history: 'none' });
    if (params.get('map') === '1') openMapModal();
  }

  // 로그인 상태가 정해지면 작성 영역을 다시 그리고, 로그인 직전에 하던 일을 이어서 진행
  Feedback.ready.then(() => {
    refreshAuthAreas();
    resumeAfterLogin();
  });
  Feedback.onAuthChange(onAuthChanged);

  // 브라우저 뒤로/앞으로 가기: 첫 화면 ↔ 도시 화면
  window.addEventListener('popstate', () => {
    const id = new URLSearchParams(window.location.search).get('city');
    if (id && CITIES_DATA[id]) switchCity(id, { scroll: false, history: 'none' });
    else showLanding({ history: 'none' });
  });
});

function rememberLanding() {
  const get = (id) => document.getElementById(id);
  landing.title = document.title;
  landing.desc = get('docDesc') ? get('docDesc').getAttribute('content') : '';
  landing.pill = get('heroPill') ? get('heroPill').innerHTML : '';
  landing.heroTitle = get('heroTitle') ? get('heroTitle').innerHTML : '';
  landing.subtitle = get('heroSubtitle') ? get('heroSubtitle').innerHTML : '';
}

// --------------------------------------------------------
// 첫 화면 (지역 미선택)
// --------------------------------------------------------
function showLanding({ history = 'push' } = {}) {
  state.currentCity = null;
  currentCityId = null;
  COURSES_DATA = [];
  DESTINATIONS_DATA = [];

  document.body.classList.add('is-landing');
  document.title = landing.title;
  const docDesc = document.getElementById('docDesc');
  if (docDesc) docDesc.setAttribute('content', landing.desc);

  const heroSec = document.getElementById('hero');
  if (heroSec) heroSec.style.backgroundImage = '';
  document.getElementById('heroPill').innerHTML = landing.pill;
  document.getElementById('heroTitle').innerHTML = landing.heroTitle;
  document.getElementById('heroSubtitle').innerHTML = landing.subtitle;

  updateRegionPickerButton();
  updateLangSwitch(null);

  if (history === 'push' && window.history.pushState) {
    window.history.pushState({}, '', window.location.pathname);
  }
}

// --------------------------------------------------------
// 도시 전환 (City Switcher) 핵심 로직
//   options.scroll  : 전환 후 맨 위로 스크롤 (기본 true)
//   options.history : 'push'(기본, 뒤로가기로 이전 화면 복귀) | 'replace' | 'none'
// --------------------------------------------------------
function switchCity(cityId, options = {}) {
  if (!CITIES_DATA[cityId]) return;
  // 예전 호출 형식 switchCity(id, false) 호환
  if (typeof options === 'boolean') options = { scroll: options };
  const { scroll = true, history = 'push' } = options;
  const sameCity = state.currentCity === cityId;

  state.currentCity = cityId;
  currentCityId = cityId;
  try { localStorage.setItem('haru_trip_last_city', cityId); } catch (e) { /* 저장소 차단 */ }
  document.body.classList.remove('is-landing');

  // 전역 데이터 포인터 동기화
  COURSES_DATA = CITIES_DATA[cityId].courses;
  DESTINATIONS_DATA = CITIES_DATA[cityId].destinations;

  // 필터 및 검색어 초기화
  state.activeCourseFilter = 'ALL';
  state.searchQuery = '';
  const inlineInput = document.getElementById('inlineSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  if (inlineInput) inlineInput.value = '';
  if (clearBtn) clearBtn.classList.remove('visible');

  // 로컬스토리지 로드
  initStorage();

  // 1. 문서 제목 & 설명
  const city = CITIES_DATA[cityId];
  document.title = city.pageTitle;
  const docDesc = document.getElementById('docDesc');
  if (docDesc) docDesc.setAttribute('content', city.metaDesc);

  // 2. 헤더의 지역 선택 버튼에 현재 도시 표시
  updateRegionPickerButton();

  // 3. 히어로 섹션 갱신
  const heroSec = document.getElementById('hero');
  const heroPill = document.getElementById('heroPill');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');

  if (heroSec) {
    heroSec.style.backgroundImage = `linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.75) 100%), url('${asset(city.heroBg)}')`;
  }
  if (heroPill) heroPill.innerHTML = city.heroPill;
  if (heroTitle) heroTitle.innerHTML = city.heroTitle;
  if (heroSubtitle) heroSubtitle.innerHTML = city.heroSubtitle;

  // 4. 히어로 코스 퀵 점프 뱃지 갱신
  renderHeroCourseBadges();

  // 5. 섹션 타이틀 갱신
  const coursesSecTitle = document.getElementById('coursesSectionTitle');
  const exploreSecTitle = document.getElementById('exploreSectionTitle');
  if (coursesSecTitle) {
    coursesSecTitle.textContent = t('coursesTitle', city.name);
  }
  if (exploreSecTitle) {
    exploreSecTitle.textContent = t('exploreTitle', city.name);
  }

  // 6. 코스 필터 버튼 그룹 갱신
  renderCourseFilterButtons();

  // 7. 코스 카드 & 명소 그리드 렌더링
  renderCourseIntroCards();
  renderDestinations();

  // 7-1. 여행자 추천 명소
  renderRecSection();
  if (Feedback.isRemote) loadRecommendations(cityId);

  // 8. 전국 여행지 박스·지도 핀 활성 상태 동기화
  document.querySelectorAll('.region-box[data-city]').forEach(box => {
    box.classList.toggle('active', box.dataset.city === cityId);
  });
  document.querySelectorAll('[data-pick-city]').forEach(el => {
    el.classList.toggle('active', el.dataset.pickCity === cityId);
  });

  // 9. 푸터 링크 & 언어 전환 링크 갱신
  renderFooterLinks();
  updateLangSwitch(cityId);

  // 지도 팝업이 열려 있다면 닫기
  closeMapModal({ restoreFocus: false });

  // 10. URL 쿼리 파라미터 동기화
  //   replace(첫 로드 등)일 때는 다른 파라미터를 지우지 않음 — Google 로그인 후 돌아온 주소의
  //   ?code= 를 Supabase가 읽어 로그인을 마무리하기 전에 지우면 로그인이 풀림 (code는 feedback.js가 처리 후 삭제)
  if (history === 'push' && !sameCity && window.history.pushState) {
    window.history.pushState({ city: cityId }, '', `${window.location.pathname}?city=${cityId}`);
  } else if (history !== 'none' && window.history.replaceState) {
    const url = new URL(window.location.href);
    url.searchParams.set('city', cityId);
    window.history.replaceState({ city: cityId }, '', url.pathname + url.search + url.hash);
  }

  // 전환 후 최상단으로 부드럽게 스크롤
  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 언어 전환 링크에 현재 도시 유지 (예: en/?city=jeju)
function updateLangSwitch(cityId) {
  const link = document.getElementById('langSwitch');
  if (!link) return;
  if (!link.dataset.base) link.dataset.base = link.getAttribute('href');
  link.setAttribute('href', cityId ? `${link.dataset.base}?city=${cityId}` : link.dataset.base);
}

// --------------------------------------------------------
// 지역 선택: 헤더 버튼 · 지도 팝업 · 첫 화면 바로가기
// --------------------------------------------------------
function allMapCities() {
  const open = Object.values(CITIES_DATA).filter(c => c.map).map(c => ({ ...c, upcoming: false }));
  const soon = (typeof UPCOMING_CITIES !== 'undefined' ? UPCOMING_CITIES : []).map(c => ({ ...c, upcoming: true }));
  return [...open, ...soon];
}

// 위도/경도 → 지도 이미지 안의 위치(%) — generate_map.js 와 같은 투영
function mapPosition({ lat, lng }) {
  const B = MAP_BOUNDS;
  return {
    left: ((lng - B.lngMin) / (B.lngMax - B.lngMin)) * 100,
    top: ((B.latMax - lat) / (B.latMax - B.latMin)) * 100
  };
}

function renderRegionPickers() {
  const cities = allMapCities();

  // 지도 위 핀
  const map = document.getElementById('koreaMap');
  if (map) {
    const pins = cities.map(c => {
      const { left, top } = mapPosition(c.map);
      const style = `left:${left.toFixed(2)}%;top:${top.toFixed(2)}%`;
      if (c.upcoming) {
        return `<span class="map-pin is-upcoming" style="${style}" title="${c.name} · ${t('comingSoon')}">
          <span class="map-pin-dot" aria-hidden="true"></span>
          <span class="map-pin-label">${c.name}<small>${t('comingSoon')}</small></span>
        </span>`;
      }
      return `<button type="button" class="map-pin" style="${style}" data-pick-city="${c.id}" onclick="switchCity('${c.id}')" aria-label="${t('openCity', c.name)}">
          <span class="map-pin-dot" aria-hidden="true"></span>
          <span class="map-pin-label"><span aria-hidden="true">${c.emoji || '📍'}</span> ${c.name}</span>
        </button>`;
    }).join('');
    const islands = [
      { name: t('ulleungdo'), lat: 37.50, lng: 130.86 },
      { name: t('dokdo'), lat: 37.24, lng: 131.87, edge: true }
    ].map(i => {
      const { left, top } = mapPosition(i);
      return `<span class="map-island-label${i.edge ? ' is-edge' : ''}" style="left:${left.toFixed(2)}%;top:${top.toFixed(2)}%">${i.name}</span>`;
    }).join('');
    map.insertAdjacentHTML('beforeend', islands + pins);
  }

  // 지도 옆 목록 (작은 화면·키보드 사용자용)
  const list = document.getElementById('mapCityList');
  if (list) {
    list.innerHTML = cities.map(c => c.upcoming
      ? `<span class="map-city-item is-upcoming"><span aria-hidden="true">${c.emoji || '📍'}</span> ${c.name} <small>${t('comingSoon')}</small></span>`
      : `<button type="button" class="map-city-item" data-pick-city="${c.id}" onclick="switchCity('${c.id}')"><span aria-hidden="true">${c.emoji || '📍'}</span> ${c.name}</button>`
    ).join('');
  }

  // 첫 화면 바로가기 칩
  const quick = document.getElementById('landingQuick');
  if (quick) {
    quick.innerHTML = cities.filter(c => !c.upcoming).map(c =>
      `<a class="landing-chip" href="?city=${c.id}" onclick="switchCity('${c.id}'); return false;"><span aria-hidden="true">${c.emoji || '📍'}</span> ${c.name}</a>`
    ).join('');
  }
}

function updateRegionPickerButton() {
  const city = state.currentCity ? CITIES_DATA[state.currentCity] : null;
  const label = document.getElementById('regionPickerLabel');
  const icon = document.getElementById('regionPickerIcon');
  const btn = document.getElementById('regionPickerBtn');
  if (label) label.textContent = city ? city.name : t('regionPick');
  if (icon) icon.textContent = city ? (city.emoji || '📍') : '🗺️';
  if (btn) {
    btn.classList.toggle('has-city', Boolean(city));
    btn.title = city ? t('regionPickTitle') : t('regionPick');
  }
}

let mapReturnFocus = null;
function openMapModal() {
  const modal = document.getElementById('mapModal');
  if (!modal) return;
  mapReturnFocus = document.activeElement;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const target = modal.querySelector('.map-city-item.active') || document.getElementById('mapCloseBtn');
  if (target) setTimeout(() => target.focus(), 50);
}

function closeMapModal({ restoreFocus = true } = {}) {
  const modal = document.getElementById('mapModal');
  if (!modal || !modal.classList.contains('open')) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (restoreFocus && mapReturnFocus && mapReturnFocus.focus) mapReturnFocus.focus();
}

// --------------------------------------------------------
// 로컬스토리지 초기화 & 로드 (도시별 독립 저장)
// --------------------------------------------------------
function initStorage() {
  const { likesKey, commentsKey } = getStorageKeys();

  const savedLikes = localStorage.getItem(likesKey);
  if (savedLikes) {
    try {
      state.likes = JSON.parse(savedLikes);
    } catch (e) {
      state.likes = {};
    }
  } else {
    state.likes = {};
  }

  const savedComments = localStorage.getItem(commentsKey);
  if (savedComments) {
    try {
      state.comments = JSON.parse(savedComments);
    } catch (e) {
      state.comments = {};
    }
  } else {
    state.comments = {};
  }

  // 기본 데이터와 병합
  DESTINATIONS_DATA.forEach(dest => {
    if (!state.likes[dest.id]) {
      state.likes[dest.id] = {
        count: dest.initialLikes,
        userLiked: false
      };
    }
    if (!state.comments[dest.id]) {
      state.comments[dest.id] = [...dest.initialComments];
    }
    state.sliderIndices[dest.id] = 0;
  });

  if (Feedback.isRemote) {
    loadRemoteFeedback(state.currentCity);
  }
}

// Supabase에서 현재 도시의 좋아요·댓글 불러오기
async function loadRemoteFeedback(cityId) {
  try {
    const data = await Feedback.loadCity(cityId);
    if (state.currentCity !== cityId) return; // 그 사이 다른 도시로 이동함
    DESTINATIONS_DATA.forEach(dest => {
      state.likes[dest.id] = {
        count: Number(data.likes[dest.id] || 0),
        userLiked: data.liked.has(dest.id)
      };
      state.comments[dest.id] = data.comments[dest.id] || [];
      refreshFeedbackUI(dest.id);
    });
    if (pendingLikeDest && Feedback.user) {
      const destId = pendingLikeDest;
      pendingLikeDest = null;
      const card = document.getElementById(`dest-card-${destId}`);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (state.likes[destId] && !state.likes[destId].userLiked) toggleLike(destId);
    }
  } catch (e) {
    console.warn('좋아요/댓글을 불러오지 못했습니다:', e.message);
  }
}

// 카드와 열린 상세보기의 좋아요·댓글 표시 갱신
function refreshFeedbackUI(destId) {
  const like = state.likes[destId] || { count: 0, userLiked: false };
  const list = state.comments[destId] || [];

  const btn = document.getElementById(`like-btn-${destId}`);
  const countEl = document.getElementById(`like-count-${destId}`);
  if (btn && countEl) {
    btn.classList.toggle('liked', like.userLiked);
    btn.querySelector('.heart-icon').textContent = like.userLiked ? '❤️' : '🤍';
    countEl.textContent = like.count;
  }
  const cardCommentCount = document.getElementById(`comment-count-${destId}`);
  if (cardCommentCount) cardCommentCount.textContent = list.length;

  if (state.activeModalDestId === destId) {
    const modalLikeBtn = document.getElementById('modalLikeBtn');
    const modalLikeCount = document.getElementById('modalLikeCount');
    if (modalLikeBtn && modalLikeCount) {
      modalLikeBtn.classList.toggle('liked', like.userLiked);
      modalLikeBtn.querySelector('.heart-icon').textContent = like.userLiked ? '❤️' : '🤍';
      modalLikeCount.textContent = like.count;
    }
    const listEl = document.getElementById('modalCommentsList');
    const modalCount = document.getElementById('modalCommentCount');
    if (listEl) listEl.innerHTML = renderCommentItems(list);
    if (modalCount) modalCount.textContent = `(${list.length})`;
  }
}

function saveLikesToStorage() {
  const { likesKey } = getStorageKeys();
  localStorage.setItem(likesKey, JSON.stringify(state.likes));
}

function saveCommentsToStorage() {
  const { commentsKey } = getStorageKeys();
  localStorage.setItem(commentsKey, JSON.stringify(state.comments));
}

// --------------------------------------------------------
// 내비게이션 스크롤 효과
// --------------------------------------------------------
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// --------------------------------------------------------
// 히어로 코스 퀵 점프 뱃지 렌더링
// --------------------------------------------------------
function renderHeroCourseBadges() {
  const container = document.getElementById('heroCourseBadges');
  if (!container) return;

  container.innerHTML = COURSES_DATA.map(c => `
    <button class="hero-course-pill" onclick="filterByCourse('${c.id}')">
      ${c.icon} ${c.badge} : ${c.title.split('&')[0].trim()}
    </button>
  `).join('');
}

// --------------------------------------------------------
// 코스 필터 버튼 그룹 렌더링
// --------------------------------------------------------
function renderCourseFilterButtons() {
  const container = document.getElementById('courseFilterGroup');
  if (!container) return;

  const allActive = state.activeCourseFilter === 'ALL' ? 'active' : '';

  const courseBtns = COURSES_DATA.map(c => {
    const isActive = state.activeCourseFilter === c.id ? 'active' : '';
    return `
      <button class="filter-btn ${isActive}" data-course="${c.id}" onclick="filterByCourse('${c.id}')">
        ${c.icon} ${c.badge} (${c.title.split('&')[0].trim()})
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <button class="filter-btn ${allActive}" data-course="ALL" onclick="filterByCourse('ALL')">${t('allView')}</button>
    ${courseBtns}
  `;
}

// --------------------------------------------------------
// 푸터 코스 링크 렌더링
// --------------------------------------------------------
function renderFooterLinks() {
  const city = CITIES_DATA[state.currentCity];
  const heading = document.getElementById('footerCourseHeading');
  const linksContainer = document.getElementById('footerCourseLinks');

  if (heading) {
    heading.textContent = t('footerCourseHeading', city.name);
  }
  if (linksContainer) {
    linksContainer.innerHTML = COURSES_DATA.map(c => `
      <li><a href="javascript:filterByCourse('${c.id}')">${c.badge} : ${c.title}</a></li>
    `).join('') + `<li><a href="#exploreSection">${t('footerAllSpots')}</a></li>`;
  }
}

// --------------------------------------------------------
// 코스 소개 카드 렌더링
// --------------------------------------------------------
function renderCourseIntroCards() {
  const container = document.getElementById('courseCardsContainer');
  if (!container) return;

  container.innerHTML = COURSES_DATA.map(course => `
    <div class="course-card course-${course.id}" data-course-id="${course.id}">
      <div class="course-card-top">
        <span class="course-badge">${course.badge}</span>
        <span class="course-icon">${course.icon}</span>
      </div>
      <h3 class="course-card-title">${course.title}</h3>
      <p class="course-card-desc">${course.subtitle}</p>
      
      <div class="course-meta">
        <span>⏱️ ${course.duration}</span>
        <span>📍 ${course.distance}</span>
        <span>🎯 ${t('spotsPerCourse')}</span>
      </div>

      <button class="course-btn-select" onclick="filterByCourse('${course.id}')">
        ${t('viewCourse')}
      </button>
    </div>
  `).join('');
}

// --------------------------------------------------------
// 여행지 목록 렌더링 (슬라이더 포함)
// --------------------------------------------------------
function renderDestinations() {
  const container = document.getElementById('destinationsGrid');
  const countEl = document.getElementById('resultsCount');
  if (!container) return;

  // 필터링 적용
  const filtered = DESTINATIONS_DATA.filter(dest => {
    // 코스 필터
    if (state.activeCourseFilter !== 'ALL' && dest.courseId !== state.activeCourseFilter) {
      return false;
    }
    // 검색어 필터
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      const inName = dest.name.toLowerCase().includes(q);
      const inEng = dest.engName.toLowerCase().includes(q);
      const inShort = dest.shortDesc.toLowerCase().includes(q);
      const inFull = dest.fullDesc.toLowerCase().includes(q);
      const inTags = dest.tags.some(t => t.toLowerCase().includes(q));
      const inCourse = dest.courseBadge.toLowerCase().includes(q);
      if (!inName && !inEng && !inShort && !inFull && !inTags && !inCourse) {
        return false;
      }
    }
    return true;
  });

  if (countEl) {
    countEl.textContent = t('resultsCount', filtered.length);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 2.5rem; margin-bottom: 12px;">🔍</p>
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px;">${t('noResultsTitle')}</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">
          ${t('noResultsDesc')}
        </p>
        <button onclick="resetFilters()" class="filter-btn active" style="padding: 10px 24px;">
          ${t('allView')}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dest => {
    const likeInfo = state.likes[dest.id] || { count: dest.initialLikes, userLiked: false };
    const commentsList = state.comments[dest.id] || [];
    const currentSlide = state.sliderIndices[dest.id] || 0;
    const total = dest.images.length;
    const multi = total > 1;

    return `
      <article class="dest-card" id="dest-card-${dest.id}">
        <!-- 이미지 슬라이더 영역 (각 여행지당 3장) -->
        <div class="card-slider-wrapper" id="slider-${dest.id}">
          <div class="card-top-badges">
            <span class="card-course-pill badge-${dest.courseId}">${dest.courseBadge}</span>
            <span class="card-photo-counter">📸 <span id="counter-${dest.id}">${currentSlide + 1}</span>/${total}</span>
          </div>

          <div class="card-slider-track" id="track-${dest.id}" style="transform: translateX(-${currentSlide * 100}%);"
               onclick="handleCardImageClick('${dest.id}')" title="${t('clickToOpen')}">
            ${dest.images.map((imgSrc, idx) => `
              <div class="card-slide">
                <img src="${asset(imgSrc)}" alt="${dest.name} - ${idx + 1}" loading="lazy" />
                <div class="slide-caption-overlay">${dest.imageCaptions[idx] || dest.name}</div>
              </div>
            `).join('')}
          </div>

          ${multi ? `
          <!-- 좌우 화살표 버튼 -->
          <button class="slider-btn prev" onclick="moveSlide('${dest.id}', -1, event)" aria-label="${t('prevPhoto')}">&#10094;</button>
          <button class="slider-btn next" onclick="moveSlide('${dest.id}', 1, event)" aria-label="${t('nextPhoto')}">&#10095;</button>

          <!-- 하단 인디케이터 도트 -->
          <div class="slider-indicators" id="dots-${dest.id}">
            ${dest.images.map((_, idx) => `
              <span class="slider-dot ${idx === currentSlide ? 'active' : ''}" onclick="goToSlide('${dest.id}', ${idx}, event)"></span>
            `).join('')}
          </div>` : ''}
        </div>

        <!-- 본문 정보 -->
        <div class="dest-card-body">
          <div class="dest-theme-tag">${dest.theme}</div>
          <h3 class="dest-title">${dest.name}</h3>
          <div class="dest-eng-name">${dest.engName}</div>

          <div class="dest-tags">
            ${dest.tags.map(t => `<span class="dest-tag-item">${t}</span>`).join('')}
          </div>

          <p class="dest-short-desc">${dest.shortDesc}</p>

          <div class="dest-info-row">
            <span>📍 ${dest.address}</span>
          </div>

          <!-- 하단 인터랙션 액션 바 -->
          <div class="dest-card-actions">
            <div class="card-stats">
              <!-- 좋아요 버튼 -->
              <button class="like-btn ${likeInfo.userLiked ? 'liked' : ''}" 
                      onclick="toggleLike('${dest.id}', event)" 
                      id="like-btn-${dest.id}">
                <span class="heart-icon">${likeInfo.userLiked ? '❤️' : '🤍'}</span>
                <span class="like-count" id="like-count-${dest.id}">${likeInfo.count}</span>
              </button>

              <!-- 댓글 버튼 -->
              <button class="comment-count-btn" onclick="openDetailModal('${dest.id}')">
                <span>💬</span>
                <span id="comment-count-${dest.id}">${commentsList.length}</span>
              </button>
            </div>

            <button class="btn-detail-view" onclick="openDetailModal('${dest.id}')">
              ${t('detailBtn')}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  bindCardSwipes();
}

// --------------------------------------------------------
// 슬라이더 인터랙션 로직
// --------------------------------------------------------
function moveSlide(destId, step, event) {
  if (event) event.stopPropagation();
  const total = getImageCount(destId);
  if (total < 2) return;
  const current = state.sliderIndices[destId] || 0;
  const next = (current + step + total) % total;
  goToSlide(destId, next);
}

function goToSlide(destId, index, event) {
  if (event) event.stopPropagation();
  state.sliderIndices[destId] = index;
  const track = document.getElementById(`track-${destId}`);
  const counter = document.getElementById(`counter-${destId}`);
  const dotsContainer = document.getElementById(`dots-${destId}`);

  if (track) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  if (counter) {
    counter.textContent = index + 1;
  }
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }
}

// --------------------------------------------------------
// 좋아요(하트) 토글 로직
// --------------------------------------------------------
function toggleLike(destId, event) {
  if (event) event.stopPropagation();
  if (Feedback.isRemote && !Feedback.user) {
    if (confirm(t('loginForLike'))) startLogin({ type: 'like', dest: destId });
    return;
  }
  const item = state.likes[destId];
  if (!item) return;
  const before = { count: item.count, userLiked: item.userLiked };

  // 화면에 먼저 반영
  if (item.userLiked) {
    item.userLiked = false;
    item.count = Math.max(0, item.count - 1);
  } else {
    item.userLiked = true;
    item.count += 1;
  }

  if (Feedback.isRemote) {
    const cityId = state.currentCity;
    Feedback.toggleLike(cityId, destId)
      .then(res => {
        if (state.currentCity !== cityId) return;
        item.userLiked = Boolean(res.liked);
        item.count = Number(res.count) || 0;
        refreshFeedbackUI(destId);
      })
      .catch(err => {
        item.count = before.count;
        item.userLiked = before.userLiked;
        refreshFeedbackUI(destId);
        alert(err.message);
      });
  } else {
    saveLikesToStorage();
  }

  // 카드 내 UI 갱신
  const btn = document.getElementById(`like-btn-${destId}`);
  const countEl = document.getElementById(`like-count-${destId}`);
  if (btn && countEl) {
    btn.classList.toggle('liked', item.userLiked);
    btn.querySelector('.heart-icon').textContent = item.userLiked ? '❤️' : '🤍';
    countEl.textContent = item.count;
  }

  // 모달이 열려 있다면 모달 좋아요도 갱신
  const modalLikeBtn = document.getElementById('modalLikeBtn');
  const modalLikeCount = document.getElementById('modalLikeCount');
  if (state.activeModalDestId === destId && modalLikeBtn && modalLikeCount) {
    modalLikeBtn.classList.toggle('liked', item.userLiked);
    modalLikeBtn.querySelector('.heart-icon').textContent = item.userLiked ? '❤️' : '🤍';
    modalLikeCount.textContent = item.count;
  }
}

// --------------------------------------------------------
// 검색 및 코스 필터 이벤트
// --------------------------------------------------------
function filterByCourse(courseId) {
  state.activeCourseFilter = courseId;

  // 버튼 스타일 갱신
  document.querySelectorAll('.filter-btn[data-course]').forEach(btn => {
    const isCurrent = btn.getAttribute('data-course') === courseId;
    btn.classList.toggle('active', isCurrent);
  });

  renderDestinations();

  // 탐색 영역으로 부드럽게 스크롤
  const exploreSec = document.getElementById('exploreSection');
  if (exploreSec) {
    exploreSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function resetFilters() {
  state.activeCourseFilter = 'ALL';
  state.searchQuery = '';
  const searchInput = document.getElementById('inlineSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-btn[data-course]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-course') === 'ALL');
  });

  renderDestinations();
}

function setupSearchEvents() {
  const inlineInput = document.getElementById('inlineSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');

  const executeSearch = (val) => {
    state.searchQuery = val;
    if (inlineInput) inlineInput.value = val;
    if (clearBtn) {
      clearBtn.classList.toggle('visible', val.length > 0);
    }
    renderDestinations();
  };

  if (inlineInput) {
    inlineInput.addEventListener('input', (e) => {
      executeSearch(e.target.value);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      executeSearch('');
      if (inlineInput) inlineInput.focus();
    });
  }
}

// --------------------------------------------------------
// 상세 모달 (대형 슬라이더 + 댓글 등록/목록)
// --------------------------------------------------------
let modalCurrentSlide = 0;

function setupModalEvents() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDetailModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeDetailModal();
      }
    });
  }

  // 지도 팝업: 바깥(어두운 배경) 클릭 시 닫기
  const mapModal = document.getElementById('mapModal');
  if (mapModal) {
    mapModal.addEventListener('click', (e) => {
      if (e.target === mapModal) closeMapModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (closeImageViewer()) return;
      closeDetailModal();
      closeMapModal();
      return;
    }
    // 상세보기가 열려 있을 때 ← → 키로 사진 넘기기 (댓글 입력 중에는 제외)
    if (!state.activeModalDestId) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'ArrowLeft') moveModalSlide(-1);
    if (e.key === 'ArrowRight') moveModalSlide(1);
  });
}

function openDetailModal(destId) {
  const dest = DESTINATIONS_DATA.find(d => d.id === destId);
  if (!dest) return;

  state.activeModalDestId = destId;
  modalCurrentSlide = 0;

  const backdrop = document.getElementById('modalBackdrop');
  const modalContent = document.getElementById('modalContent');
  if (!backdrop || !modalContent) return;

  const likeInfo = state.likes[dest.id] || { count: dest.initialLikes, userLiked: false };
  const commentsList = state.comments[dest.id] || [];

  modalContent.innerHTML = `
    <!-- 모달 대형 이미지 슬라이더 (3장) -->
    <div class="modal-slider-wrap" id="modalSliderWrap">
      <div class="card-top-badges">
        <span class="card-course-pill badge-${dest.courseId}">${dest.courseBadge}</span>
        <span class="card-photo-counter">📸 <span id="modalSlideNum">1</span>/${dest.images.length}</span>
      </div>

      <div class="modal-slider-track" id="modalSliderTrack">
        ${dest.images.map((src, idx) => `
          <div class="modal-slide">
            <img src="${asset(src)}" alt="${dest.name} - ${idx + 1}" />
            <div class="modal-caption">${dest.imageCaptions[idx] || dest.name}</div>
          </div>
        `).join('')}
      </div>

      ${dest.images.length > 1 ? `
      <button class="slider-btn prev" onclick="moveModalSlide(-1)" aria-label="${t('prevPhoto')}">&#10094;</button>
      <button class="slider-btn next" onclick="moveModalSlide(1)" aria-label="${t('nextPhoto')}">&#10095;</button>

      <div class="slider-indicators" id="modalDots">
        ${dest.images.map((_, idx) => `
          <button type="button" class="slider-dot ${idx === 0 ? 'active' : ''}" onclick="goToModalSlide(${idx})" aria-label="${t('nthPhoto', idx + 1)}"></button>
        `).join('')}
      </div>` : ''}
    </div>

    <!-- 모달 본문 정보 -->
    <div class="modal-body">
      <div class="modal-header-meta">
        <span class="dest-theme-tag">${dest.theme}</span>
        <button class="like-btn ${likeInfo.userLiked ? 'liked' : ''}" 
                id="modalLikeBtn" 
                onclick="toggleLike('${dest.id}')">
          <span class="heart-icon">${likeInfo.userLiked ? '❤️' : '🤍'}</span>
          <span class="like-count" id="modalLikeCount">${likeInfo.count}</span>
        </button>
      </div>

      <h2 class="modal-title">${dest.name}</h2>
      <div class="modal-eng-title">${dest.engName}</div>

      <div class="dest-tags" style="margin-bottom: 1.5rem;">
        ${dest.tags.map(t => `<span class="dest-tag-item">${t}</span>`).join('')}
      </div>

      <div class="modal-desc-box">
        <strong>${t('storyTitle')}</strong><br />
        ${dest.fullDesc}
      </div>

      <div class="modal-details-grid">
        <div class="modal-detail-card">
          <strong>${t('timeLabel')}</strong>
          ${dest.timeRecommended}
        </div>
        <div class="modal-detail-card">
          <strong>${t('addressLabel')}</strong>
          ${dest.address}
        </div>
        <div class="modal-detail-card" style="grid-column: 1 / -1;">
          <strong>${t('tipLabel')}</strong>
          ${dest.tip}
        </div>
      </div>

      <!-- 댓글 & 후기 섹션 -->
      <div class="modal-comments-section">
        <h3 class="comments-title">
          <span>${t('commentsTitle')}</span>
          <span style="font-size: 1rem; color: var(--primary);" id="modalCommentCount">(${commentsList.length})</span>
        </h3>

        <!-- 댓글 작성 카드 (로그인 전: 로그인 버튼 / 로그인 후: 작성 폼) -->
        <div class="comment-input-card" id="commentFormArea">
          ${renderCommentForm(dest.id)}
        </div>

        <!-- 댓글 목록 -->
        <div class="comments-list" id="modalCommentsList">
          ${renderCommentItems(commentsList)}
        </div>
      </div>
    </div>
  `;

  attachSwipe(document.getElementById('modalSliderWrap'), (step) => moveModalSlide(step));

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
  }
  document.body.style.overflow = '';
  state.activeModalDestId = null;
}

function moveModalSlide(step) {
  const total = getImageCount(state.activeModalDestId);
  if (total < 2) return;
  modalCurrentSlide = (modalCurrentSlide + step + total) % total;
  goToModalSlide(modalCurrentSlide);
}

function goToModalSlide(index) {
  modalCurrentSlide = index;
  const track = document.getElementById('modalSliderTrack');
  const num = document.getElementById('modalSlideNum');
  const dots = document.querySelectorAll('#modalDots .slider-dot');

  if (track) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  if (num) {
    num.textContent = index + 1;
  }
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

// 해당 여행지의 사진 장수
function getImageCount(destId) {
  const dest = DESTINATIONS_DATA.find(d => d.id === destId);
  return dest ? dest.images.length : 0;
}

// 카드 사진 클릭 → 상세보기 (스와이프 직후의 클릭은 무시)
let lastSwipeAt = 0;
function handleCardImageClick(destId) {
  if (Date.now() - lastSwipeAt < 400) return;
  openDetailModal(destId);
}

// 손가락으로 좌우로 밀어 사진 넘기기
function attachSwipe(el, onSwipe) {
  if (!el || el.dataset.swipeBound) return;
  el.dataset.swipeBound = '1';
  let startX = 0, startY = 0, tracking = false;
  el.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });
  el.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      lastSwipeAt = Date.now();
      onSwipe(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
}

function bindCardSwipes() {
  DESTINATIONS_DATA.forEach(dest => {
    if (dest.images.length < 2) return;
    attachSwipe(document.getElementById(`slider-${dest.id}`), (step) => moveSlide(dest.id, step));
  });
}

function renderCommentItems(list) {
  if (!list || list.length === 0) {
    return `<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 20px;">${t('noComments')}</p>`;
  }

  return list.map(c => `
    <div class="comment-item">
      <div class="comment-item-header">
        <div class="comment-item-author">
          <span>${escapeHtml(c.author)}</span>
          <span class="comment-item-rating">${'★'.repeat(c.rating || 5)}</span>
          ${c.mine ? `<span class="mine-badge">${t('mineBadge')}</span>` : ''}
        </div>
        <span class="comment-item-date">
          ${escapeHtml(c.date)}
          ${c.mine ? `<button type="button" class="item-delete-btn" onclick="handleDeleteComment(${Number(c.id)})">${t('deleteBtn')}</button>` : ''}
        </span>
      </div>
      <div class="comment-item-text">${escapeHtml(c.text)}</div>
    </div>
  `).join('');
}

// --------------------------------------------------------
// 댓글 제출 핸들러
// --------------------------------------------------------
function handleCommentSubmit(event, destId) {
  event.preventDefault();

  const authorInput = document.getElementById('commentAuthor');
  const ratingSelect = document.getElementById('commentRating');
  const textInput = document.getElementById('commentText');

  const author = authorInput.value.trim();
  const rating = parseInt(ratingSelect.value, 10) || 5;
  const text = textInput.value.trim();

  if (!author || !text) {
    alert(t('errMissing'));
    return;
  }
  if (author.length > 20 || text.length < 2 || text.length > 500) {
    alert(t('errLength'));
    return;
  }
  saveNickname(author);

  if (Feedback.isRemote) {
    if (!Feedback.user) {
      startLogin({ type: 'comment', dest: destId });
      return;
    }
    const submitBtn = event.target.querySelector('.comment-submit-btn');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = t('submitting'); }
    const cityId = state.currentCity;
    Feedback.addComment(cityId, destId, { author, text, rating })
      .then(comment => {
        if (state.currentCity !== cityId) return;
        (state.comments[destId] = state.comments[destId] || []).unshift(comment);
        refreshFeedbackUI(destId);
        textInput.value = '';
      })
      .catch(err => alert(err.message))
      .finally(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = t('submit'); }
      });
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const newComment = {
    id: Date.now(),
    author,
    rating,
    date: today,
    text
  };

  if (!state.comments[destId]) {
    state.comments[destId] = [];
  }
  state.comments[destId].unshift(newComment);
  saveCommentsToStorage();

  // 모달 댓글 UI 갱신
  const commentsList = state.comments[destId];
  const listEl = document.getElementById('modalCommentsList');
  const countEl = document.getElementById('modalCommentCount');
  if (listEl) {
    listEl.innerHTML = renderCommentItems(commentsList);
  }
  if (countEl) {
    countEl.textContent = `(${commentsList.length})`;
  }

  // 카드 댓글 카운트 갱신
  const cardCommentCount = document.getElementById(`comment-count-${destId}`);
  if (cardCommentCount) {
    cardCommentCount.textContent = commentsList.length;
  }

  // 입력창 초기화
  textInput.value = '';
}

// --------------------------------------------------------
// Google 로그인 (후기 · 좋아요 · 명소 추천)
// --------------------------------------------------------
const GOOGLE_G_ICON = '<svg class="google-g" viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

// 로그인 버튼 + 안내 문구. intent: 로그인 후 이어서 할 일 { type: 'comment'|'recommend'|'like', dest }
function renderLoginPrompt(message, intent = {}) {
  return `
    <div class="login-prompt">
      <p class="login-prompt-text">${message}</p>
      <button type="button" class="google-login-btn" data-type="${intent.type || ''}" data-dest="${intent.dest || ''}" onclick="startLogin(this.dataset)">
        ${GOOGLE_G_ICON}<span>${t('loginGoogle')}</span>
      </button>
      <p class="login-privacy">${t('loginPrivacy')}</p>
    </div>`;
}

// 로그인한 계정 표시 + 로그아웃
function renderAccountBar() {
  return `
    <div class="account-bar">
      <span class="account-name">👤 ${t('loggedInAs', escapeHtml(Feedback.userName))}</span>
      <button type="button" class="link-btn" onclick="handleLogout()">${t('logout')}</button>
    </div>`;
}

function startLogin(intent = {}) {
  try {
    sessionStorage.setItem('haru_after_login', JSON.stringify({
      type: intent.type || '', dest: intent.dest || '', city: state.currentCity || ''
    }));
  } catch (e) { /* 저장소 차단 */ }
  // 로그인 후 지금 보던 도시로 돌아오도록 (Supabase 대시보드의 Redirect URLs 에 사이트 주소가 등록되어 있어야 함)
  const back = `${window.location.origin}${window.location.pathname}${state.currentCity ? `?city=${state.currentCity}` : ''}`;
  Feedback.signIn(back).catch(err => alert(err.message));
}

function handleLogout() {
  Feedback.signOut().catch(() => {});
}

// 로그인/로그아웃 시: 작성 영역을 다시 그리고, 내가 누른 좋아요·내 글 표시를 새로 불러옴
function onAuthChanged() {
  refreshAuthAreas();
  if (state.currentCity && Feedback.isRemote) {
    loadRemoteFeedback(state.currentCity);
    loadRecommendations(state.currentCity);
  }
}

function refreshAuthAreas() {
  const area = document.getElementById('commentFormArea');
  if (area && state.activeModalDestId) area.innerHTML = renderCommentForm(state.activeModalDestId);
  renderRecForm();
}

// 로그인하고 돌아왔을 때, 로그인 버튼을 누르기 전에 하던 일을 이어서 진행
function resumeAfterLogin() {
  let intent = null;
  try {
    intent = JSON.parse(sessionStorage.getItem('haru_after_login') || 'null');
    sessionStorage.removeItem('haru_after_login');
  } catch (e) { /* 무시 */ }
  if (!intent || !Feedback.user) return;

  if (intent.city && intent.city !== state.currentCity && CITIES_DATA[intent.city]) {
    switchCity(intent.city, { scroll: false, history: 'replace' });
  }
  if (intent.type === 'comment' && intent.dest && DESTINATIONS_DATA.some(d => d.id === intent.dest)) {
    openDetailModal(intent.dest);
    setTimeout(() => {
      const ta = document.getElementById('commentText');
      if (ta) { ta.scrollIntoView({ block: 'center' }); ta.focus({ preventScroll: true }); }
    }, 300);
  } else if (intent.type === 'recommend') {
    const sec = document.getElementById('recommendSection');
    if (sec) sec.scrollIntoView();
    setTimeout(() => {
      const input = document.getElementById('recPlace');
      if (input) input.focus({ preventScroll: true });
    }, 300);
  } else if (intent.type === 'like' && intent.dest) {
    pendingLikeDest = intent.dest; // 좋아요 상태를 불러온 뒤 loadRemoteFeedback 에서 처리
  }
}

// 닉네임은 다음에 쓸 때를 위해 이 브라우저에만 기억
function savedNickname() {
  try { return localStorage.getItem('haru_trip_nickname') || ''; } catch (e) { return ''; }
}
function saveNickname(name) {
  try { localStorage.setItem('haru_trip_nickname', name); } catch (e) { /* 무시 */ }
}

// --------------------------------------------------------
// 상세 모달: 후기 작성 영역
// --------------------------------------------------------
function renderCommentForm(destId) {
  if (Feedback.isRemote && !Feedback.user) {
    return renderLoginPrompt(t('loginForComment'), { type: 'comment', dest: destId });
  }
  return `
    ${Feedback.isRemote ? renderAccountBar() : ''}
    <form id="commentForm" onsubmit="handleCommentSubmit(event, '${destId}')">
      <div class="comment-form-row">
        <input type="text" id="commentAuthor" class="comment-author-input" placeholder="${t('authorPlaceholder')}" maxlength="20" required value="${escapeHtml(savedNickname())}" />
        <select id="commentRating" class="comment-rating-select">
          ${t('ratingOptions').map((label, i) => `<option value="${i + 1}">${label}</option>`).reverse().join('')}
        </select>
      </div>
      <textarea id="commentText" class="comment-textarea" placeholder="${t('commentPlaceholder')}" minlength="2" maxlength="500" required></textarea>
      <p class="comment-notice">
        ${Feedback.isRemote ? t('noticeRemote') : t('noticeLocal')}
        <a href="terms.html" target="_blank" rel="noopener">${t('termsLink')}</a>
      </p>
      <button type="submit" class="comment-submit-btn">${t('submit')}</button>
      <div style="clear: both;"></div>
    </form>`;
}

function handleDeleteComment(id) {
  if (!confirm(t('confirmDeleteComment'))) return;
  const destId = state.activeModalDestId;
  Feedback.deleteComment(id)
    .then(() => {
      if (destId && state.comments[destId]) {
        state.comments[destId] = state.comments[destId].filter(c => c.id !== id);
        refreshFeedbackUI(destId);
      }
    })
    .catch(err => alert(err.message));
}

// --------------------------------------------------------
// 여행자 추천 명소 (사이트에 없는 장소를 방문자가 추천)
// --------------------------------------------------------
function renderRecSection() {
  const city = CITIES_DATA[state.currentCity];
  if (!city) return;
  const title = document.getElementById('recSectionTitle');
  const desc = document.getElementById('recSectionDesc');
  if (title) title.textContent = t('recTitle', city.name);
  if (desc) desc.textContent = t('recDesc', city.name);
  state.recs = [];
  renderRecForm();
  renderRecList();
}

async function loadRecommendations(cityId) {
  try {
    const list = await Feedback.loadRecommendations(cityId);
    if (state.currentCity !== cityId) return;
    state.recs = list;
  } catch (e) {
    console.warn('추천 명소를 불러오지 못했습니다:', e.message);
    if (state.currentCity !== cityId) return;
    state.recs = [];
  }
  renderRecList();
}

// 추천 사진: 최대 장수 · 올리기 전 줄이는 크기
const REC_MAX_PHOTOS = 3;
const REC_PHOTO_MAX_SIDE = 1600;
let recPhotos = []; // 작성 중인 추천에 고른 사진 [{ blob, url }]

function clearRecPhotos() {
  recPhotos.forEach(p => URL.revokeObjectURL(p.url));
  recPhotos = [];
}

function renderRecForm() {
  const area = document.getElementById('recFormArea');
  const city = CITIES_DATA[state.currentCity];
  if (!area || !city) return;
  clearRecPhotos();
  if (!Feedback.isRemote) {
    area.innerHTML = `<p class="login-prompt-text">${t('recLocalOnly')}</p>`;
    return;
  }
  if (!Feedback.user) {
    area.innerHTML = renderLoginPrompt(t('loginForRecommend', city.name), { type: 'recommend' });
    return;
  }
  area.innerHTML = `
    ${renderAccountBar()}
    <form id="recForm" class="rec-form" onsubmit="handleRecSubmit(event)">
      <input type="text" id="recAuthor" class="rec-input" placeholder="${t('authorPlaceholder')}" maxlength="20" required value="${escapeHtml(savedNickname())}" />
      <input type="text" id="recPlace" class="rec-input" placeholder="${t('recPlacePh')}" minlength="2" maxlength="50" required />
      <input type="text" id="recAddress" class="rec-input" placeholder="${t('recAddressPh')}" maxlength="100" />
      <textarea id="recBody" class="comment-textarea rec-textarea" placeholder="${t('recBodyPh')}" minlength="10" maxlength="500" required></textarea>
      <div class="rec-photos">
        <div class="rec-photo-list" id="recPhotoList">
          <label class="rec-photo-add" id="recPhotoAdd">
            <input type="file" id="recPhotoInput" class="visually-hidden" accept="image/*" multiple onchange="handleRecPhotoSelect(event)" />
            <span>${t('recPhotoAdd')}</span>
          </label>
        </div>
        <p class="rec-photo-hint">${t('recPhotoHint', REC_MAX_PHOTOS)}</p>
      </div>
      <p class="comment-notice">${t('recNotice')} <a href="terms.html" target="_blank" rel="noopener">${t('termsLink')}</a></p>
      <button type="submit" class="comment-submit-btn rec-submit-btn">${t('recSubmit')}</button>
    </form>`;
}

// 고른 사진 미리보기 (사진 추가 버튼은 최대 장수가 되면 숨김)
function renderRecPhotos() {
  const list = document.getElementById('recPhotoList');
  const add = document.getElementById('recPhotoAdd');
  if (!list || !add) return;
  list.querySelectorAll('.rec-photo-thumb').forEach(el => el.remove());
  recPhotos.forEach((p, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'rec-photo-thumb';
    thumb.innerHTML = `<img src="${p.url}" alt="" /><button type="button" class="rec-photo-remove" aria-label="${t('recPhotoRemove')}" onclick="removeRecPhoto(${i})">✕</button>`;
    list.insertBefore(thumb, add);
  });
  add.hidden = recPhotos.length >= REC_MAX_PHOTOS;
}

async function handleRecPhotoSelect(event) {
  const files = Array.from(event.target.files || []);
  event.target.value = '';
  const room = REC_MAX_PHOTOS - recPhotos.length;
  if (files.length > room) alert(t('errPhotoMax', REC_MAX_PHOTOS));
  for (const file of files.slice(0, Math.max(0, room))) {
    try {
      const blob = await resizeImage(file);
      recPhotos.push({ blob, url: URL.createObjectURL(blob) });
    } catch (e) {
      alert(t('errPhotoType'));
    }
  }
  renderRecPhotos();
}

function removeRecPhoto(index) {
  const [p] = recPhotos.splice(index, 1);
  if (p) URL.revokeObjectURL(p.url);
  renderRecPhotos();
}

// 사진을 긴 변 1600px 이하로 줄여 WebP(안 되면 JPEG)로 다시 저장
//   → 용량이 줄고, 촬영 위치(GPS) 같은 사진 속 정보(EXIF)도 함께 지워짐
async function resizeImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('not an image');
  let source, objectUrl = null;
  try {
    source = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch (e) {
    objectUrl = URL.createObjectURL(file);
    source = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = objectUrl;
    });
  }
  const w0 = source.width || source.naturalWidth;
  const h0 = source.height || source.naturalHeight;
  if (!w0 || !h0) throw new Error('empty image');
  const scale = Math.min(1, REC_PHOTO_MAX_SIDE / Math.max(w0, h0));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w0 * scale);
  canvas.height = Math.round(h0 * scale);
  canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height);
  if (source.close) source.close();
  if (objectUrl) URL.revokeObjectURL(objectUrl);

  const toBlob = (type, quality) => new Promise(resolve => canvas.toBlob(resolve, type, quality));
  const webp = await toBlob('image/webp', 0.82);
  if (webp && webp.type === 'image/webp') return webp;
  const jpeg = await toBlob('image/jpeg', 0.85); // WebP 저장을 못 하는 브라우저(일부 Safari)
  if (!jpeg) throw new Error('encode failed');
  return jpeg;
}

function renderRecList() {
  const el = document.getElementById('recList');
  const city = CITIES_DATA[state.currentCity];
  if (!el || !city) return;
  if (!state.recs.length) {
    el.innerHTML = `<p class="rec-empty">${t('recEmpty', city.name)}</p>`;
    return;
  }
  el.innerHTML = state.recs.map(r => {
    const images = r.images || [];
    const photos = images.length ? `
      <div class="rec-images count-${images.length}">
        ${images.map((img, i) => {
          const alt = escapeHtml(t('recPhotoAlt', r.place, i + 1));
          return `<button type="button" class="rec-image-btn" data-src="${escapeHtml(img.url)}" data-alt="${alt}" onclick="openImageViewer(this.dataset.src, this.dataset.alt)"><img src="${escapeHtml(img.url)}" alt="${alt}" loading="lazy" /></button>`;
        }).join('')}
      </div>` : '';
    return `
    <article class="rec-item">
      ${photos}
      <div class="rec-item-head">
        <h3 class="rec-place">📍 ${escapeHtml(r.place)}</h3>
        ${r.mine ? `<span class="mine-badge">${t('mineBadge')}</span>` : ''}
      </div>
      ${r.address ? `<p class="rec-address">${escapeHtml(r.address)}</p>` : ''}
      <p class="rec-body">${escapeHtml(r.text)}</p>
      <div class="rec-meta">
        <span>${escapeHtml(r.author)} · ${escapeHtml(r.date)}</span>
        ${r.mine ? `<button type="button" class="item-delete-btn" onclick="handleDeleteRec(${Number(r.id)})">${t('deleteBtn')}</button>` : ''}
      </div>
    </article>`;
  }).join('');
}

async function handleRecSubmit(event) {
  event.preventDefault();
  if (!Feedback.user) {
    startLogin({ type: 'recommend' });
    return;
  }
  const get = (id) => document.getElementById(id);
  const author = get('recAuthor').value.trim();
  const place = get('recPlace').value.trim();
  const address = get('recAddress').value.trim();
  const text = get('recBody').value.trim();

  if (!author || author.length > 20) { alert(t('errMissing')); return; }
  if (place.length < 2 || place.length > 50 || text.length < 10 || text.length > 500 || address.length > 100) {
    alert(t('errRecLength'));
    return;
  }
  saveNickname(author);

  const btn = event.target.querySelector('.rec-submit-btn');
  const setBusy = (label) => { if (btn) { btn.disabled = Boolean(label); btn.textContent = label || t('recSubmit'); } };
  const cityId = state.currentCity;
  const uploaded = [];
  try {
    // 1) 사진을 먼저 내 폴더에 올리고  2) 경로와 함께 추천 등록
    if (recPhotos.length) {
      setBusy(t('uploadingPhotos'));
      for (const p of recPhotos) uploaded.push(await Feedback.uploadRecImage(p.blob));
    }
    setBusy(t('submitting'));
    const rec = await Feedback.addRecommendation(cityId, { author, place, address, text, images: uploaded });
    if (state.currentCity === cityId) {
      state.recs.unshift(rec);
      renderRecList();
    }
    get('recPlace').value = '';
    get('recAddress').value = '';
    get('recBody').value = '';
    clearRecPhotos();
    renderRecPhotos();
  } catch (err) {
    // 등록에 실패하면 먼저 올린 사진은 지워서 남지 않게
    if (uploaded.length) Feedback.removeRecImages(uploaded);
    alert(err.message);
  } finally {
    setBusy('');
  }
}

// 추천 사진 크게 보기
function openImageViewer(src, alt) {
  let viewer = document.getElementById('imageViewer');
  if (!viewer) {
    viewer = document.createElement('div');
    viewer.id = 'imageViewer';
    viewer.className = 'image-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.innerHTML = `<button type="button" class="image-viewer-close" aria-label="${t('recPhotoClose')}">✕</button><img alt="" />`;
    viewer.addEventListener('click', (e) => { if (e.target.tagName !== 'IMG') closeImageViewer(); });
    document.body.appendChild(viewer);
  }
  const img = viewer.querySelector('img');
  img.src = src;
  img.alt = alt || '';
  viewer.classList.add('open');
  document.body.style.overflow = 'hidden';
  viewer.querySelector('.image-viewer-close').focus();
}

function closeImageViewer() {
  const viewer = document.getElementById('imageViewer');
  if (!viewer || !viewer.classList.contains('open')) return false;
  viewer.classList.remove('open');
  document.body.style.overflow = '';
  return true;
}

function handleDeleteRec(id) {
  if (!confirm(t('confirmDeleteRec'))) return;
  Feedback.deleteRecommendation(id)
    .then(() => {
      state.recs = state.recs.filter(r => r.id !== id);
      renderRecList();
    })
    .catch(err => alert(err.message));
}

// 유틸: XSS 방지
function escapeHtml(str) {
  if (str === null || str === undefined || str === '') return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

