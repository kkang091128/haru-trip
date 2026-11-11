-- ========================================================
-- 하루트립 좋아요 & 댓글 DB 설정
-- Supabase 대시보드 → SQL Editor → New query 에 전체를 붙여넣고 Run 하세요.
-- 여러 번 실행해도 안전합니다.
-- ========================================================

-- 1. 테이블 ------------------------------------------------

create table if not exists public.likes (
  dest_id    text not null,
  city       text not null,
  client_id  uuid not null,              -- 방문자 브라우저마다 만들어지는 무작위 ID
  created_at timestamptz not null default now(),
  primary key (dest_id, client_id)
);

create table if not exists public.comments (
  id         bigint generated always as identity primary key,
  city       text not null,
  dest_id    text not null,
  author     text not null,
  body       text not null,
  rating     smallint not null default 5 check (rating between 1 and 5),
  client_id  uuid not null,
  ip_hash    text,                       -- 도배 방지용 (원래 IP는 저장하지 않음)
  is_hidden  boolean not null default false,  -- true로 바꾸면 사이트에서 숨겨짐
  created_at timestamptz not null default now()
);

create index if not exists comments_city_idx on public.comments (city, created_at desc);
create index if not exists comments_rate_idx on public.comments (client_id, created_at desc);
create index if not exists likes_city_idx on public.likes (city);

-- 2. 보안: 테이블은 직접 읽고 쓸 수 없고, 아래 함수로만 접근 ----------

alter table public.likes enable row level security;
alter table public.comments enable row level security;
revoke all on public.likes from anon, authenticated;
revoke all on public.comments from anon, authenticated;

-- 3. 함수 --------------------------------------------------

-- 도시 하나의 좋아요 수, 내가 누른 좋아요, 댓글 목록을 한 번에 가져오기
create or replace function public.get_city_feedback(p_city text, p_client uuid)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'likes', coalesce((
      select json_object_agg(dest_id, cnt)
      from (select dest_id, count(*) as cnt from likes where city = p_city group by dest_id) t
    ), '{}'::json),
    'liked', coalesce((
      select json_agg(dest_id) from likes where city = p_city and client_id = p_client
    ), '[]'::json),
    'comments', coalesce((
      select json_agg(json_build_object(
        'id', id, 'dest_id', dest_id, 'author', author, 'body', body,
        'rating', rating, 'created_at', created_at
      ) order by created_at desc)
      from (
        select * from comments
        where city = p_city and not is_hidden
        order by created_at desc
        limit 500
      ) c
    ), '[]'::json)
  );
$$;

-- 좋아요 누르기 / 취소하기
create or replace function public.toggle_like(p_city text, p_dest text, p_client uuid)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_liked boolean;
  v_count bigint;
begin
  if p_city !~ '^[a-z]{1,30}$' or p_dest !~ '^[a-z0-9_]{1,60}$' or p_client is null then
    raise exception '잘못된 요청입니다.';
  end if;

  if exists (select 1 from likes where dest_id = p_dest and client_id = p_client) then
    delete from likes where dest_id = p_dest and client_id = p_client;
    v_liked := false;
  else
    -- 한 브라우저가 1분에 좋아요를 30번 넘게 누르지 못하게 제한
    if (select count(*) from likes where client_id = p_client and created_at > now() - interval '1 minute') >= 30 then
      raise exception '잠시 후 다시 시도해 주세요.';
    end if;
    insert into likes (dest_id, city, client_id) values (p_dest, p_city, p_client);
    v_liked := true;
  end if;

  select count(*) into v_count from likes where dest_id = p_dest;
  return json_build_object('liked', v_liked, 'count', v_count);
end;
$$;

-- 댓글 등록 (길이 검사 + 도배 방지)
create or replace function public.add_comment(
  p_city text, p_dest text, p_client uuid,
  p_author text, p_body text, p_rating int
)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_author text := btrim(coalesce(p_author, ''));
  v_body   text := btrim(coalesce(p_body, ''));
  v_ip     text;
  v_ip_hash text;
  v_row    comments;
begin
  if p_city !~ '^[a-z]{1,30}$' or p_dest !~ '^[a-z0-9_]{1,60}$' or p_client is null then
    raise exception '잘못된 요청입니다.';
  end if;
  if char_length(v_author) not between 1 and 20 then
    raise exception '닉네임은 1~20자로 입력해 주세요.';
  end if;
  if char_length(v_body) not between 2 and 500 then
    raise exception '후기는 2~500자로 입력해 주세요.';
  end if;
  if p_rating is null or p_rating not between 1 and 5 then
    raise exception '별점을 확인해 주세요.';
  end if;
  if v_body ~* '(https?://|www\.)' then
    raise exception '후기에는 링크를 넣을 수 없습니다.';
  end if;

  -- 요청 IP를 해시로만 보관 (도배 방지용)
  begin
    v_ip := split_part(coalesce(current_setting('request.headers', true)::json->>'x-forwarded-for', ''), ',', 1);
  exception when others then
    v_ip := '';
  end;
  if v_ip <> '' then
    v_ip_hash := encode(digest('haru-trip:' || v_ip, 'sha256'), 'hex');
  end if;

  -- 같은 브라우저 또는 같은 IP에서 10분에 5개까지
  if (select count(*) from comments
      where created_at > now() - interval '10 minutes'
        and (client_id = p_client or (v_ip_hash is not null and ip_hash = v_ip_hash))) >= 5 then
    raise exception '댓글을 너무 자주 등록했습니다. 잠시 후 다시 시도해 주세요.';
  end if;

  insert into comments (city, dest_id, author, body, rating, client_id, ip_hash)
  values (p_city, p_dest, v_author, v_body, p_rating, p_client, v_ip_hash)
  returning * into v_row;

  return json_build_object(
    'id', v_row.id, 'dest_id', v_row.dest_id, 'author', v_row.author,
    'body', v_row.body, 'rating', v_row.rating, 'created_at', v_row.created_at
  );
end;
$$;

revoke all on function public.get_city_feedback(text, uuid) from public;
revoke all on function public.toggle_like(text, text, uuid) from public;
revoke all on function public.add_comment(text, text, uuid, text, text, int) from public;
grant execute on function public.get_city_feedback(text, uuid) to anon, authenticated;
grant execute on function public.toggle_like(text, text, uuid) to anon, authenticated;
grant execute on function public.add_comment(text, text, uuid, text, text, int) to anon, authenticated;
