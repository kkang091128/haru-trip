// ========================================================
// 읽기용 정적 페이지 생성기 (한국어 + English)
//   한국어 (루트)                    English (en/)
//   - guide-<도시>.html             - en/guide-<도시>.html
//   - about/privacy/terms.html      - en/about/privacy/terms.html
//   - (index.html 은 직접 편집)       - en/index.html  ← index.html + i18n/ui.js 의 en.page 로 자동 생성
//   - sitemap.xml (두 언어 모두 포함, hreflang 연결)
//   - index.html 의 애드센스 코드 블록 (config.js의 adsenseClient 값)
// 사용법: node generate_pages.js   (data*.js, i18n/*.js, index.html, config.js 를 바꾼 뒤 다시 실행)
//
// 영어 번역 위치
//   - 도시·코스·명소 내용: i18n/data_en.js
//   - 화면 문구(index.html, app.js): i18n/ui.js
//   - 가이드/소개/약관 페이지 문구: 이 파일의 STR, aboutBody, privacyBody, termsBody
// ========================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const SITE = 'https://haru-trip-h0v.pages.dev';
const CONTACT_EMAIL = 'ck2lucky@gmail.com';
const today = new Date().toISOString().slice(0, 10);
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const HANGUL = /[가-힣]/;

// ---- 데이터 & 설정 읽기
const dataFiles = ['data.js', ...fs.readdirSync(ROOT).filter(f => /^data_.+\.js$/.test(f)).sort()];
function loadCities(extraFiles = []) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext([...dataFiles, ...extraFiles].map(read).join('\n') + '\nthis.CITIES_DATA = CITIES_DATA;', ctx);
  return Object.values(ctx.CITIES_DATA);
}
const configCtx = { window: {} };
vm.createContext(configCtx);
vm.runInContext(read('config.js'), configCtx);
const CONFIG = configCtx.window.HARU_CONFIG || {};
const ADSENSE_CLIENT = (CONFIG.adsenseClient || '').trim();

const uiCtx = { window: {} };
vm.createContext(uiCtx);
vm.runInContext(read('i18n/ui.js'), uiCtx);
const UI = uiCtx.window.HARU_I18N;

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = (s) => String(s ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function adsenseTag() {
  if (!/^ca-pub-\d{10,20}$/.test(ADSENSE_CLIENT)) return '';
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>`;
}

// ---- 언어별 설정과 페이지 공통 문구
const LANGS = {
  ko: {
    code: 'ko', dir: '', up: '', other: 'en',
    cities: loadCities(),
    STR: {
      siteName: '하루트립',
      logo: '🌊 하루트립',
      cityNav: '도시별 가이드',
      regionPick: '지역 선택',
      footerNav: '사이트 정보',
      home: '홈', about: '사이트 소개', privacy: '개인정보처리방침', terms: '이용약관', credits: '사진 출처',
      contact: (e) => `문의: ${e}`,
      copyright: '© 2026 하루트립 (HARU TRIP). 대한민국 당일치기 여행 가이드.',
      rssTitle: '하루트립 RSS', rssHref: '/rss.xml',
      switchTitle: 'View in English',
      guideTitle: (c, n) => `${c.name} 당일치기 여행 코스 총정리 (A·B·C 3가지 코스, 명소 ${n}곳) | 하루트립`,
      guideH1: (c) => `${c.name} 당일치기 여행 코스 총정리`,
      breadcrumb: (c) => `${c.name} 당일치기 가이드`,
      updated: (d) => `최종 업데이트: ${d}`,
      intro: (desc) => `${desc} 아래에서 취향에 맞는 코스를 고르고, 코스별 명소의 특징과 추천 소요시간, 주소, 현지 여행 팁을 확인해 보세요.`,
      cta: '사진·지도형 가이드로 보기 →',
      toc: '목차', tocTitle: '이 글의 코스',
      route: '추천 동선:',
      time: '추천 소요시간', address: '주소', tip: '여행 팁',
      timePrefix: /^소요시간:\s*/,
      notice: '운영 시간, 요금, 출입 통제 여부는 계절과 현지 사정에 따라 바뀔 수 있습니다. 방문 전에 각 장소의 공식 안내를 꼭 확인해 주세요.',
      others: '다른 도시도 둘러보세요:',
      otherGuide: (c) => `${c.name} 당일치기 가이드`,
      aboutTitle: '사이트 소개 | 하루트립',
      aboutDesc: '하루트립은 국내 도시별 당일치기 여행 코스와 명소 정보를 소개하는 여행 가이드입니다.',
      privacyTitle: '개인정보처리방침 | 하루트립',
      privacyDesc: '하루트립 개인정보처리방침 — 수집하는 정보, 광고 쿠키, 이용자의 권리 안내',
      termsTitle: '이용약관 | 하루트립',
      termsDesc: '하루트립 이용약관 — 여행 정보 이용, 후기 작성 규칙, 광고 안내'
    }
  },
  en: {
    code: 'en', dir: 'en/', up: '../', other: 'ko',
    cities: loadCities(['i18n/data_en.js']),
    STR: {
      siteName: 'HARU TRIP',
      logo: '🌊 HARU TRIP',
      cityNav: 'City guides',
      regionPick: 'Regions',
      footerNav: 'Site information',
      home: 'Home', about: 'About', privacy: 'Privacy Policy', terms: 'Terms of Use', credits: 'Photo credits',
      contact: (e) => `Contact: ${e}`,
      copyright: '© 2026 HARU TRIP. Korea day trip guide.',
      rssTitle: 'HARU TRIP RSS', rssHref: '/en/rss.xml',
      switchTitle: '한국어로 보기',
      guideTitle: (c, n) => `${c.name} Day Trip Guide: 3 Courses (A·B·C) and ${n} Must-See Spots | HARU TRIP`,
      guideH1: (c) => `${c.name} Day Trip Guide: Courses & Spots`,
      breadcrumb: (c) => `${c.name} day trip guide`,
      updated: (d) => `Last updated: ${d}`,
      intro: (desc) => `${desc} Pick the course that suits you below, and check each spot's highlights, suggested time, address and local tips.`,
      cta: 'View the photo guide →',
      toc: 'Table of contents', tocTitle: 'Courses in this guide',
      route: 'Suggested route:',
      time: 'Suggested time', address: 'Address', tip: 'Travel tip',
      timePrefix: /^Time needed:\s*/i,
      notice: 'Opening hours, fees and access restrictions can change with the season and local conditions. Please check each place\'s official information before you visit.',
      others: 'Explore other cities:',
      otherGuide: (c) => `${c.name} day trip guide`,
      aboutTitle: 'About | HARU TRIP',
      aboutDesc: 'HARU TRIP is a travel guide to one-day itineraries and must-see spots in cities across Korea.',
      privacyTitle: 'Privacy Policy | HARU TRIP',
      privacyDesc: 'HARU TRIP Privacy Policy — what we collect, advertising cookies and your rights.',
      termsTitle: 'Terms of Use | HARU TRIP',
      termsDesc: 'HARU TRIP Terms of Use — travel information, review rules and advertising.'
    }
  }
};

