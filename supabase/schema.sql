-- ========================================================
-- 하루트립 좋아요 · 후기 · 여행자 추천 명소 DB 설정
-- Supabase 대시보드 → SQL Editor → New query 에 전체를 붙여넣고 Run 하세요.
-- 여러 번 실행해도 안전합니다. (기존 좋아요·후기 데이터는 그대로 유지됩니다)
--
-- 권한 정리
--   - 읽기(좋아요 수, 후기, 추천 명소): 누구나
--   - 좋아요 · 후기 작성 · 명소 추천 · 내 글 삭제: Google 로그인한 사용자만
--   Google 로그인 설정 방법은 supabase/AUTH_SETUP.md 를 보세요.
-- ========================================================

-- 1. 테이블 ------------------------------------------------

create table if not exists public.likes (
  dest_id    text not null,
  city       text not null,
  client_id  uuid not null,              -- 로그인 도입 전: 브라우저별 무작위 ID / 이후: 계정 ID와 같은 값 (계정당 1번)
  created_at timestamptz not null default now(),
  primary key (dest_id, client_id)
);

-- 로그인 도입: 좋아요를 누른 계정 (로그인 전 익명 좋아요는 user_id 가 비어 있고 숫자에만 합산)
alter table public.likes add column if not exists user_id uuid references auth.users (id) on delete cascade;

create table if not exists public.comments (
  id         bigint generated always as identity primary key,
  city       text not null,
  dest_id    text not null,
  author     text not null,              -- 작성자가 입력한 닉네임 (화면에 표시)
  body       text not null,
  rating     smallint not null default 5 check (rating between 1 and 5),
  client_id  uuid,                       -- 로그인 도입 전 후기에만 있음
  ip_hash    text,                       -- 도배 방지용 (원래 IP는 저장하지 않음)
  is_hidden  boolean not null default false,  -- true로 바꾸면 사이트에서 숨겨짐
  created_at timestamptz not null default now()
);

-- 로그인 도입: 후기 작성자 계정 (계정을 삭제하면 그 계정의 후기도 함께 삭제)
alter table public.comments add column if not exists user_id uuid references auth.users (id) on delete cascade;
alter table public.comments alter column client_id drop not null;

-- 여행자 추천 명소: 사이트에 아직 없는 장소를 방문자가 추천
create table if not exists public.recommendations (
  id         bigint generated always as identity primary key,
  city       text not null,
  user_id    uuid not null references auth.users (id) on delete cascade,
  author     text not null,              -- 작성자가 입력한 닉네임 (화면에 표시)
  place_name text not null,
  address    text,
  body       text not null,              -- 추천 이유
  is_hidden  boolean not null default false,  -- true로 바꾸면 사이트에서 숨겨짐
  created_at timestamptz not null default now()
);

create index if not exists comments_city_idx on public.comments (city, created_at desc);
create index if not exists comments_rate_idx on public.comments (client_id, created_at desc);
create index if not exists comments_user_idx on public.comments (user_id, created_at desc);
create index if not exists likes_city_idx on public.likes (city);
create index if not exists likes_user_idx on public.likes (user_id, created_at desc);
create index if not exists recommendations_city_idx on public.recommendations (city, created_at desc);
create index if not exists recommendations_user_idx on public.recommendations (user_id, created_at desc);

-- 2. 보안: 테이블은 직접 읽고 쓸 수 없고, 아래 함수로만 접근 ----------

alter table public.likes enable row level security;
alter table public.comments enable row level security;
alter table public.recommendations enable row level security;
revoke all on public.likes from anon, authenticated;
revoke all on public.comments from anon, authenticated;
revoke all on public.recommendations from anon, authenticated;

-- 로그인 없이 쓰던 예전 함수 제거
drop function if exists public.add_comment(text, text, uuid, text, text, int);
drop function if exists public.toggle_like(text, text, uuid);
drop function if exists public.get_city_feedback(text, uuid);

-- 3. 함수 --------------------------------------------------

