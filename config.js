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
  adsenseClient: ''
};
