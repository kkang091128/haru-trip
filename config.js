// ========================================================
// 하루트립 사이트 설정
// ========================================================
window.HARU_CONFIG = {
  // Supabase 대시보드 → Project Settings → API 에서 복사해 넣으세요.
  // 비워두면 좋아요·댓글이 방문자 브라우저에만 저장됩니다.
  // anon(public) 키는 공개되어도 괜찮은 키입니다. service_role 키는 절대 넣지 마세요.
  supabaseUrl: 'https://mxcypepmobffgbspomrs.supabase.co',
  supabaseAnonKey: 'sb_publishable_KNgAB7TMaMIFJLlj6JoONQ_8KYQUGAp',

  // 애드센스 게시자 ID (예: 'ca-pub-1234567890123456')
  // 넣은 뒤 `node generate_pages.js` 를 실행하면 모든 페이지에 광고 코드와 ads.txt가 들어갑니다.
  adsenseClient: 'ca-pub-3131801357796338',

  // 구글 태그 관리자(GTM) 컨테이너 ID (예: 'GTM-XXXXXXX')
  // 넣은 뒤 `node generate_pages.js` 를 실행하면 모든 페이지에 GTM 코드가 들어갑니다.
  gtmId: 'GTM-WQ7X25ZP',

  // 구글 애널리틱스(GA4) 측정 ID (예: 'G-XXXXXXXXXX')
  // ※ GTM 안에 같은 ID의 Google 태그를 또 만들면 방문이 두 번 집계됩니다. 둘 중 하나만 쓰세요.
  gaId: 'G-GK8GL79F0F'
};