// ---- 공통 레이아웃
function layout(L, { file, title, description, body, jsonLd, noindex }) {
  const S = L.STR;
  const url = `${SITE}/${L.dir}${file}`;
  const alt = (code) => `${SITE}/${LANGS[code].dir}${file}`;
  return `<!DOCTYPE html>
<html lang="${L.code}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="ko" href="${alt('ko')}" />
  <link rel="alternate" hreflang="en" href="${alt('en')}" />
  <link rel="alternate" hreflang="x-default" href="${alt('ko')}" />
  ${noindex ? '<meta name="robots" content="noindex" />' : ''}
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${S.siteName}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <link rel="alternate" type="application/rss+xml" title="${S.rssTitle}" href="${S.rssHref}" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="theme-color" content="#0284c7" />
  <link rel="stylesheet" href="${L.up}pages.css" />
  ${adsenseTag()}
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body>
  <header class="page-header">
    <div class="page-header-inner">
      <a class="page-logo" href="./">${S.logo}</a>
      <nav aria-label="${S.cityNav}">
        <a class="region-picker-link" href="./?map=1"><span aria-hidden="true">🗺️</span> ${S.regionPick} <span aria-hidden="true">▾</span></a>
        <a class="lang-toggle" href="${LANGS[L.other].dir ? LANGS[L.other].dir : '../'}${file}" hreflang="${L.other}" title="${S.switchTitle}" aria-label="${S.switchTitle}"><span class="lang-opt" lang="ko">KO</span><span class="lang-opt" lang="en">EN</span></a>
      </nav>
    </div>
  </header>
  <main class="page">
${body}
  </main>
  <footer class="page-footer">
    <div class="page-footer-inner">
      <nav aria-label="${S.footerNav}">
        <a href="./">${S.home}</a>
        <a href="about.html">${S.about}</a>
        <a href="privacy.html">${S.privacy}</a>
        <a href="terms.html">${S.terms}</a>
        <a href="${L.up}credits.html">${S.credits}</a>
        <a href="mailto:${CONTACT_EMAIL}">${S.contact(CONTACT_EMAIL)}</a>
      </nav>
      <div>${S.copyright}</div>
    </div>
  </footer>
</body>
</html>
`;
}

