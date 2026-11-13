# Google 로그인 설정 방법

좋아요 · 후기 · 여행자 추천 명소는 Google 로그인한 사용자만 쓸 수 있습니다.
아래 순서대로 한 번만 설정하면 됩니다. (약 15분)

> ⚠️ **순서가 중요합니다.** 새 사이트 코드는 새 DB 함수를 부릅니다.
> **1번(SQL 실행)을 먼저 하고 사이트를 배포**하세요. 반대로 하면 그 사이에는 좋아요·후기가 보이지 않습니다.

---

## 1. DB 함수 업데이트 (Supabase)

1. Supabase 대시보드 → 프로젝트 → **SQL Editor** → **New query**
   - `schema.sql`이 바뀔 때마다(예: 추천 사진 기능 추가) 다시 실행하세요. 여러 번 실행해도 안전합니다.
2. `supabase/schema.sql` 내용을 전부 붙여넣고 **Run**
3. 기존 좋아요 수와 후기는 그대로 남습니다. 예전 익명 좋아요는 숫자에만 합산됩니다.

## 2. Google Cloud에서 OAuth 클라이언트 만들기

1. <https://console.cloud.google.com/> → 프로젝트 선택(없으면 새로 만들기)
2. **API 및 서비스 → OAuth 동의 화면**
   - 사용자 유형: **외부**
   - 앱 이름: `하루트립`, 지원 이메일, 개발자 연락처 이메일 입력
   - 승인된 도메인 (`https://`·`/` 없이 도메인만): `haru-trip-h0v.pages.dev`, `mxcypepmobffgbspomrs.supabase.co`
     - "누락된 도메인" 경고가 보이면 **+ 도메인 추가**로 위 두 개를 넣고 저장
   - 앱 홈페이지: `https://haru-trip-h0v.pages.dev/`
   - 개인정보처리방침: `https://haru-trip-h0v.pages.dev/privacy.html`
   - 서비스 약관: `https://haru-trip-h0v.pages.dev/terms.html`
   - 범위(Scopes): 기본값(`email`, `profile`, `openid`)만 사용
   - 다 입력했으면 **게시 상태를 "프로덕션"으로 전환** (테스트 상태면 등록한 테스트 사용자만 로그인됨)
3. **API 및 서비스 → 사용자 인증 정보 → 사용자 인증 정보 만들기 → OAuth 클라이언트 ID**
   - 애플리케이션 유형: **웹 애플리케이션**
   - 승인된 JavaScript 원본: `https://haru-trip-h0v.pages.dev`
   - 승인된 리디렉션 URI: `https://mxcypepmobffgbspomrs.supabase.co/auth/v1/callback`
4. 만들어진 **클라이언트 ID**와 **클라이언트 보안 비밀번호**를 복사

## 3. Supabase에서 Google 로그인 켜기

1. Supabase 대시보드 → **Authentication → Sign In / Providers → Google**
2. **Enable** 켜고, 2-4에서 복사한 Client ID / Client Secret 붙여넣기 → **Save**
3. **Authentication → URL Configuration**
   - **Site URL**: `https://haru-trip-h0v.pages.dev`
   - **Redirect URLs**에 추가:
     - `https://haru-trip-h0v.pages.dev/**`
     - (내 컴퓨터에서 테스트할 때만) `http://localhost:8765/**`

## 4. 확인

1. 사이트에서 도시를 고르고 명소의 **상세보기 & 댓글** 또는 **여행자 추천 명소**의 **Google로 로그인** 클릭
2. Google 계정 선택 → 같은 도시 화면으로 돌아오고, 로그인 직전에 하던 곳(상세 창 / 추천 폼)이 다시 열리면 성공
3. 후기·추천을 하나 써 보고 **삭제** 버튼으로 지워지는지 확인

---

## 운영 메모

- **글 숨기기**: Supabase → Table Editor → `comments` 또는 `recommendations` → 해당 행의 `is_hidden`을 `true`로
  - 숨긴 추천의 사진은 주소를 아는 사람에게는 계속 보입니다. 문제 있는 사진이면 아래처럼 사진 파일도 지우세요.
- **사진 지우기**: Supabase → Storage → `rec-images` 버킷 → 사용자 폴더(계정 ID) → 파일 삭제
  - 추천의 `image_paths` 칸에 그 추천의 사진 경로가 적혀 있습니다.
- **회원 탈퇴 요청 처리**
  1. Authentication → Users에서 요청한 이메일의 **User UID**를 확인
  2. Storage → `rec-images` → 그 UID 이름의 폴더를 통째로 삭제 (사진은 자동으로 지워지지 않음)
  3. Authentication → Users에서 그 사용자 삭제 → 후기·추천·좋아요가 함께 삭제됩니다.
- 로그인한 사용자의 이메일·이름은 Supabase Authentication에만 저장되고 사이트 화면에는 표시되지 않습니다.
  화면에는 작성할 때 입력한 닉네임만 나옵니다.