-- 도시 하나의 좋아요 수, 내가 누른 좋아요, 후기 목록을 한 번에 가져오기
-- (로그인한 상태면 liked 에 내가 누른 명소, 내가 쓴 후기에 mine = true)
create or replace function public.get_city_feedback(p_city text)
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
      select json_agg(dest_id) from likes where city = p_city and auth.uid() is not null and user_id = auth.uid()
    ), '[]'::json),
    'comments', coalesce((
      select json_agg(json_build_object(
        'id', id, 'dest_id', dest_id, 'author', author, 'body', body,
        'rating', rating, 'created_at', created_at,
        'mine', (user_id is not null and user_id = auth.uid())
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

-- 좋아요 누르기 / 취소하기 (Google 로그인 필요 · 계정당 명소마다 1번)
create or replace function public.toggle_like(p_city text, p_dest text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user  uuid := auth.uid();
  v_liked boolean;
  v_count bigint;
begin
  if v_user is null then
    raise exception '로그인이 필요합니다.' using errcode = '28000';
  end if;
  if p_city !~ '^[a-z]{1,30}$' or p_dest !~ '^[a-z0-9_]{1,60}$' then
    raise exception '잘못된 요청입니다.';
  end if;

  if exists (select 1 from likes where dest_id = p_dest and user_id = v_user) then
    delete from likes where dest_id = p_dest and user_id = v_user;
    v_liked := false;
  else
    -- 한 계정이 1분에 좋아요를 30번 넘게 누르지 못하게 제한
    if (select count(*) from likes where user_id = v_user and created_at > now() - interval '1 minute') >= 30 then
      raise exception '잠시 후 다시 시도해 주세요.';
    end if;
    -- client_id 에도 계정 ID를 넣어 (dest_id, client_id) 기본키로 계정당 1번을 보장
    insert into likes (dest_id, city, client_id, user_id) values (p_dest, p_city, v_user, v_user);
    v_liked := true;
  end if;

  select count(*) into v_count from likes where dest_id = p_dest;
  return json_build_object('liked', v_liked, 'count', v_count);
end;
$$;

-- 요청 IP의 해시 (도배 방지용, 원래 IP는 저장하지 않음)
create or replace function public.request_ip_hash()
returns text
language plpgsql
stable
set search_path = public, extensions
as $$
declare
  v_ip text;
begin
  begin
    v_ip := split_part(coalesce(current_setting('request.headers', true)::json->>'x-forwarded-for', ''), ',', 1);
  exception when others then
    v_ip := '';
  end;
  if v_ip = '' then
    return null;
  end if;
  return encode(digest('haru-trip:' || v_ip, 'sha256'), 'hex');
end;
$$;

-- 후기 등록 (Google 로그인 필요 · 길이 검사 · 도배 방지)
create or replace function public.add_comment(
  p_city text, p_dest text, p_author text, p_body text, p_rating int
)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_user   uuid := auth.uid();
  v_author text := btrim(coalesce(p_author, ''));
  v_body   text := btrim(coalesce(p_body, ''));
  v_ip_hash text := request_ip_hash();
  v_row    comments;
begin
  if v_user is null then
    raise exception '로그인이 필요합니다.' using errcode = '28000';
  end if;
  if p_city !~ '^[a-z]{1,30}$' or p_dest !~ '^[a-z0-9_]{1,60}$' then
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

  -- 같은 계정에서 10분에 5개까지
  if (select count(*) from comments
      where user_id = v_user and created_at > now() - interval '10 minutes') >= 5 then
    raise exception '후기를 너무 자주 등록했습니다. 잠시 후 다시 시도해 주세요.';
  end if;

  insert into comments (city, dest_id, author, body, rating, user_id, ip_hash)
  values (p_city, p_dest, v_author, v_body, p_rating, v_user, v_ip_hash)
  returning * into v_row;

  return json_build_object(
    'id', v_row.id, 'dest_id', v_row.dest_id, 'author', v_row.author,
    'body', v_row.body, 'rating', v_row.rating, 'created_at', v_row.created_at,
    'mine', true
  );
end;
$$;

-- 내가 쓴 후기 삭제
create or replace function public.delete_my_comment(p_id bigint)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception '로그인이 필요합니다.' using errcode = '28000';
  end if;
  delete from comments where id = p_id and user_id = auth.uid();
  return found;
end;
$$;

-- 도시 하나의 여행자 추천 명소 목록 (로그인한 상태면 내가 쓴 추천에 mine = true)
create or replace function public.get_city_recommendations(p_city text)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((
    select json_agg(json_build_object(
      'id', id, 'author', author, 'place_name', place_name, 'address', address,
      'body', body, 'created_at', created_at,
      'mine', (user_id = auth.uid())
    ) order by created_at desc)
    from (
      select * from recommendations
      where city = p_city and not is_hidden
      order by created_at desc
      limit 200
    ) r
  ), '[]'::json);
$$;

-- 명소 추천 등록 (Google 로그인 필요 · 길이 검사 · 도배 방지)
create or replace function public.add_recommendation(
  p_city text, p_author text, p_place text, p_address text, p_body text
)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_user    uuid := auth.uid();
  v_author  text := btrim(coalesce(p_author, ''));
  v_place   text := btrim(coalesce(p_place, ''));
  v_address text := nullif(btrim(coalesce(p_address, '')), '');
  v_body    text := btrim(coalesce(p_body, ''));
  v_row     recommendations;
begin
  if v_user is null then
    raise exception '로그인이 필요합니다.' using errcode = '28000';
  end if;
  if p_city !~ '^[a-z]{1,30}$' then
    raise exception '잘못된 요청입니다.';
  end if;
  if char_length(v_author) not between 1 and 20 then
    raise exception '닉네임은 1~20자로 입력해 주세요.';
  end if;
  if char_length(v_place) not between 2 and 50 then
    raise exception '장소 이름은 2~50자로 입력해 주세요.';
  end if;
  if v_address is not null and char_length(v_address) > 100 then
    raise exception '주소는 100자 이내로 입력해 주세요.';
  end if;
  if char_length(v_body) not between 10 and 500 then
    raise exception '추천 이유는 10~500자로 입력해 주세요.';
  end if;
  if (v_place || ' ' || coalesce(v_address, '') || ' ' || v_body) ~* '(https?://|www\.)' then
    raise exception '추천 내용에는 링크를 넣을 수 없습니다.';
  end if;

  -- 같은 계정에서 1시간에 5개까지, 같은 장소 중복 추천 금지
  if (select count(*) from recommendations
      where user_id = v_user and created_at > now() - interval '1 hour') >= 5 then
    raise exception '추천을 너무 자주 등록했습니다. 잠시 후 다시 시도해 주세요.';
  end if;
  if exists (select 1 from recommendations
             where user_id = v_user and city = p_city and lower(place_name) = lower(v_place)) then
    raise exception '이미 추천한 장소입니다.';
  end if;

  insert into recommendations (city, user_id, author, place_name, address, body)
  values (p_city, v_user, v_author, v_place, v_address, v_body)
  returning * into v_row;

  return json_build_object(
    'id', v_row.id, 'author', v_row.author, 'place_name', v_row.place_name,
    'address', v_row.address, 'body', v_row.body, 'created_at', v_row.created_at,
    'mine', true
  );
end;
$$;

-- 내가 쓴 추천 삭제
create or replace function public.delete_my_recommendation(p_id bigint)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception '로그인이 필요합니다.' using errcode = '28000';
  end if;
  delete from recommendations where id = p_id and user_id = auth.uid();
  return found;
end;
$$;

-- 4. 실행 권한 ----------------------------------------------

revoke all on function public.get_city_feedback(text) from public;
revoke all on function public.toggle_like(text, text) from public;
revoke all on function public.request_ip_hash() from public, anon, authenticated;
revoke all on function public.add_comment(text, text, text, text, int) from public;
revoke all on function public.delete_my_comment(bigint) from public;
revoke all on function public.get_city_recommendations(text) from public;
revoke all on function public.add_recommendation(text, text, text, text, text) from public;
revoke all on function public.delete_my_recommendation(bigint) from public;

-- 읽기: 누구나
grant execute on function public.get_city_feedback(text) to anon, authenticated;
grant execute on function public.get_city_recommendations(text) to anon, authenticated;

-- 좋아요 · 쓰기 · 삭제: 로그인한 사용자만
grant execute on function public.toggle_like(text, text) to authenticated;
grant execute on function public.add_comment(text, text, text, text, int) to authenticated;
grant execute on function public.delete_my_comment(bigint) to authenticated;
grant execute on function public.add_recommendation(text, text, text, text, text) to authenticated;
grant execute on function public.delete_my_recommendation(bigint) to authenticated;