// ---- 도시 가이드
function cityGuide(L, city) {
  const S = L.STR;
  const file = `guide-${city.id}.html`;
  const destById = Object.fromEntries(city.destinations.map(d => [d.id, d]));
  const title = S.guideTitle(city, city.destinations.length);
  const description = stripTags(city.metaDesc);

  const toc = city.courses.map(c => `<li><a href="#course-${c.id}">${esc(c.badge)}: ${esc(c.title)}</a></li>`).join('\n          ');

  const courses = city.courses.map(course => {
    const spots = course.destinations.map((id, i) => {
      const d = destById[id];
      if (!d) return '';
      return `
      <article class="spot" id="${d.id}">
        <figure>
          <img src="${esc(L.up + d.images[0])}" alt="${esc(d.name)} - ${esc(d.imageCaptions[0] || '')}" loading="lazy" width="1280" height="720" />
          <figcaption>${esc(d.imageCaptions[0] || d.name)}</figcaption>
        </figure>
        <div class="spot-body">
          <h3>${i + 1}. ${esc(d.name)}</h3>
          <p class="spot-eng">${L.code === 'en' ? `<span lang="ko">${esc(d.engName)}</span>` : esc(d.engName)} · ${esc(d.theme)}</p>
          <p>${esc(d.fullDesc)}</p>
          <dl>
            <dt>${S.time}</dt><dd>${esc(String(d.timeRecommended).replace(S.timePrefix, ''))}</dd>
            <dt>${S.address}</dt><dd>${esc(d.address)}</dd>
            <dt>${S.tip}</dt><dd>${esc(d.tip)}</dd>
          </dl>
        </div>
      </article>`;
    }).join('\n');

    const route = course.destinations.map(id => destById[id] ? destById[id].name : '').filter(Boolean).join(' → ');
    return `
    <section aria-labelledby="course-${course.id}">
      <h2 id="course-${course.id}">${course.icon} ${esc(course.badge)}: ${esc(course.title)}</h2>
      <div class="course-meta"><span>⏱️ ${esc(course.duration)}</span><span>📍 ${esc(course.distance)}</span></div>
      <p class="lead">${esc(course.subtitle)}</p>
      <p><strong>${S.route}</strong> ${esc(route)}</p>
      <p>${esc(course.highlight)}</p>
      ${spots}
    </section>`;
  }).join('\n');

  const others = L.cities.filter(c => c.id !== city.id)
    .map(c => `<a href="guide-${c.id}.html">${esc(S.otherGuide(c))}</a>`).join(' · ');

  const body = `
    <div class="breadcrumb"><a href="./">${S.home}</a> › ${esc(S.breadcrumb(city))}</div>
    <h1>${esc(S.guideH1(city))}</h1>
    <p class="updated">${S.updated(today)}</p>
    <p class="lead">${esc(stripTags(city.heroSubtitle))}</p>
    <p>${esc(S.intro(description))}</p>
    <a class="cta" href="./?city=${city.id}">${S.cta}</a>
    <nav class="toc" aria-label="${S.toc}">
      <strong>${S.tocTitle}</strong>
      <ol>
          ${toc}
      </ol>
    </nav>
    ${courses}
    <div class="notice">${S.notice}</div>
    <p>${S.others} ${others}</p>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: S.guideH1(city),
    description,
    dateModified: today,
    inLanguage: L.code,
    mainEntityOfPage: `${SITE}/${L.dir}${file}`,
    image: city.destinations.slice(0, 3).map(d => `${SITE}/${d.images[0]}`),
    author: { '@type': 'Organization', name: S.siteName },
    publisher: { '@type': 'Organization', name: S.siteName }
  };

  return { file, html: layout(L, { file, title, description, body, jsonLd }) };
}

// ---- 사이트 소개
const aboutBody = {
  ko: (cityList) => `
    <h1>하루트립 소개</h1>
    <p class="lead">하루트립은 주말 하루, 1박 없이도 온전히 즐길 수 있는 국내 도시별 당일치기 여행 코스를 소개하는 여행 가이드입니다.</p>
    <h2>무엇을 알려드리나요</h2>
    <p>도시마다 취향이 다른 세 가지 코스(A·B·C)를 만들고, 코스별로 함께 둘러보기 좋은 명소 3곳을 묶었습니다. 각 명소에는 어떤 곳인지, 얼마나 머물면 좋은지, 주소와 현지 여행 팁을 정리했습니다.</p>
    <ul>
      ${cityList}
    </ul>
    <h2>콘텐츠는 이렇게 만듭니다</h2>
    <p>명소 설명은 각 지자체·관광공사의 공개 자료와 일반에 알려진 정보를 바탕으로 직접 작성합니다. 사진은 위키미디어 공용 등에 자유 이용 라이선스로 공개된 사진을 사용하며, 모든 사진의 촬영자와 라이선스를 <a href="credits.html">사진 출처</a> 페이지에 밝혀 두었습니다.</p>
    <p>운영 시간과 요금은 수시로 바뀔 수 있어 구체적인 숫자 대신 방문 전 확인을 권하고 있습니다. 잘못된 정보를 발견하시면 아래 이메일로 알려 주세요. 확인 후 빠르게 고치겠습니다.</p>
    <h2>방문자 후기와 여행자 추천 명소</h2>
    <p>각 명소의 좋아요와 후기는 실제 방문자가 남긴 것만 표시합니다. 운영자가 임의로 만든 후기나 숫자는 없습니다. 도시마다 있는 "여행자 추천 명소"에는 사이트에 아직 없는 장소를 방문자가 직접 추천할 수 있습니다.</p>
    <p>좋아요, 후기, 명소 추천은 Google 계정으로 로그인한 뒤 이용할 수 있으며, 화면에는 작성자가 입력한 닉네임만 표시됩니다. 욕설, 광고, 개인정보가 담긴 글은 <a href="terms.html">이용약관</a>에 따라 숨김 처리될 수 있습니다.</p>
    <h2>광고 안내</h2>
    <p>하루트립은 사이트 운영비를 마련하기 위해 Google 애드센스 광고를 게재할 수 있습니다. 광고는 콘텐츠와 구분되어 표시되며, 광고 쿠키에 관한 내용은 <a href="privacy.html">개인정보처리방침</a>에서 확인하실 수 있습니다.</p>
    <h2>문의</h2>
    <p>정보 수정 요청, 제휴, 기타 문의: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>`,
  en: (cityList) => `
    <h1>About HARU TRIP</h1>
    <p class="lead">HARU TRIP ("haru" means "one day" in Korean) is a travel guide to one-day itineraries in cities across Korea — trips you can fully enjoy on a weekend without staying overnight.</p>
    <h2>What we offer</h2>
    <p>For each city we create three courses (A·B·C) for different tastes, each grouping three spots that work well together. For every spot we describe what it is, how long to stay, the address and local travel tips.</p>
    <ul>
      ${cityList}
    </ul>
    <h2>How we create content</h2>
    <p>Spot descriptions are written by us based on public information from local governments and tourism organizations and other widely known sources. Photos are freely licensed images, mainly from Wikimedia Commons, and every photographer and license is listed on the <a href="../credits.html">photo credits</a> page.</p>
    <p>Opening hours and fees change often, so instead of exact numbers we recommend checking before you visit. If you spot an error, please let us know by email and we will fix it quickly.</p>
    <p>The English pages are translations of our Korean guides. Place names follow the official romanization, and the original Korean name is shown with each spot so you can find it locally.</p>
    <h2>Visitor reviews and traveler picks</h2>
    <p>Likes and reviews show only what real visitors have left — we never create reviews or numbers ourselves. Each city also has "Traveler Picks," where visitors can recommend places we haven't covered yet. Reviews and picks are shared between the Korean and English sites, so some may be written in Korean.</p>
    <p>Liking, reviewing and recommending require signing in with a Google account, and only the nickname you enter is shown. Posts with abuse, ads or personal information may be hidden under our <a href="terms.html">Terms of Use</a>.</p>
    <h2>Advertising</h2>
    <p>HARU TRIP may display Google AdSense ads to cover running costs. Ads are shown separately from our content; see our <a href="privacy.html">Privacy Policy</a> for details on advertising cookies.</p>
    <h2>Contact</h2>
    <p>Corrections, partnerships and other inquiries: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>`
};

function aboutPage(L) {
  const cityList = L.cities.map(c => `<li><a href="guide-${c.id}.html">${esc(c.name)}</a> — ${esc(stripTags(c.metaDesc))}</li>`).join('\n      ');
  return { file: 'about.html', html: layout(L, { file: 'about.html', title: L.STR.aboutTitle, description: L.STR.aboutDesc, body: aboutBody[L.code](cityList) }) };
}

// ---- 개인정보처리방침
const privacyBody = {
  ko: () => `
    <article class="policy">
    <h1>개인정보처리방침</h1>
    <p class="updated">시행일: 2026년 11월 12일 (Google 로그인 도입에 따른 개정)</p>
    <p>하루트립(이하 "사이트")은 「개인정보 보호법」 등 관련 법령을 지키며, 이용자의 개인정보를 소중히 다룹니다. 이 방침은 사이트가 어떤 정보를 왜 수집하고 어떻게 관리하는지 설명합니다.</p>

    <h2>1. 수집하는 정보와 목적</h2>
    <p>여행 정보와 후기는 로그인 없이 볼 수 있습니다. 좋아요, 후기 작성, 여행자 추천 명소 작성은 Google 계정으로 로그인한 뒤 이용할 수 있으며, 사이트는 비밀번호를 받거나 저장하지 않습니다.</p>
    <table>
      <tr><th>구분</th><th>항목</th><th>목적</th></tr>
      <tr><td>Google 로그인 시</td><td>Google이 제공하는 이메일 주소, 이름, 프로필 사진 주소, Google 계정 식별값</td><td>회원 확인, 좋아요 중복 방지, 본인 글 삭제, 도배 방지 — 사이트 화면에는 표시하지 않음</td></tr>
      <tr><td>후기 작성 시</td><td>닉네임, 별점, 후기 내용, 작성 시각</td><td>후기 게시</td></tr>
      <tr><td>명소 추천 시</td><td>닉네임, 장소 이름, 주소(선택), 추천 이유, 사진(선택, 최대 3장), 작성 시각</td><td>여행자 추천 명소 게시 — 사진은 올리기 전에 크기를 줄이며, 촬영 위치(GPS) 등 사진 속 부가 정보는 지워집니다</td></tr>
      <tr><td>좋아요</td><td>좋아요를 누른 명소와 시각</td><td>좋아요 수 집계, 중복 방지</td></tr>
      <tr><td>자동 수집</td><td>후기 작성 시 접속 IP의 일방향 암호화(해시) 값 — 원래 IP는 저장하지 않음</td><td>도배·악성 게시물 방지</td></tr>
      <tr><td>브라우저 저장소</td><td>로그인 상태 유지 정보, 마지막으로 본 도시, 마지막으로 입력한 닉네임</td><td>이용 편의</td></tr>
    </table>
    <p>후기와 추천 명소는 모든 방문자에게 공개되며, 작성자가 입력한 닉네임만 함께 표시됩니다. 글에는 실명, 연락처 등 개인정보를 적지 말아 주세요.</p>

    <h2>2. 보관 기간</h2>
    <p>로그인 정보, 후기, 추천 명소, 좋아요는 이용자가 계정 삭제(회원 탈퇴)를 요청하거나 사이트 운영이 끝날 때까지 보관하며, 이후 지체 없이 파기합니다. 계정을 삭제하면 그 계정으로 작성한 후기·추천 명소·좋아요도 함께 삭제됩니다. 로그인 도입 전에 익명으로 남긴 후기와 좋아요는 위 기간 동안 그대로 보관됩니다.</p>

    <h2>3. 처리 위탁 및 국외 이전</h2>
    <p>사이트는 운영을 위해 아래 서비스를 이용합니다. 해당 업체의 서버는 국외에 있을 수 있습니다.</p>
    <table>
      <tr><th>업체</th><th>위탁 업무</th></tr>
      <tr><td>Supabase Inc.</td><td>회원 인증(로그인) 처리, 후기·추천 명소·좋아요 데이터 저장</td></tr>
      <tr><td>Cloudflare, Inc.</td><td>웹사이트 호스팅 및 전송</td></tr>
      <tr><td>Google LLC</td><td>Google 계정 로그인, 광고 게재(Google 애드센스), 검색 노출 분석</td></tr>
    </table>
    <p>사이트는 이용자의 정보를 위 목적 외에 제3자에게 판매하거나 제공하지 않습니다.</p>

    <h2>4. 광고와 쿠키</h2>
    <ul>
      <li>사이트는 Google 애드센스를 통해 광고를 게재할 수 있습니다.</li>
      <li>Google을 포함한 제3자 공급업체는 쿠키를 사용하여 이용자의 이 사이트 또는 다른 웹사이트 방문 기록을 바탕으로 광고를 게재합니다.</li>
      <li>Google은 광고 쿠키를 사용하여 이용자의 사이트 방문 기록을 바탕으로 Google과 파트너가 맞춤 광고를 게재할 수 있도록 합니다.</li>
      <li>이용자는 <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google 광고 설정</a>에서 맞춤 광고를 끌 수 있으며, <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">www.aboutads.info</a>에서 제3자 공급업체의 맞춤 광고 쿠키 사용을 거부할 수 있습니다.</li>
      <li>Google이 정보를 사용하는 방식은 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">Google 파트너 사이트 정책</a>에서 확인할 수 있습니다.</li>
      <li>브라우저 설정에서 쿠키를 거부할 수 있으나, 일부 기능이 제한될 수 있습니다.</li>
    </ul>

    <h2>5. 이용자의 권리</h2>
    <p>로그인한 이용자는 자신이 작성한 후기와 추천 명소를 사이트에서 직접 삭제할 수 있습니다. 개인정보 열람·수정·삭제나 계정 삭제(회원 탈퇴)를 원하시면 로그인에 사용한 Google 계정 이메일로 아래 주소에 요청해 주세요. 확인 후 지체 없이 처리합니다. 로그인 도입 전에 익명으로 남긴 후기는 해당 후기의 위치(도시·명소), 닉네임, 작성일을 알려 주시면 확인 후 처리합니다.</p>
    <p>Google 계정의 연결은 <a href="https://myaccount.google.com/connections" target="_blank" rel="noopener">Google 계정의 서드 파티 연결 관리</a>에서도 해제할 수 있습니다.</p>

    <h2>6. 개인정보 보호책임자 및 문의</h2>
    <p>운영자: 하루트립 운영자<br />이메일: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
    <p>개인정보 침해 관련 상담은 개인정보침해신고센터(privacy.kisa.or.kr, 국번 없이 118)에도 문의할 수 있습니다.</p>

    <h2>7. 방침의 변경</h2>
    <p>이 방침이 바뀌면 시행 7일 전부터 이 페이지에 알립니다.</p>
    </article>`,
  en: () => `
    <article class="policy">
    <h1>Privacy Policy</h1>
    <p class="updated">Effective date: November 12, 2026 (revised for Google sign-in)</p>
    <p>HARU TRIP (the "Site") complies with Korea's Personal Information Protection Act and other applicable laws and treats your personal information with care. This policy explains what information the Site collects, why, and how it is managed. If this English version differs from the <a href="../privacy.html">Korean version</a>, the Korean version prevails.</p>

    <h2>1. Information we collect and why</h2>
    <p>Anyone can read travel information and reviews without signing in. Liking spots, posting reviews and recommending places require signing in with a Google account. The Site never receives or stores your password.</p>
    <table>
      <tr><th>Type</th><th>Items</th><th>Purpose</th></tr>
      <tr><td>Google sign-in</td><td>Email address, name, profile picture URL and Google account identifier provided by Google</td><td>Verifying members, preventing duplicate likes, deleting your own posts, preventing spam — never shown on the Site</td></tr>
      <tr><td>When you post a review</td><td>Nickname, rating, review text, time posted</td><td>Publishing reviews</td></tr>
      <tr><td>When you recommend a place</td><td>Nickname, place name, address (optional), reason, photos (optional, up to 3), time posted</td><td>Publishing traveler picks — photos are resized before upload and embedded data such as GPS location is removed</td></tr>
      <tr><td>Likes</td><td>Which spots you liked and when</td><td>Counting likes, preventing duplicates</td></tr>
      <tr><td>Collected automatically</td><td>A one-way hash of your IP address when posting a review — the original IP is not stored</td><td>Preventing spam and abusive posts</td></tr>
      <tr><td>Browser storage</td><td>Sign-in session, the last city you viewed, the last nickname you entered</td><td>Convenience</td></tr>
    </table>
    <p>Reviews and recommendations are visible to all visitors along with the nickname you enter — nothing else from your account is shown. Please do not include your real name, contact details or other personal information in your posts.</p>

    <h2>2. Retention</h2>
    <p>Sign-in information, reviews, recommendations and likes are kept until you request account deletion or the Site shuts down, and are then destroyed without delay. Deleting your account also deletes the reviews, recommendations and likes made with it. Anonymous reviews and likes left before sign-in was introduced are kept for the same period.</p>

    <h2>3. Service providers and international transfer</h2>
    <p>The Site uses the services below. Their servers may be located outside Korea.</p>
    <table>
      <tr><th>Company</th><th>Service</th></tr>
      <tr><td>Supabase Inc.</td><td>Member authentication (sign-in), storing reviews, recommendations and likes</td></tr>
      <tr><td>Cloudflare, Inc.</td><td>Website hosting and delivery</td></tr>
      <tr><td>Google LLC</td><td>Google account sign-in, advertising (Google AdSense), search performance analysis</td></tr>
    </table>
    <p>The Site does not sell or provide your information to third parties for any other purpose.</p>

    <h2>4. Advertising and cookies</h2>
    <ul>
      <li>The Site may display ads through Google AdSense.</li>
      <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
      <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this Site and/or other sites on the Internet.</li>
      <li>You can opt out of personalized advertising in <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ads Settings</a>, and opt out of third-party vendors' use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">www.aboutads.info</a>.</li>
      <li>See <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">How Google uses information from sites that use its services</a>.</li>
      <li>You can block cookies in your browser settings, but some features may not work.</li>
    </ul>

    <h2>5. Your rights</h2>
    <p>When signed in, you can delete your own reviews and recommendations directly on the Site. To view, correct or delete your personal information, or to delete your account, email us from the Google account you signed in with and we will handle it without delay after verification. For anonymous reviews posted before sign-in was introduced, tell us the location (city and spot), nickname and date posted.</p>
    <p>You can also remove the Site's access in your <a href="https://myaccount.google.com/connections" target="_blank" rel="noopener">Google Account third-party connections</a>.</p>

    <h2>6. Privacy officer and contact</h2>
    <p>Operator: HARU TRIP<br />Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
    <p>You may also contact the Korea Internet & Security Agency's Personal Information Infringement Report Center (privacy.kisa.or.kr, +82-118).</p>

    <h2>7. Changes to this policy</h2>
    <p>If this policy changes, we will post a notice on this page at least 7 days before the change takes effect.</p>
    </article>`
};

function privacyPage(L) {
  return { file: 'privacy.html', html: layout(L, { file: 'privacy.html', title: L.STR.privacyTitle, description: L.STR.privacyDesc, body: privacyBody[L.code]() }) };
}

// ---- 이용약관
const termsBody = {
  ko: () => `
    <article class="policy">
    <h1>이용약관</h1>
    <p class="updated">시행일: 2026년 11월 12일 (Google 로그인 · 여행자 추천 명소 도입에 따른 개정)</p>

    <h2>1. 목적</h2>
    <p>이 약관은 하루트립(이하 "사이트")이 제공하는 여행 정보, 좋아요, 후기, 여행자 추천 명소 기능의 이용 조건을 정합니다.</p>

    <h2>2. 로그인</h2>
    <ul>
      <li>여행 정보와 후기는 누구나 볼 수 있습니다. 좋아요, 후기 작성, 명소 추천은 Google 계정으로 로그인한 뒤 이용할 수 있습니다.</li>
      <li>계정을 다른 사람과 함께 쓰거나 남의 계정을 쓰지 마세요. 규칙을 반복해서 어기는 계정은 글쓰기가 제한될 수 있습니다.</li>
      <li>계정 삭제(회원 탈퇴)는 아래 이메일로 요청할 수 있으며, 삭제하면 그 계정으로 쓴 후기·추천·좋아요도 함께 삭제됩니다.</li>
    </ul>

    <h2>3. 여행 정보</h2>
    <ul>
      <li>사이트의 여행 정보는 참고용이며, 운영 시간·요금·출입 통제 등은 사전 예고 없이 바뀔 수 있습니다.</li>
      <li>방문 전 각 장소의 공식 안내를 확인해 주세요. 사이트는 정보의 변경으로 생긴 손해에 대해 책임지지 않습니다.</li>
    </ul>

    <h2>4. 후기 · 명소 추천 작성 규칙</h2>
    <p>다음에 해당하는 후기와 추천은 예고 없이 숨기거나 삭제할 수 있습니다.</p>
    <ul>
      <li>욕설, 비방, 차별, 음란한 내용</li>
      <li>광고, 홍보, 링크, 같은 내용의 반복 게시</li>
      <li>본인 또는 타인의 실명·연락처 등 개인정보</li>
      <li>사실과 다른 내용으로 다른 사람이나 업체에 피해를 주는 글</li>
      <li>저작권 등 다른 사람의 권리를 침해하는 글</li>
      <li>실제로 없거나 방문할 수 없는 장소, 영업·홍보를 목적으로 한 장소 추천</li>
      <li>본인이 찍지 않았거나 사용할 권리가 없는 사진, 다른 사람의 얼굴·차량 번호판 등이 알아볼 수 있게 나온 사진, 장소와 관계없는 사진</li>
    </ul>

    <h2>5. 게시물의 권리와 책임</h2>
    <p>후기와 추천의 저작권은 작성자에게 있으며, 작성자는 사이트가 해당 글을 사이트 안에 표시하는 것에 동의합니다. 사이트는 추천된 장소를 참고해 직접 취재·작성한 소개 글을 사이트에 추가할 수 있습니다. 글 내용에 대한 책임은 작성자에게 있으며, 작성자는 언제든 자신의 글을 삭제할 수 있습니다.</p>

    <h2>6. 사진과 콘텐츠</h2>
    <p>사이트의 사진은 자유 이용 라이선스로 공개된 사진이며, 각 사진의 라이선스는 <a href="credits.html">사진 출처</a>에서 확인할 수 있습니다. 그 밖의 글과 구성의 저작권은 하루트립에 있습니다.</p>

    <h2>7. 광고</h2>
    <p>사이트에는 Google 애드센스 광고가 게재될 수 있습니다. 광고 내용과 광고주가 제공하는 상품·서비스에 대한 책임은 해당 광고주에게 있습니다.</p>

    <h2>8. 문의</h2>
    <p><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
    </article>`,
  en: () => `
    <article class="policy">
    <h1>Terms of Use</h1>
    <p class="updated">Effective date: November 12, 2026 (revised for Google sign-in and traveler picks)</p>
    <p>If this English version differs from the <a href="../terms.html">Korean version</a>, the Korean version prevails.</p>

    <h2>1. Purpose</h2>
    <p>These terms set out the conditions for using the travel information, likes, reviews and traveler picks provided by HARU TRIP (the "Site").</p>

    <h2>2. Sign-in</h2>
    <ul>
      <li>Anyone can read travel information and reviews. Liking spots, posting reviews and recommending places require signing in with a Google account.</li>
      <li>Do not share your account or use someone else's. Accounts that repeatedly break these rules may be restricted from posting.</li>
      <li>You can request account deletion by email. Deleting your account also deletes the reviews, recommendations and likes made with it.</li>
    </ul>

    <h2>3. Travel information</h2>
    <ul>
      <li>Travel information on the Site is for reference only. Opening hours, fees and access restrictions may change without notice.</li>
      <li>Please check each place's official information before visiting. The Site is not responsible for any loss caused by changes in information.</li>
    </ul>

    <h2>4. Rules for reviews and recommendations</h2>
    <p>Reviews and recommendations that fall under any of the following may be hidden or deleted without notice:</p>
    <ul>
      <li>Abusive, defamatory, discriminatory or obscene content</li>
      <li>Ads, promotions, links or repeated identical posts</li>
      <li>Real names, contact details or other personal information about yourself or others</li>
      <li>False content that harms other people or businesses</li>
      <li>Content that infringes copyright or other rights</li>
      <li>Recommendations of places that don't exist or can't be visited, or that are made for commercial promotion</li>
      <li>Photos you didn't take or don't have the right to use, photos in which other people's faces or license plates can be identified, or photos unrelated to the place</li>
    </ul>

    <h2>5. Rights and responsibilities for posts</h2>
    <p>Authors keep the copyright to their reviews and recommendations and agree that the Site may display them on the Site. The Site may research recommended places and add its own write-ups. Authors are responsible for the content of their posts and can delete them at any time.</p>

    <h2>6. Photos and content</h2>
    <p>Photos on the Site are freely licensed images; see <a href="../credits.html">photo credits</a> for each license. Copyright in all other text and design belongs to HARU TRIP.</p>

    <h2>7. Advertising</h2>
    <p>The Site may display Google AdSense ads. Advertisers are responsible for their ads and the products and services they offer.</p>

    <h2>8. Contact</h2>
    <p><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
    </article>`
};

function termsPage(L) {
  return { file: 'terms.html', html: layout(L, { file: 'terms.html', title: L.STR.termsTitle, description: L.STR.termsDesc, body: termsBody[L.code]() }) };
}

// ---- 사이트맵 (두 언어, hreflang 연결)
function sitemap() {
  const pages = [
    { file: '', priority: '1.0' },
    ...LANGS.ko.cities.map(c => ({ file: `guide-${c.id}.html`, priority: '0.9' })),
    { file: 'about.html', priority: '0.5' },
    { file: 'privacy.html', priority: '0.3' },
    { file: 'terms.html', priority: '0.3' }
  ];
  const entries = [];
  for (const L of Object.values(LANGS)) {
    for (const p of pages) {
      const links = Object.values(LANGS)
        .map(o => `    <xhtml:link rel="alternate" hreflang="${o.code}" href="${SITE}/${o.dir}${p.file}" />`).join('\n');
      entries.push(`  <url>
    <loc>${SITE}/${L.dir}${p.file}</loc>
${links}
    <lastmod>${today}</lastmod>
    <priority>${L.code === 'ko' ? p.priority : (Number(p.priority) * 0.9).toFixed(1)}</priority>
  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

// ---- index.html 애드센스 블록 갱신
function patchIndexAdsense() {
  const p = path.join(ROOT, 'index.html');
  const raw = fs.readFileSync(p, 'utf8');
  const re = /<!-- ADSENSE:START -->[\s\S]*?<!-- ADSENSE:END -->/;
  if (!re.test(raw)) return;
  const tag = adsenseTag() || '<!-- config.js의 adsenseClient에 ca-pub-... 값을 넣고 node generate_pages.js 를 실행하면 여기에 광고 코드가 들어갑니다 -->';
  fs.writeFileSync(p, raw.replace(re, `<!-- ADSENSE:START -->\n  ${tag}\n  <!-- ADSENSE:END -->`));
}

// ---- en/index.html: index.html 을 템플릿으로 영어판 생성
//   data-i18n="키"            → 요소 안쪽 HTML 을 en.page[키] 로 교체
//   data-i18n-attr="속성:키,…" → 해당 속성 값을 en.page[키] 로 교체
//   상대 경로(img, css, js 등)는 '../' 를 붙여 루트 파일을 가리키게 함
function buildEnIndex() {
  const dict = UI.en.page;
  const need = (key) => {
    if (dict[key] === undefined) throw new Error(`i18n/ui.js 의 en.page 에 "${key}" 번역이 없습니다.`);
    return dict[key];
  };
  let html = read('index.html');

  html = html.replace('<html lang="ko">', '<html lang="en" data-asset-base="../">');

  html = html.replace(/<([a-z][a-z0-9]*)\b([^>]*?)\sdata-i18n="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g,
    (m, tag, before, key, after) => `<${tag}${before} data-i18n="${key}"${after}>${need(key)}</${tag}>`);

  html = html.replace(/<[a-z][a-z0-9]*\b[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tagHtml, spec) => {
    let out = tagHtml;
    for (const pair of spec.split(',')) {
      const [attr, key] = pair.split(':').map(s => s.trim());
      const value = esc(need(key));
      const re = new RegExp(`(\\s${attr}=")[^"]*(")`);
      out = re.test(out) ? out.replace(re, `$1${value}$2`) : out.replace(/\s*\/?>$/, (end) => ` ${attr}="${value}"${end}`);
    }
    return out;
  });

  // 영어 번역 데이터: 마지막 data_*.js 다음, app.js 앞에 로드
  html = html.replace('<script src="app.js"></script>', '<script src="i18n/data_en.js"></script>\n  <script src="app.js"></script>');

  // en/ 안에 영어판이 있는 페이지는 그대로, 나머지 상대 경로는 루트를 가리키도록
  const enPages = new Set(['about.html', 'privacy.html', 'terms.html', ...LANGS.en.cities.map(c => `guide-${c.id}.html`)]);
  html = html.replace(/\b(src|href)="([^"]*)"/g, (m, attr, url) => {
    if (!url || /^(https?:|\/|#|\?|\.\/|\.\.\/|mailto:|javascript:|data:)/.test(url) || enPages.has(url)) return m;
    return `${attr}="../${url}"`;
  });

  if (/data-i18n="[^"]+"[^>]*>[^<]*[가-힣]/.test(html)) console.warn('⚠️  en/index.html 에 번역되지 않은 한국어가 남아 있을 수 있습니다.');
  return html;
}

