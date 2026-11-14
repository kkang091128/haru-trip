// data.js를 읽어 rss.xml(한국어)과 en/rss.xml(영어)을 생성합니다.
// 사용법: node generate_rss.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
// 참고: 도시 가이드 페이지(guide-*.html)는 generate_pages.js 로 만듭니다.

const SITE = 'https://haru-trip-h0v.pages.dev';

// data.js 다음에 도시별 data_*.js 파일을 이어서 실행 (영어는 i18n/data_en.js 까지)
const dataFiles = ['data.js', ...fs.readdirSync(__dirname).filter(f => /^data_.+\.js$/.test(f)).sort()];
function loadCities(extraFiles = []) {
  const code = [...dataFiles, ...extraFiles].map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(code + '\nthis.CITIES_DATA = CITIES_DATA;', ctx);
  return ctx.CITIES_DATA;
}

const esc = (s) => String(s)
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const now = new Date().toUTCString();

// ---- 검색 키워드(<category>) 만들기 ----
// 명소 이름·테마·해시태그를 단어 단위로 쪼개 항목마다 여러 개의 <category>로 넣습니다.
const splitWords = (s) => String(s)
  .split(/[&/·,()]+/)          // "유달산 공원 & 노적봉" -> ["유달산 공원", "노적봉"]
  .map(w => w.trim())
  .filter(Boolean);
const uniq = (arr) => [...new Set(arr.map(w => w.trim()).filter(Boolean))];
const categories = (words) => uniq(words)
  .map(w => `      <category>${esc(w)}</category>`)
  .join('\n');

const LANGS = [
  {
    code: 'ko', dir: '', file: 'rss.xml', cities: loadCities(),
    channelTitle: '하루트립 - 전국 당일치기 여행 가이드',
    channelDesc: 'A, B, C 맞춤 코스로 즐기는 전국 당일치기 여행 가이드. 부산, 목포, 강릉, 전주, 제주, 여수의 명소와 코스를 한눈에 둘러보세요.',
    itemTitle: (city, d) => `[${city.name}] ${d.name}`,
    cityWords: (city) => [city.name, `${city.name} 여행`, `${city.name} 당일치기`, `${city.name} 여행코스`, `${city.name} 가볼만한곳`, '당일치기 여행', '국내여행'],
    destWords: (city) => [city.name, `${city.name} 여행`, `${city.name} 당일치기`, `${city.name} 가볼만한곳`]
  },
  {
    code: 'en', dir: 'en/', file: 'en/rss.xml', cities: loadCities(['i18n/data_en.js']),
    channelTitle: 'HARU TRIP - Korea Day Trip Guide',
    channelDesc: 'Day trip guides to Korea with curated A, B and C courses. Discover the best spots and itineraries in Busan, Mokpo, Gangneung, Jeonju, Jeju and Yeosu.',
    itemTitle: (city, d) => `[${city.name}] ${d.name}`,
    cityWords: (city) => [city.name, `${city.name} travel`, `${city.name} day trip`, `${city.name} itinerary`, `things to do in ${city.name}`, 'Korea day trip', 'Korea travel'],
    destWords: (city) => [city.name, `${city.name} travel`, `${city.name} day trip`, `things to do in ${city.name}`]
  }
];

for (const L of LANGS) {
  const outFile = path.join(__dirname, L.file);
  const items = [];

  // 이미 발행된 항목은 기존 발행일을 유지 (빌드할 때마다 모든 글이 '새 글'로 바뀌지 않도록)
  const oldDates = {};
  try {
    const old = fs.readFileSync(outFile, 'utf8');
    for (const m of old.matchAll(/<guid[^>]*>([^<]+)<\/guid>[\s\S]*?<pubDate>([^<]+)<\/pubDate>/g)) oldDates[m[1]] = m[2];
  } catch (e) { /* 첫 생성이면 무시 */ }
  const pubDate = (guid) => oldDates[esc(guid)] || now;

  for (const city of Object.values(L.cities)) {
    const link = `${SITE}/${L.dir}guide-${city.id}.html`;
    items.push(`    <item>
      <title>${esc(city.pageTitle)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <description>${esc(city.metaDesc)}</description>
${categories([
  ...L.cityWords(city),
  ...city.destinations.flatMap(d => splitWords(d.name)),
])}
      <pubDate>${pubDate(link)}</pubDate>
    </item>`);

    for (const d of city.destinations) {
      items.push(`    <item>
      <title>${esc(L.itemTitle(city, d))}</title>
      <link>${esc(`${link}#${d.id}`)}</link>
      <guid isPermaLink="true">${esc(`${link}#${d.id}`)}</guid>
      <description>${esc(d.shortDesc)}</description>
${categories([
  ...L.destWords(city),
  ...splitWords(d.name),
  ...splitWords(d.theme || ''),
  ...(d.tags || []).map(t => t.replace(/^#/, '')),
])}
      <pubDate>${pubDate(`${link}#${d.id}`)}</pubDate>
    </item>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(L.channelTitle)}</title>
    <link>${SITE}/${L.dir}</link>
    <description>${esc(L.channelDesc)}</description>
    <language>${L.code}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE}/${L.file}" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, xml, 'utf8');
  console.log(`${L.file} 생성 완료 (${items.length}개 항목)`);
}
