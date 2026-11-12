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
  sliderIndices: {} // { [cardId]: currentIndex }
};

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
  const newUrl = `${window.location.pathname}?city=${cityId}`;
  if (history === 'push' && !sameCity && window.history.pushState) {
    window.history.pushState({ city: cityId }, '', newUrl);
  } else if (history !== 'none' && window.history.replaceState) {
    window.history.replaceState({ city: cityId }, '', newUrl);
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

        <!-- 댓글 작성 카드 -->
        <div class="comment-input-card">
          <form id="commentForm" onsubmit="handleCommentSubmit(event, '${dest.id}')">
            <div class="comment-form-row">
              <input type="text" id="commentAuthor" class="comment-author-input" placeholder="${t('authorPlaceholder')}" maxlength="20" required />
              <select id="commentRating" class="comment-rating-select">
                ${t('ratingOptions').map((label, i) => `<option value="${i + 1}">${label}</option>`).reverse().join('')}
              </select>
            </div>
            <textarea id="commentText" class="comment-textarea" placeholder="${t('commentPlaceholder')}" minlength="2" maxlength="500" required></textarea>
            <p class="comment-notice">
              ${Feedback.isRemote
                ? t('noticeRemote')
                : t('noticeLocal')}
              <a href="terms.html" target="_blank" rel="noopener">${t('termsLink')}</a>
            </p>
            <button type="submit" class="comment-submit-btn">${t('submit')}</button>
            <div style="clear: both;"></div>
          </form>
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
        </div>
        <span class="comment-item-date">${c.date}</span>
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

  if (Feedback.isRemote) {
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

// 유틸: XSS 방지
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

