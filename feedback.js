// ========================================================
// 하루트립 좋아요 · 후기 · 여행자 추천 저장소 + Google 로그인
//   config.js에 Supabase 정보가 있으면 서버에 저장합니다.
//     - 읽기: 누구나
//     - 좋아요 · 후기 · 명소 추천 · 내 글 삭제: Google 로그인 필요
//   Supabase 정보가 없으면(개발용) 이 브라우저(localStorage)에만 저장하고 로그인은 쓰지 않습니다.
//   Google 로그인 설정: supabase/AUTH_SETUP.md
// ========================================================

const Feedback = (() => {
  const cfg = window.HARU_CONFIG || {};
  const baseUrl = (cfg.supabaseUrl || '').replace(/\/+$/, '');
  const anonKey = cfg.supabaseAnonKey || '';
  const client = (baseUrl && anonKey && window.supabase && window.supabase.createClient)
    ? window.supabase.createClient(baseUrl, anonKey, {
        auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null;
  const isRemote = Boolean(client);

  // ---- 로그인 상태
  let user = null;
  const listeners = new Set();

  // Google 로그인에서 돌아왔을 때 주소에 붙은 오류 (예: Client Secret 이 틀리면 "Unable to exchange external code")
  const urlAuthError = (() => {
    const q = new URLSearchParams(window.location.search);
    const h = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    return q.get('error_description') || h.get('error_description') || q.get('error') || h.get('error') || '';
  })();

  const ready = client
    ? client.auth.initialize()
        .then(({ error }) => {
          // ?code= 를 세션으로 바꾸는 단계에서 실패한 경우
          if (error) console.warn('[로그인] 세션 교환 실패:', error.message || error);
          return client.auth.getSession().then(({ data }) => {
            user = data && data.session ? data.session.user : null;
            const reason = urlAuthError || (error && (error.message || String(error)));
            if (reason && !user) {
              console.warn('[로그인] 실패:', reason);
              setTimeout(() => alert(`${t('errLoginFailed')}\n\n(${reason})`), 0);
            }
          });
        })
        .catch((e) => { user = null; console.warn('[로그인] 초기화 오류:', e && e.message); })
        .finally(cleanAuthParams)
    : Promise.resolve();

  if (client) {
    client.auth.onAuthStateChange((_event, session) => {
      const next = session ? session.user : null;
      const changed = (next && next.id) !== (user && user.id);
      user = next;
      // 콜백 안에서 바로 Supabase를 다시 부르지 않도록 다음 틱에 알림
      if (changed) setTimeout(() => listeners.forEach(cb => cb(user)), 0);
    });
  }

  // 로그인 후 돌아온 주소에 붙은 ?code= 등을 지움 (?city= 는 유지)
  function cleanAuthParams() {
    const url = new URL(window.location.href);
    let dirty = false;
    ['code', 'error', 'error_code', 'error_description'].forEach(k => {
      if (url.searchParams.has(k)) { url.searchParams.delete(k); dirty = true; }
    });
    // 해시(#error=...)로 돌아온 오류도 정리
    if (/(^#|&)(error|error_description|access_token)=/.test(url.hash)) { url.hash = ''; dirty = true; }
    if (dirty && window.history.replaceState) {
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    }
  }

  function displayName(u) {
    if (!u) return '';
    const m = u.user_metadata || {};
    return m.full_name || m.name || u.email || '';
  }

  // ---- 서버 함수 호출
  async function rpc(name, params) {
    const { data, error } = await client.rpc(name, params);
    if (error) {
      // PGRST202: DB 함수가 아직 없음 (supabase/schema.sql 미실행)
      if (error.code === 'PGRST202') throw new Error(t('errServerNotReady'));
      if (error.code === '28000') throw new Error(t('errLoginRequired'));
      // 직접 만든 검증 오류(raise exception)는 한국어 메시지라 한국어 페이지에서만 그대로 보여주기
      const dbMsg = window.HARU_LANG === 'ko' && error.code === 'P0001' && error.message;
      throw new Error(dbMsg || t('errRequest'));
    }
    return data;
  }

  function toComment(row) {
    return {
      id: row.id,
      author: row.author,
      rating: row.rating,
      text: row.body,
      date: String(row.created_at || '').slice(0, 10),
      mine: Boolean(row.mine)
    };
  }

  function toRecommendation(row) {
    return {
      id: row.id,
      author: row.author,
      place: row.place_name,
      address: row.address || '',
      text: row.body,
      date: String(row.created_at || '').slice(0, 10),
      mine: Boolean(row.mine)
    };
  }

  return {
    isRemote,
    ready,

    // ---- 로그인
    get user() { return user; },
    get userName() { return displayName(user); },
    onAuthChange(cb) { listeners.add(cb); },
    async signIn(redirectTo) {
      const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo }
      });
      if (error) throw new Error(t('errLoginFailed'));
    },
    async signOut() {
      await client.auth.signOut();
    },

    // ---- 좋아요 · 후기
    // 도시 하나의 좋아요/후기 전체 불러오기
    async loadCity(cityId) {
      await ready;
      const data = await rpc('get_city_feedback', { p_city: cityId });
      const comments = {};
      (data.comments || []).forEach(row => {
        (comments[row.dest_id] = comments[row.dest_id] || []).push(toComment(row));
      });
      return {
        likes: data.likes || {},
        liked: new Set(data.liked || []),
        comments
      };
    },

    async toggleLike(cityId, destId) {
      return rpc('toggle_like', { p_city: cityId, p_dest: destId });
    },

    async addComment(cityId, destId, { author, text, rating }) {
      const row = await rpc('add_comment', {
        p_city: cityId, p_dest: destId, p_author: author, p_body: text, p_rating: rating
      });
      return toComment(row);
    },

    async deleteComment(id) {
      return rpc('delete_my_comment', { p_id: id });
    },

    // ---- 여행자 추천 명소
    async loadRecommendations(cityId) {
      await ready;
      const rows = await rpc('get_city_recommendations', { p_city: cityId });
      return (rows || []).map(toRecommendation);
    },

    async addRecommendation(cityId, { author, place, address, text }) {
      const row = await rpc('add_recommendation', {
        p_city: cityId, p_author: author, p_place: place, p_address: address, p_body: text
      });
      return toRecommendation(row);
    },

    async deleteRecommendation(id) {
      return rpc('delete_my_recommendation', { p_id: id });
    }
  };
})();
