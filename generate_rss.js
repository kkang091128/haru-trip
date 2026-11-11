// data.js를 읽어 rss.xml을 생성합니다.
// 사용법: node generate_rss.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = 'https://haru-trip-h0v.pages.dev';

// data.js 다음에 도시별 data_*.js 파일을 이어서 실행
const dataFiles = ['data.js', ...fs.readdirSync(__dirname).filter(f => /^data_.+\.js$/.test(f)).sort()];
const code = dataFiles.map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\nthis.CITIES_DATA = CITIES_DATA;', ctx);
const cities = ctx.CITIES_DATA;

const esc = (s) => String(s)
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const now = new Date().toUTCString();
const items = [];

for (const city of Object.values(cities)) {
  const link = `${SITE}/?city=${city.id}`;
  items.push(`    <item>
      <title>${esc(city.pageTitle)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <description>${esc(city.metaDesc)}</description>
      <category>${esc(city.name)}</category>
      <pubDate>${now}</pubDate>
    </item>`);

  for (const d of city.destinations) {
    items.push(`    <item>
      <title>${esc(`[${city.name}] ${d.name}`)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="false">${esc(`haru-trip-${city.id}-${d.id}`)}</guid>
      <description>${esc(d.shortDesc)}</description>
      <category>${esc(city.name)}</category>
      <pubDate>${now}</pubDate>
    </item>`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>하루트립 - 전국 당일치기 여행 가이드</title>
    <link>${SITE}/</link>
    <description>A, B, C 맞춤 코스로 즐기는 전국 당일치기 여행 가이드. 부산, 목포, 강릉, 전주, 제주의 명소와 코스를 한눈에 둘러보세요.</description>
    <language>ko</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(__dirname, 'rss.xml'), xml, 'utf8');
console.log(`rss.xml 생성 완료 (${items.length}개 항목)`);
