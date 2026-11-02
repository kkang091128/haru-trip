// ========================================================
// 하루트립 (HARU TRIP) - 목포 당일치기 관광 프론트엔드 로직
// ========================================================

// 상태 관리
const state = {
  activeCourseFilter: 'ALL', // 'ALL' | 'A' | 'B' | 'C'
  activeTagFilter: 'ALL',
  searchQuery: '',
  likes: {},      // { [destId]: { count: number, userLiked: boolean } }
  comments: {},   // { [destId]: Array<Comment> }
  activeModalDestId: null,
  sliderIndices: {} // { [cardId]: currentIndex }
};

// 로컬스토리지 키
const STORAGE_LIKES_KEY = 'haru_trip_mokpo_likes_v1';
const STORAGE_COMMENTS_KEY = 'haru_trip_mokpo_comments_v1';

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initNavbarScroll();
  renderCourseIntroCards();
  renderDestinations();
  setupFilterEvents();
  setupSearchEvents();
  setupModalEvents();
});

// 1. 로컬스토리지 초기화 & 로드
function initStorage() {
  const savedLikes = localStorage.getItem(STORAGE_LIKES_KEY);
  if (savedLikes) {
    try {
      state.likes = JSON.parse(savedLikes);
    } catch (e) {
      state.likes = {};
    }
  }

  const savedComments = localStorage.getItem(STORAGE_COMMENTS_KEY);
  if (savedComments) {
    try {
      state.comments = JSON.parse(savedComments);
    } catch (e) {
      state.comments = {};
    }
  }

  // 기본값 병합
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
}

function saveLikesToStorage() {
  localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(state.likes));
}

function saveCommentsToStorage() {
  localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(state.comments));
}

// 2. 내비게이션 스크롤 효과
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 3. 코스 소개 카드 렌더링
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
        <span>🎯 명소 3곳</span>
      </div>

      <button class="course-btn-select" onclick="filterByCourse('${course.id}')">
        이 코스 명소 보기 &rarr;
      </button>
    </div>
  `).join('');
}

// 4. 여행지 목록 렌더링 (슬라이더 포함)
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
    countEl.textContent = `${filtered.length}개`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 2.5rem; margin-bottom: 12px;">🔍</p>
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px;">검색 결과가 없습니다</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">
          다른 키워드로 검색하거나 코스 필터를 초기화해 보세요.
        </p>
        <button onclick="resetFilters()" class="filter-btn active" style="padding: 10px 24px;">
          전체 보기
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dest => {
    const likeInfo = state.likes[dest.id] || { count: dest.initialLikes, userLiked: false };
    const commentsList = state.comments[dest.id] || [];
    const currentSlide = state.sliderIndices[dest.id] || 0;

    return `
      <article class="dest-card" id="dest-card-${dest.id}">
        <!-- 이미지 슬라이더 영역 (각 여행지당 3장) -->
        <div class="card-slider-wrapper" id="slider-${dest.id}">
          <div class="card-top-badges">
            <span class="card-course-pill badge-${dest.courseId}">${dest.courseBadge}</span>
            <span class="card-photo-counter">📸 <span id="counter-${dest.id}">${currentSlide + 1}</span>/3</span>
          </div>

          <div class="card-slider-track" id="track-${dest.id}" style="transform: translateX(-${currentSlide * 33.3333}%);">
            ${dest.images.map((imgSrc, idx) => `
              <div class="card-slide">
                <img src="${imgSrc}" alt="${dest.name} - ${idx + 1}" loading="lazy" />
                <div class="slide-caption-overlay">${dest.imageCaptions[idx] || dest.name}</div>
              </div>
            `).join('')}
          </div>

          <!-- 좌우 화살표 버튼 -->
          <button class="slider-btn prev" onclick="moveSlide('${dest.id}', -1, event)" aria-label="이전 사진">&#10094;</button>
          <button class="slider-btn next" onclick="moveSlide('${dest.id}', 1, event)" aria-label="다음 사진">&#10095;</button>

          <!-- 하단 인디케이터 도트 -->
          <div class="slider-indicators" id="dots-${dest.id}">
            ${dest.images.map((_, idx) => `
              <span class="slider-dot ${idx === currentSlide ? 'active' : ''}" onclick="goToSlide('${dest.id}', ${idx}, event)"></span>
            `).join('')}
          </div>
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
              상세보기 & 댓글 &rarr;
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// 5. 슬라이더 인터랙션 로직
function moveSlide(destId, step, event) {
  if (event) event.stopPropagation();
  const current = state.sliderIndices[destId] || 0;
  const next = (current + step + 3) % 3;
  goToSlide(destId, next);
}

function goToSlide(destId, index, event) {
  if (event) event.stopPropagation();
  state.sliderIndices[destId] = index;
  const track = document.getElementById(`track-${destId}`);
  const counter = document.getElementById(`counter-${destId}`);
  const dotsContainer = document.getElementById(`dots-${destId}`);

  if (track) {
    track.style.transform = `translateX(-${index * 33.3333}%)`;
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

// 6. 좋아요(하트) 토글 로직
function toggleLike(destId, event) {
  if (event) event.stopPropagation();
  const item = state.likes[destId];
  if (!item) return;

  if (item.userLiked) {
    item.userLiked = false;
    item.count = Math.max(0, item.count - 1);
  } else {
    item.userLiked = true;
    item.count += 1;
  }

  saveLikesToStorage();

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

// 7. 검색 및 코스 필터 이벤트
function setupFilterEvents() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-course]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const course = btn.getAttribute('data-course');
      filterByCourse(course);
    });
  });
}

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
  const heroSearchInput = document.getElementById('heroSearchInput');
  if (searchInput) searchInput.value = '';
  if (heroSearchInput) heroSearchInput.value = '';

  document.querySelectorAll('.filter-btn[data-course]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-course') === 'ALL');
  });

  renderDestinations();
}

