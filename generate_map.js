// ========================================================
// 지역 선택 팝업용 한국 지도(img/korea_map.svg) 생성기
//   - 원본: Natural Earth 10m admin-0 countries, 대한민국 관점(POV) 판 (퍼블릭 도메인)
//     https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_kor.geojson
//   - 지도 범위·투영은 data.js 의 MAP_BOUNDS 를 사용 (app.js 의 핀 위치 계산과 같은 값)
// 사용법: node generate_map.js <내려받은 geojson 경로>
//   지도 범위를 바꿀 때만 다시 실행하면 됩니다. 도시 추가는 data*.js 에 map 좌표만 넣으면 됩니다.
// ========================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const src = process.argv[2];
if (!src) {
  console.error('사용법: node generate_map.js <ne_10m_admin_0_countries_kor.geojson 경로>');
  process.exit(1);
}

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8') + '\nthis.MAP_BOUNDS = MAP_BOUNDS;', ctx);
const B = ctx.MAP_BOUNDS;
const W = (B.lngMax - B.lngMin) * B.k * 100;
const H = (B.latMax - B.latMin) * 100;
const project = ([lng, lat]) => [(lng - B.lngMin) * B.k * 100, (B.latMax - lat) * 100];

// Ramer–Douglas–Peucker 단순화
function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const sqSegDist = (p, a, b) => {
    let [x, y] = a; let dx = b[0] - x, dy = b[1] - y;
    if (dx || dy) {
      const t = Math.max(0, Math.min(1, ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy)));
      x += dx * t; y += dy * t;
    }
    dx = p[0] - x; dy = p[1] - y;
    return dx * dx + dy * dy;
  };
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop();
    let max = 0, idx = -1;
    for (let i = s + 1; i < e; i++) { const d = sqSegDist(pts[i], pts[s], pts[e]); if (d > max) { max = d; idx = i; } }
    if (max > tol * tol) { keep[idx] = 1; stack.push([s, idx], [idx, e]); }
  }
  return pts.filter((_, i) => keep[i]);
}

function toPath(geometry) {
  const polys = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  return polys.map(rings => rings.map(ring => {
    let pts = ring.map(project);
    if (pts.length > 8) pts = simplify(pts, 0.6);
    return 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
  }).join('')).join('');
}

const geo = JSON.parse(fs.readFileSync(src, 'utf8'));
const pick = (code) => geo.features.find(f => (f.properties.ADM0_A3_KO || f.properties.ADM0_A3) === code);
const kor = pick('KOR'), prk = pick('PRK');
if (!kor || !prk) throw new Error('KOR/PRK 데이터를 찾지 못했습니다.');

// 독도처럼 아주 작은 섬은 단순화 후 거의 보이지 않으므로 점으로 한 번 더 표시
const dokdo = project([131.866, 37.241]);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" role="img" aria-label="Map of South Korea">
  <path d="${toPath(prk.geometry)}" fill="#eef2f7" stroke="#cbd5e1" stroke-width="1"/>
  <path d="${toPath(kor.geometry)}" fill="#ffffff" stroke="#7dd3fc" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="${dokdo[0].toFixed(1)}" cy="${dokdo[1].toFixed(1)}" r="2.6" fill="#ffffff" stroke="#7dd3fc" stroke-width="1.2"/>
</svg>
`;
fs.writeFileSync(path.join(__dirname, 'img', 'korea_map.svg'), svg, 'utf8');
console.log(`img/korea_map.svg 생성 (${W.toFixed(0)}×${H.toFixed(0)}, ${(svg.length / 1024).toFixed(1)} KB)`);