// ---- 영어 번역이 빠진 필드 찾기 (한국어가 남아 있는 곳)
function checkEnglish() {
  const missing = [];
  const scan = (where, obj, fields) => fields.forEach(f => {
    const v = obj[f];
    const text = Array.isArray(v) ? v.join(' ') : String(v ?? '');
    if (HANGUL.test(text)) missing.push(`${where}.${f}`);
  });
  for (const c of LANGS.en.cities) {
    scan(c.id, c, ['name', 'badge', 'pageTitle', 'metaDesc', 'heroPill', 'heroTitle', 'heroSubtitle']);
    c.courses.forEach(co => scan(`${c.id}.courses.${co.id}`, co, ['title', 'subtitle', 'highlight', 'duration', 'distance']));
    c.destinations.forEach(d => scan(`${c.id}.destinations.${d.id}`, d,
      ['name', 'theme', 'tags', 'imageCaptions', 'shortDesc', 'fullDesc', 'timeRecommended', 'address', 'tip']));
  }
  return missing;
}

// ---- 실행
for (const L of Object.values(LANGS)) {
  const outDir = path.join(ROOT, L.dir);
  fs.mkdirSync(outDir, { recursive: true });
  const pages = [...L.cities.map(c => cityGuide(L, c)), aboutPage(L), privacyPage(L), termsPage(L)];
  pages.forEach(({ file, html }) => fs.writeFileSync(path.join(outDir, file), html, 'utf8'));
  console.log(`[${L.code}] 페이지 ${pages.length}개 생성: ${pages.map(p => L.dir + p.file).join(', ')}`);
}
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap(), 'utf8');
patchIndexAdsense();
fs.writeFileSync(path.join(ROOT, 'en', 'index.html'), buildEnIndex(), 'utf8');
console.log('[en] en/index.html 생성 (index.html + i18n/ui.js)');

if (/^ca-pub-\d{10,20}$/.test(ADSENSE_CLIENT)) {
  fs.writeFileSync(path.join(ROOT, 'ads.txt'), `google.com, ${ADSENSE_CLIENT.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`, 'utf8');
}

const missing = checkEnglish();
if (missing.length) {
  console.warn(`⚠️  영어 번역이 없는 항목 ${missing.length}개 (i18n/data_en.js 에 추가하세요):`);
  missing.forEach(m => console.warn(`   - ${m}`));
} else {
  console.log('✅ 모든 도시·코스·명소의 영어 번역이 있습니다.');
}
console.log(ADSENSE_CLIENT ? `애드센스 코드 적용: ${ADSENSE_CLIENT}` : '애드센스 코드 없음 (config.js의 adsenseClient가 비어 있음)');
