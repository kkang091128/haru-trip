// ========================================================
// 하루트립 좋아요 & 댓글 저장소
// config.js에 Supabase 정보가 있으면 서버에 저장하고,
// 없으면 이 브라우저(localStorage)에만 저장합니다.
// ========================================================

const Feedback = (() => {
  const cfg = window.HARU_CONFIG || {};
  const baseUrl = (cfg.supabaseUrl || '').replace(/\/+$/, '');
  const anonKey = cfg.supabaseAnonKey || '';
  const isRemote = Boolean(baseUrl && anonKey);

  // 방문자 브라우저를 구분하는 무작위 ID (개인을 식별하지 않음)
  function getClientId() {
    const key = 'haru_trip_client_id';
    let id = null;
    try { id = localStorage.getItem(key); } catch (e) { /* 저장소 차단 */ }
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
      id = (window.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
          });
      try { localStorage.setItem(key, id); } catch (e) { /* 무시 */ }
    }
    return id;
  }

  async function rpc(name, params) {
    const headers = { 'Content-Type': 'application/json', apikey: anonKey };
    // 예전 형식(JWT) anon 키만 Authorization 헤더에도 넣음. 새 sb_publishable_ 키는 apikey 헤더만 사용
    if (anonKey.startsWith('eyJ')) headers.Authorization = `Bearer ${anonKey}`;
    const res = await fetch(`${baseUrl}/rest/v1/rpc/${name}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(params)
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      // PGRST202: DB 함수가 아직 없음 (supabase/schema.sql 미실행)
      if (data && data.code === 'PGRST202') {
        throw new Error('후기 서버 설정이 아직 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.');
      }
      // 직접 만든 검증 오류(raise exception)는 한국어 메시지 그대로 보여주기
      const msg = (data && data.code === 'P0001' && data.message) || '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.';
      throw new Error(msg);
    }
    return data;
  }

  function toComment(row) {
    return {
      id: row.id,
      author: row.author,
      rating: row.rating,
      text: row.body,
      date: String(row.created_at || '').slice(0, 10)
    };
  }

  return {
    isRemote,

    // 도시 하나의 좋아요/댓글 전체 불러오기
    async loadCity(cityId) {
      const data = await rpc('get_city_feedback', { p_city: cityId, p_client: getClientId() });
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
      return rpc('toggle_like', { p_city: cityId, p_dest: destId, p_client: getClientId() });
    },

    async addComment(cityId, destId, { author, text, rating }) {
      const row = await rpc('add_comment', {
        p_city: cityId, p_dest: destId, p_client: getClientId(),
        p_author: author, p_body: text, p_rating: rating
      });
      return toComment(row);
    }
  };
})();