function setupSearchEvents() {
  const heroInput = document.getElementById('heroSearchInput');
  const heroBtn = document.getElementById('heroSearchBtn');
  const inlineInput = document.getElementById('inlineSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');

  const executeSearch = (val) => {
    state.searchQuery = val;
    if (inlineInput) inlineInput.value = val;
    if (heroInput) heroInput.value = val;
    if (clearBtn) {
      clearBtn.classList.toggle('visible', val.length > 0);
    }
    renderDestinations();
  };

  if (heroBtn && heroInput) {
    heroBtn.addEventListener('click', () => {
      executeSearch(heroInput.value);
      const exploreSec = document.getElementById('exploreSection');
      if (exploreSec) exploreSec.scrollIntoView({ behavior: 'smooth' });
    });

    heroInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeSearch(heroInput.value);
        const exploreSec = document.getElementById('exploreSection');
        if (exploreSec) exploreSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

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

// 8. 상세 모달 (대형 슬라이더 + 댓글 등록/목록)
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

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
    }
  });

  // 댓글 등록 폼 이벤트
  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', handleCommentSubmit);
  }
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
    <div class="modal-slider-wrap">
      <div class="card-top-badges">
        <span class="card-course-pill badge-${dest.courseId}">${dest.courseBadge}</span>
        <span class="card-photo-counter">📸 <span id="modalSlideNum">1</span>/3</span>
      </div>

      <div class="modal-slider-track" id="modalSliderTrack">
        ${dest.images.map((src, idx) => `
          <div class="modal-slide">
            <img src="${src}" alt="${dest.name} - ${idx + 1}" />
            <div class="modal-caption">${dest.imageCaptions[idx] || dest.name}</div>
          </div>
        `).join('')}
      </div>

      <button class="slider-btn prev" onclick="moveModalSlide(-1)" aria-label="이전 사진">&#10094;</button>
      <button class="slider-btn next" onclick="moveModalSlide(1)" aria-label="다음 사진">&#10095;</button>

      <div class="slider-indicators" id="modalDots">
        ${dest.images.map((_, idx) => `
          <span class="slider-dot ${idx === 0 ? 'active' : ''}" onclick="goToModalSlide(${idx})"></span>
        `).join('')}
      </div>
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
        <strong>여행지 상세 스토리</strong><br />
        ${dest.fullDesc}
      </div>

      <div class="modal-details-grid">
        <div class="modal-detail-card">
          <strong>🕒 추천 소요시간</strong>
          ${dest.timeRecommended}
        </div>
        <div class="modal-detail-card">
          <strong>📍 위치 및 주소</strong>
          ${dest.address}
        </div>
        <div class="modal-detail-card" style="grid-column: 1 / -1;">
          <strong>💡 당일치기 여행 꿀팁</strong>
          ${dest.tip}
        </div>
      </div>

      <!-- 댓글 & 후기 섹션 -->
      <div class="modal-comments-section">
        <h3 class="comments-title">
          <span>여행자 생생 후기 & 댓글</span>
          <span style="font-size: 1rem; color: var(--primary);" id="modalCommentCount">(${commentsList.length})</span>
        </h3>

        <!-- 댓글 작성 카드 -->
        <div class="comment-input-card">
          <form id="commentForm" onsubmit="handleCommentSubmit(event, '${dest.id}')">
            <div class="comment-form-row">
              <input type="text" id="commentAuthor" class="comment-author-input" placeholder="작성자 닉네임" required />
              <select id="commentRating" class="comment-rating-select">
                <option value="5">⭐⭐⭐⭐⭐ 5점 (강추!)</option>
                <option value="4">⭐⭐⭐⭐ 4점 (좋아요)</option>
                <option value="3">⭐⭐⭐ 3점 (보통)</option>
                <option value="2">⭐⭐ 2점 (아쉬움)</option>
                <option value="1">⭐ 1점 (비추)</option>
              </select>
            </div>
            <textarea id="commentText" class="comment-textarea" placeholder="이 여행지에 대한 솔직한 후기나 팁을 남겨주세요." required></textarea>
            <button type="submit" class="comment-submit-btn">댓글 등록하기</button>
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
  modalCurrentSlide = (modalCurrentSlide + step + 3) % 3;
  goToModalSlide(modalCurrentSlide);
}

function goToModalSlide(index) {
  modalCurrentSlide = index;
  const track = document.getElementById('modalSliderTrack');
  const num = document.getElementById('modalSlideNum');
  const dots = document.querySelectorAll('#modalDots .slider-dot');

  if (track) {
    track.style.transform = `translateX(-${index * 33.3333}%)`;
  }
  if (num) {
    num.textContent = index + 1;
  }
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

function renderCommentItems(list) {
  if (!list || list.length === 0) {
    return `<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 20px;">아직 작성된 댓글이 없습니다. 첫 번째 후기를 남겨보세요!</p>`;
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

// 9. 댓글 제출 핸들러
function handleCommentSubmit(event, destId) {
  event.preventDefault();

  const authorInput = document.getElementById('commentAuthor');
  const ratingSelect = document.getElementById('commentRating');
  const textInput = document.getElementById('commentText');

  const author = authorInput.value.trim();
  const rating = parseInt(ratingSelect.value, 10) || 5;
  const text = textInput.value.trim();

  if (!author || !text) {
    alert('닉네임과 후기 내용을 모두 입력해 주세요.');
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
