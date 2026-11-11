// ========================================================
// 읽기용 정적 페이지 생성기
//   - guide-<도시>.html : 도시별 당일치기 가이드 (검색엔진·애드센스 심사용 본문)
//   - about.html, privacy.html, terms.html
//   - sitemap.xml
//   - index.html 의 애드센스 코드 블록 (config.js의 adsenseClient 값)
// 사용법: node generate_pages.js   (data*.js 또는 config.js를 바꾼 뒤 다시 실행)
// ========================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const SITE = 'https://haru-trip-h0v.pages.dev';
const CONTACT_EMAIL = 'ck2lucky@gmail.com';
const SITE_NAME = '하루트립';
const today = new Date().toISOString().slice(0, 10);

// ---- 데이터 & 설정 읽기
const dataFiles = ['data.js', ...fs.readdirSync(ROOT).filter(f => /^data_.+\.js$/.test(f)).sort()];
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'config.js'), 'utf8'), ctx);
vm.runInContext(dataFiles.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n') + '\nthis.CITIES_DATA = CITIES_DATA;', ctx);
const CITIES = Object.values(ctx.CITIES_DATA);
const CONFIG = ctx.window.HARU_CONFIG || {};
const ADSENSE_CLIENT = (CONFIG.adsenseClient || '').trim();

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = (s) => String(s ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function adsenseTag() {
  if (!/^ca-pub-\d{10,20}$/.test(ADSENSE_CLIENT)) return '';
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>`;
}

function layout({ file, title, description, body, jsonLd, noindex }) {
  const url = `${SITE}/${file}`;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${url}" />
  ${noindex ? '<meta name="robots" content="noindex" />' : ''}
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <link rel="alternate" type="application/rss+xml" title="하루트립 RSS" href="/rss.xml" />
  <link rel="stylesheet" href="pages.css" />
  ${adsenseTag()}
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body>
  <header class="page-header">
    <div class="page-header-inner">
      <a class="page-logo" href="./">🌊 하루트립</a>
      <nav aria-label="도시별 가이드">
        ${CITIES.map(c => `<a href="guide-${c.id}.html">${esc(c.name)}</a>`).join('\n        ')}
      </nav>
    </div>
  </header>
  <main class="page">
${body}
  </main>
  <footer class="page-footer">
    <div class="page-footer-inner">
      <nav aria-label="사이트 정보">
        <a href="./">홈</a>
        <a href="about.html">사이트 소개</a>
        <a href="privacy.html">개인정보처리방침</a>
        <a href="terms.html">이용약관</a>
        <a href="credits.html">사진 출처</a>
        <a href="mailto:${CONTACT_EMAIL}">문의: ${CONTACT_EMAIL}</a>
      </nav>
      <div>© 2026 하루트립 (HARU TRIP). 대한민국 당일치기 여행 가이드.</div>
    </div>
  </footer>
</body>
</html>
`;
}

// ---- 도시 가이드
function cityGuide(city) {
  const file = `guide-${city.id}.html`;
  const destById = Object.fromEntries(city.destinations.map(d => [d.id, d]));
  const title = `${city.name} 당일치기 여행 코스 총정리 (A·B·C 3가지 코스, 명소 ${city.destinations.length}곳) | ${SITE_NAME}`;
  const description = stripTags(city.metaDesc);

  const toc = city.courses.map(c => `<li><a href="#course-${c.id}">${esc(c.badge)}: ${esc(c.title)}</a></li>`).join('\n          ');

  const courses = city.courses.map(course => {
    const spots = course.destinations.map((id, i) => {
      const d = destById[id];
      if (!d) return '';
      return `
      <article class="spot" id="${d.id}">
        <figure>
          <img src="${esc(d.images[0])}" alt="${esc(d.name)} - ${esc(d.imageCaptions[0] || '')}" loading="lazy" width="1280" height="720" />
          <figcaption>${esc(d.imageCaptions[0] || d.name)}</figcaption>
        </figure>
        <div class="spot-body">
          <h3>${i + 1}. ${esc(d.name)}</h3>
          <p class="spot-eng">${esc(d.engName)} · ${esc(d.theme)}</p>
          <p>${esc(d.fullDesc)}</p>
          <dl>
            <dt>추천 소요시간</dt><dd>${esc(String(d.timeRecommended).replace(/^소요시간:\s*/, ''))}</dd>
            <dt>주소</dt><dd>${esc(d.address)}</dd>
            <dt>여행 팁</dt><dd>${esc(d.tip)}</dd>
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
      <p><strong>추천 동선:</strong> ${esc(route)}</p>
      <p>${esc(course.highlight)}</p>
      ${spots}
    </section>`;
  }).join('\n');

  const others = CITIES.filter(c => c.id !== city.id)
    .map(c => `<a href="guide-${c.id}.html">${esc(c.name)} 당일치기 가이드</a>`).join(' · ');

  const body = `
    <div class="breadcrumb"><a href="./">홈</a> › ${esc(city.name)} 당일치기 가이드</div>
    <h1>${esc(city.name)} 당일치기 여행 코스 총정리</h1>
    <p class="updated">최종 업데이트: ${today}</p>
    <p class="lead">${esc(stripTags(city.heroSubtitle))}</p>
    <p>${esc(description)} 아래에서 취향에 맞는 코스를 고르고, 코스별 명소의 특징과 추천 소요시간, 주소, 현지 여행 팁을 확인해 보세요.</p>
    <a class="cta" href="./?city=${city.id}">사진·지도형 가이드로 보기 →</a>
    <nav class="toc" aria-label="목차">
      <strong>이 글의 코스</strong>
      <ol>
          ${toc}
      </ol>
    </nav>
    ${courses}
    <div class="notice">운영 시간, 요금, 출입 통제 여부는 계절과 현지 사정에 따라 바뀔 수 있습니다. 방문 전에 각 장소의 공식 안내를 꼭 확인해 주세요.</div>
    <p>다른 도시도 둘러보세요: ${others}</p>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${city.name} 당일치기 여행 코스 총정리`,
    description,
    dateModified: today,
    inLanguage: 'ko',
    mainEntityOfPage: `${SITE}/${file}`,
    image: city.destinations.slice(0, 3).map(d => `${SITE}/${d.images[0]}`),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME }
  };

  return { file, html: layout({ file, title, description, body, jsonLd }) };
}

// ---- 사이트 소개
function aboutPage() {
  const cityList = CITIES.map(c => `<li><a href="guide-${c.id}.html">${esc(c.name)}</a> — ${esc(stripTags(c.metaDesc))}</li>`).join('\n      ');
  const body = `
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
    <h2>방문자 후기</h2>
    <p>각 명소의 좋아요와 후기는 실제 방문자가 남긴 것만 표시합니다. 운영자가 임의로 만든 후기나 숫자는 없습니다. 욕설, 광고, 개인정보가 담긴 글은 <a href="terms.html">이용약관</a>에 따라 숨김 처리될 수 있습니다.</p>
    <h2>광고 안내</h2>
    <p>하루트립은 사이트 운영비를 마련하기 위해 Google 애드센스 광고를 게재할 수 있습니다. 광고는 콘텐츠와 구분되어 표시되며, 광고 쿠키에 관한 내용은 <a href="privacy.html">개인정보처리방침</a>에서 확인하실 수 있습니다.</p>
    <h2>문의</h2>
    <p>정보 수정 요청, 제휴, 기타 문의: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>`;
  return { file: 'about.html', html: layout({ file: 'about.html', title: `사이트 소개 | ${SITE_NAME}`, description: '하루트립은 국내 도시별 당일치기 여행 코스와 명소 정보를 소개하는 여행 가이드입니다.', body }) };
}

// ---- 개인정보처리방침
function privacyPage() {
  const body = `
    <article class="policy">
    <h1>개인정보처리방침</h1>
    <p class="updated">시행일: 2026년 11월 11일</p>
    <p>하루트립(이하 "사이트")은 「개인정보 보호법」 등 관련 법령을 지키며, 이용자의 개인정보를 소중히 다룹니다. 이 방침은 사이트가 어떤 정보를 왜 수집하고 어떻게 관리하는지 설명합니다.</p>

    <h2>1. 수집하는 정보와 목적</h2>
    <p>사이트는 회원가입 없이 이용할 수 있으며, 이름·전화번호·이메일 같은 정보를 요구하지 않습니다.</p>
    <table>
      <tr><th>구분</th><th>항목</th><th>목적</th></tr>
      <tr><td>후기 작성 시 (선택)</td><td>닉네임, 별점, 후기 내용, 작성 시각</td><td>후기 게시</td></tr>
      <tr><td>자동 생성</td><td>브라우저별 무작위 식별값(이용자 개인을 알아볼 수 없는 값)</td><td>좋아요 중복 방지, 도배 방지</td></tr>
      <tr><td>자동 수집</td><td>후기 작성 시 접속 IP의 일방향 암호화(해시) 값 — 원래 IP는 저장하지 않음</td><td>도배·악성 게시물 방지</td></tr>
      <tr><td>브라우저 저장소</td><td>마지막으로 본 도시, 좋아요 표시 상태</td><td>이용 편의</td></tr>
    </table>
    <p>후기에는 실명, 연락처 등 개인정보를 적지 말아 주세요. 후기는 모든 방문자에게 공개됩니다.</p>

    <h2>2. 보관 기간</h2>
    <p>후기와 좋아요 정보는 이용자가 삭제를 요청하거나 사이트 운영이 끝날 때까지 보관하며, 이후 지체 없이 파기합니다.</p>

    <h2>3. 처리 위탁 및 국외 이전</h2>
    <p>사이트는 운영을 위해 아래 서비스를 이용합니다. 해당 업체의 서버는 국외에 있을 수 있습니다.</p>
    <table>
      <tr><th>업체</th><th>위탁 업무</th></tr>
      <tr><td>Supabase Inc.</td><td>후기·좋아요 데이터 저장</td></tr>
      <tr><td>Cloudflare, Inc.</td><td>웹사이트 호스팅 및 전송</td></tr>
      <tr><td>Google LLC</td><td>광고 게재(Google 애드센스), 검색 노출 분석</td></tr>
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
    <p>이용자는 자신이 작성한 후기의 열람, 수정, 삭제를 요청할 수 있습니다. 아래 이메일로 해당 후기의 위치(도시·명소)와 닉네임, 작성일을 알려 주시면 확인 후 처리합니다.</p>

    <h2>6. 개인정보 보호책임자 및 문의</h2>
    <p>운영자: 하루트립 운영자<br />이메일: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
    <p>개인정보 침해 관련 상담은 개인정보침해신고센터(privacy.kisa.or.kr, 국번 없이 118)에도 문의할 수 있습니다.</p>

    <h2>7. 방침의 변경</h2>
    <p>이 방침이 바뀌면 시행 7일 전부터 이 페이지에 알립니다.</p>
    </article>`;
  return { file: 'privacy.html', html: layout({ file: 'privacy.html', title: `개인정보처리방침 | ${SITE_NAME}`, description: '하루트립 개인정보처리방침 — 수집하는 정보, 광고 쿠키, 이용자의 권리 안내', body }) };
}

// ---- 이용약관
function termsPage() {
  const body = `
    <article class="policy">
    <h1>이용약관</h1>
    <p class="updated">시행일: 2026년 11월 11일</p>

    <h2>1. 목적</h2>
    <p>이 약관은 하루트립(이하 "사이트")이 제공하는 여행 정보와 후기 기능의 이용 조건을 정합니다.</p>

    <h2>2. 여행 정보</h2>
    <ul>
      <li>사이트의 여행 정보는 참고용이며, 운영 시간·요금·출입 통제 등은 사전 예고 없이 바뀔 수 있습니다.</li>
      <li>방문 전 각 장소의 공식 안내를 확인해 주세요. 사이트는 정보의 변경으로 생긴 손해에 대해 책임지지 않습니다.</li>
    </ul>

    <h2>3. 후기 작성 규칙</h2>
    <p>다음에 해당하는 후기는 예고 없이 숨기거나 삭제할 수 있습니다.</p>
    <ul>
      <li>욕설, 비방, 차별, 음란한 내용</li>
      <li>광고, 홍보, 링크, 같은 내용의 반복 게시</li>
      <li>본인 또는 타인의 실명·연락처 등 개인정보</li>
      <li>사실과 다른 내용으로 다른 사람이나 업체에 피해를 주는 글</li>
      <li>저작권 등 다른 사람의 권리를 침해하는 글</li>
    </ul>

    <h2>4. 게시물의 권리와 책임</h2>
    <p>후기의 저작권은 작성자에게 있으며, 작성자는 사이트가 해당 후기를 사이트 안에 표시하는 것에 동의합니다. 후기 내용에 대한 책임은 작성자에게 있습니다.</p>

    <h2>5. 사진과 콘텐츠</h2>
    <p>사이트의 사진은 자유 이용 라이선스로 공개된 사진이며, 각 사진의 라이선스는 <a href="credits.html">사진 출처</a>에서 확인할 수 있습니다. 그 밖의 글과 구성의 저작권은 하루트립에 있습니다.</p>

    <h2>6. 광고</h2>
    <p>사이트에는 Google 애드센스 광고가 게재될 수 있습니다. 광고 내용과 광고주가 제공하는 상품·서비스에 대한 책임은 해당 광고주에게 있습니다.</p>

    <h2>7. 문의</h2>
    <p><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
    </article>`;
  return { file: 'terms.html', html: layout({ file: 'terms.html', title: `이용약관 | ${SITE_NAME}`, description: '하루트립 이용약관 — 여행 정보 이용, 후기 작성 규칙, 광고 안내', body }) };
}

// ---- 사이트맵
function sitemap(files) {
  const urls = [
    { loc: `${SITE}/`, priority: '1.0' },
    ...CITIES.map(c => ({ loc: `${SITE}/guide-${c.id}.html`, priority: '0.9' })),
    { loc: `${SITE}/about.html`, priority: '0.5' },
    { loc: `${SITE}/privacy.html`, priority: '0.3' },
    { loc: `${SITE}/terms.html`, priority: '0.3' }
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
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

// ---- 실행
const pages = [...CITIES.map(cityGuide), aboutPage(), privacyPage(), termsPage()];
pages.forEach(({ file, html }) => fs.writeFileSync(path.join(ROOT, file), html, 'utf8'));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap(), 'utf8');
patchIndexAdsense();

if (/^ca-pub-\d{10,20}$/.test(ADSENSE_CLIENT)) {
  fs.writeFileSync(path.join(ROOT, 'ads.txt'), `google.com, ${ADSENSE_CLIENT.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`, 'utf8');
}

console.log(`페이지 ${pages.length}개 생성: ${pages.map(p => p.file).join(', ')}`);
console.log(ADSENSE_CLIENT ? `애드센스 코드 적용: ${ADSENSE_CLIENT}` : '애드센스 코드 없음 (config.js의 adsenseClient가 비어 있음)');
