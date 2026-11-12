// ========================================================
// 하루트립 (HARU TRIP) - [전주편] 코스 & 명소 데이터
// data.js 다음에 로드되어 CITIES_DATA에 등록됩니다.
// ========================================================

const COURSES_JEONJU = [
  {
    id: 'A',
    badge: '코스 A',
    title: '한옥마을 & 조선왕조 역사 코스',
    subtitle: '태조 어진을 모신 경기전, 붉은 벽돌 전동성당, 한옥 지붕이 내려다보이는 오목대',
    highlight: '700여 채 한옥 지붕이 물결치는 풍경 속 조선의 시간',
    duration: '약 4~5시간',
    distance: '약 2.5 km',
    color: '#3B82F6',
    icon: '🏯',
    destinations: ['gyeonggijeon', 'jeondong_cathedral', 'omokdae_jaman']
  },
  {
    id: 'B',
    badge: '코스 B',
    title: '은행나무 향교 & 맛의 도시 미식 코스',
    subtitle: '400년 은행나무 향교, 남부시장 청년몰, 객리단길 카페 골목',
    highlight: '유네스코 음식창의도시 전주에서 즐기는 한 끼의 행복',
    duration: '약 5~6시간',
    distance: '약 3.5 km',
    color: '#06B6D4',
    icon: '🍚',
    destinations: ['jeonju_hyanggyo', 'pungnammun_nambu_market', 'gaeksa_street']
  },
  {
    id: 'C',
    badge: '코스 C',
    title: '연꽃 공원 & 한옥마을 골목 야경 코스',
    subtitle: '덕진공원 연꽃 호수, 한옥마을 골목 산책, 전주천 위 한옥 누각 다리의 밤',
    highlight: '은은한 조명이 켜진 한옥 지붕과 전주천의 밤 풍경',
    duration: '약 5~6시간',
    distance: '약 6.0 km',
    color: '#F59E0B',
    icon: '🌙',
    destinations: ['deokjin_park', 'hanok_village_lanes', 'namcheongyo_cheongyeonru']
  }
];

const DESTINATIONS_JEONJU = [
  // --- Course A ---
  {
    id: 'gyeonggijeon',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '경기전',
    engName: 'Gyeonggijeon Shrine',
    theme: '역사 유적 / 왕조 문화',
    tags: ['#태조어진', '#조선왕조실록', '#대나무숲', '#한복나들이'],
    images: [
      'img/gyeonggijeon_1.jpg',
      'img/gyeonggijeon_2.jpg',
      'img/gyeonggijeon_3.jpg'
    ],
    imageCaptions: [
      '태조 이성계의 어진을 모신 경기전 정전',
      '홍살문 너머로 이어지는 경기전 경내 길',
      '울창한 나무가 둘러싼 경기전 정원'
    ],
    shortDesc: '조선을 세운 태조 이성계의 어진(초상화)을 모신 곳으로, 전주한옥마을 한가운데에서 조선 왕조의 역사를 만날 수 있는 사적지입니다.',
    fullDesc: '경기전은 1410년 태조 이성계의 어진을 모시기 위해 세운 건물로, 전주가 조선 왕실의 본향(전주 이씨의 고향)이라는 의미를 담고 있습니다. 경내의 어진박물관에서는 국보로 지정된 태조 어진을 볼 수 있으며, 조선왕조실록을 보관했던 전주사고도 복원되어 있습니다. 울창한 나무와 대나무 숲길이 아름다워 한복을 입고 사진을 찍는 여행자들이 많이 찾습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '전북특별자치도 전주시 완산구 태조로 44',
    tip: '한복을 입으면 입장료 혜택이 있는 경우가 많습니다. 정전 뒤편 대나무 숲길은 오전에 방문하면 한적하게 사진을 찍을 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'jeondong_cathedral',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '전동성당',
    engName: 'Jeondong Catholic Cathedral',
    theme: '근대 건축 / 종교 문화',
    tags: ['#로마네스크', '#붉은벽돌성당', '#근대건축', '#포토스팟'],
    images: [
      'img/jeondong_cathedral_1.jpg',
      'img/jeondong_cathedral_2.jpg',
      'img/jeondong_cathedral_3.jpg'
    ],
    imageCaptions: [
      '붉은 벽돌과 회색 돌이 어우러진 전동성당 정면',
      '비잔틴 양식의 둥근 종탑이 돋보이는 외관',
      '고목 사이로 보이는 성당의 모습'
    ],
    shortDesc: '한국 천주교 최초의 순교터 위에 세워진 로마네스크 양식의 성당으로, 호남 지역에서 가장 오래된 서양식 근대 건축물 중 하나입니다.',
    fullDesc: '전동성당은 조선 후기 천주교 박해 때 신자들이 순교한 자리에 세워진 성당으로, 1908년에 공사를 시작해 1914년에 완공되었습니다. 붉은 벽돌과 회색 화강암이 조화를 이루는 로마네스크 양식에 비잔틴 양식의 둥근 종탑이 더해져 우아한 외관을 자랑하며, 국가 사적으로 지정되어 있습니다. 경기전 바로 맞은편에 있어 한옥마을 산책과 함께 둘러보기 좋습니다.',
    timeRecommended: '소요시간: 약 30분',
    address: '전북특별자치도 전주시 완산구 태조로 51',
    tip: '미사 시간에는 내부 관람이 제한되니 조용히 관람해 주세요. 경기전 쪽 길 건너편에서 성당 전체가 한 화면에 담깁니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'omokdae_jaman',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '오목대 & 자만벽화마을',
    engName: 'Omokdae Pavilion & Jaman Mural Village',
    theme: '전망 명소 / 벽화 골목',
    tags: ['#한옥마을전경', '#벽화마을', '#골목산책', '#전망대'],
    images: [
      'img/omokdae_jaman_1.jpg',
      'img/omokdae_jaman_2.jpg',
      'img/omokdae_jaman_3.jpg'
    ],
    imageCaptions: [
      '언덕 위에 자리한 누각 오목대',
      '오목대에서 내려다본 한옥마을 기와지붕',
      '봄꽃이 핀 오목대 주변 풍경'
    ],
    shortDesc: '태조 이성계가 승전 잔치를 열었던 언덕 위 누각 오목대와, 육교 건너편 언덕에 자리한 알록달록한 자만벽화마을을 함께 둘러보는 코스입니다.',
    fullDesc: '오목대는 고려 말 이성계가 황산대첩에서 승리하고 돌아오는 길에 잔치를 열었던 곳으로 전해집니다. 언덕길을 조금만 오르면 전주한옥마을의 기와지붕이 물결처럼 펼쳐지는 풍경을 한눈에 볼 수 있습니다. 오목대에서 육교를 건너면 자만벽화마을이 이어지는데, 언덕 위 작은 골목마다 동화와 캐릭터를 그린 벽화와 아기자기한 카페가 있어 산책하기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '전북특별자치도 전주시 완산구 기린대로 55 (오목대)',
    tip: '해 질 무렵 오목대에 오르면 노을빛에 물든 한옥 지붕을 감상할 수 있습니다. 벽화마을은 실제 주민이 사는 곳이니 조용히 둘러봐 주세요.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course B ---
  {
    id: 'jeonju_hyanggyo',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '전주향교',
    engName: 'Jeonju Hyanggyo Confucian School',
    theme: '전통 교육 / 은행나무 명소',
    tags: ['#은행나무', '#가을명소', '#드라마촬영지', '#조선교육기관'],
    images: [
      'img/jeonju_hyanggyo_1.jpg',
      'img/jeonju_hyanggyo_2.jpg',
      'img/jeonju_hyanggyo_3.jpg'
    ],
    imageCaptions: [
      '고목이 늘어선 향교 마당과 대성전',
      '단청이 단정한 향교 건물',
      '나무 그늘 아래 이어진 향교 길'
    ],
    shortDesc: '조선 시대 지방 교육기관인 향교로, 수백 년 된 거대한 은행나무가 가을이면 마당을 노랗게 물들이는 전주의 숨은 명소입니다.',
    fullDesc: '전주향교는 공자를 비롯한 성현들에게 제사를 지내고 지역 인재를 가르치던 조선 시대 교육기관입니다. 대성전과 명륜당 등 옛 건물이 잘 남아 있으며, 마당에 선 수령 수백 년의 은행나무들이 특히 유명합니다. 은행나무는 벌레를 타지 않아 유생들도 해충 같은 사람이 되지 말라는 뜻으로 향교에 많이 심었다고 전해집니다. 고즈넉한 분위기 덕분에 여러 사극 드라마의 촬영지로도 쓰였습니다.',
    timeRecommended: '소요시간: 약 40분',
    address: '전북특별자치도 전주시 완산구 향교길 139',
    tip: '은행잎이 절정인 10월 말~11월 초가 가장 아름답습니다. 한옥마을 동쪽 끝에 있어 한적한 편입니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'pungnammun_nambu_market',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '풍남문 & 남부시장 청년몰',
    engName: 'Pungnammun Gate & Nambu Market',
    theme: '전통시장 / 야시장 / 로컬 미식',
    tags: ['#콩나물국밥', '#청년몰', '#야시장', '#전주비빔밥'],
    images: [
      'img/pungnammun_nambu_market_1.jpg',
      'img/pungnammun_nambu_market_2.jpg',
      'img/pungnammun_nambu_market_3.jpg'
    ],
    imageCaptions: [
      '옛 전주성의 남쪽 문 풍남문',
      '해 질 녘 조명이 켜진 풍남문',
      '전주천 건너편에서 바라본 남부시장'
    ],
    shortDesc: '옛 전주성의 남문인 풍남문과, 콩나물국밥 골목과 청년몰, 주말 야시장으로 유명한 남부시장이 이어지는 전주 미식 여행의 중심지입니다.',
    fullDesc: '풍남문은 조선 시대 전주부성의 4대문 가운데 유일하게 남아 있는 성문으로, 보물로 지정되어 있습니다. 바로 옆 남부시장은 전주를 대표하는 전통시장으로, 시장식 콩나물국밥과 피순대 같은 전주 별미를 맛볼 수 있습니다. 시장 2층에는 청년 상인들이 운영하는 작은 가게와 카페가 모인 청년몰이 있고, 주말 저녁에는 다양한 길거리 음식을 파는 야시장이 열려 활기가 넘칩니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전북특별자치도 전주시 완산구 풍남문1길 19-3 (남부시장)',
    tip: '야시장은 주로 금·토요일 저녁에 열리니 일정에 맞춰 방문해 보세요. 아침에는 시장식 콩나물국밥으로 하루를 시작하는 것을 추천합니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'gaeksa_street',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '전주객사 & 객리단길',
    engName: 'Jeonju Gaeksa & Gaekridan-gil',
    theme: '역사 유적 / 카페 골목',
    tags: ['#풍패지관', '#객리단길', '#카페투어', '#감성골목'],
    images: [
      'img/gaeksa_street_1.jpg',
      'img/gaeksa_street_2.jpg',
      'img/gaeksa_street_3.jpg'
    ],
    imageCaptions: [
      '"풍패지관" 현판이 걸린 전주객사',
      '상점이 모인 객사 주변 거리',
      '웅장한 팔작지붕이 돋보이는 객사 건물'
    ],
    shortDesc: '조선 시대 관리들이 머물던 객사 건물과, 그 주변 골목에 감성 카페와 맛집이 모여 생긴 객리단길을 함께 즐기는 코스입니다.',
    fullDesc: '전주객사는 조선 시대 왕을 상징하는 위패를 모시고 중앙에서 내려온 관리들이 머물던 곳으로, 보물로 지정되어 있습니다. 정문에 걸린 "풍패지관" 현판은 왕조의 발상지라는 뜻을 담고 있습니다. 객사 주변 골목은 서울 경리단길에 빗대 "객리단길"이라 불리며, 오래된 건물을 고쳐 만든 카페와 식당, 소품숍이 모여 있어 젊은 여행자들에게 인기가 많습니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전북특별자치도 전주시 완산구 충경로 59 (전주객사)',
    tip: '한옥마을보다 한적해 여유롭게 카페 투어를 즐기기 좋습니다. 저녁에는 골목마다 조명이 켜져 분위기가 더 좋습니다.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course C ---
  {
    id: 'deokjin_park',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '덕진공원',
    engName: 'Deokjin Park',
    theme: '호수 공원 / 연꽃 명소',
    tags: ['#연꽃', '#연화교', '#연화정도서관', '#여름여행'],
    images: [
      'img/deokjin_park_1.jpg',
      'img/deokjin_park_2.jpg',
      'img/deokjin_park_3.jpg'
    ],
    imageCaptions: [
      '호수 위에 자리한 한옥 도서관 연화정',
      '연화정도서관의 한옥 외관',
      '덕진공원 호숫가의 한옥 건물'
    ],
    shortDesc: '넓은 호수를 가득 채운 연꽃으로 유명한 전주의 대표 공원으로, 호수 위 다리와 한옥 도서관을 따라 산책하기 좋습니다.',
    fullDesc: '덕진공원은 고려 시대부터 있었다고 전해지는 덕진연못을 중심으로 꾸민 공원입니다. 여름이면 호수의 절반 이상을 덮은 연꽃이 피어나 장관을 이루며, 호수를 가로지르는 연화교를 걸으며 가까이에서 연꽃을 감상할 수 있습니다. 호수 위의 한옥 건물 연화정은 도서관으로 꾸며져 책을 읽으며 호수 풍경을 즐길 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '전북특별자치도 전주시 덕진구 권삼득로 390',
    tip: '연꽃은 7~8월에 절정을 이룹니다. 이른 아침에 가면 꽃이 활짝 피어 있고 더위도 피할 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'namcheongyo_cheongyeonru',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '남천교 청연루 & 전주천',
    engName: 'Namcheongyo Bridge & Cheongyeonru Pavilion',
    theme: '한옥 다리 / 하천 산책',
    tags: ['#한옥누각다리', '#전주천산책', '#야경명소', '#한옥마을끝'],
    images: [
      'img/namcheongyo_cheongyeonru_1.jpg',
      'img/namcheongyo_cheongyeonru_2.jpg',
      'img/namcheongyo_cheongyeonru_3.jpg'
    ],
    imageCaptions: [
      '전주천 위에 놓인 한옥 누각 청연루',
      '누각에 앉아 바라보는 전주천 풍경',
      '전주천 위에 길게 놓인 청연루'
    ],
    shortDesc: '한옥마을 남쪽 전주천 위에 놓인 다리로, 다리 위에 지어진 한옥 누각 청연루에 앉아 시원한 강바람을 즐길 수 있는 곳입니다.',
    fullDesc: '남천교는 전주한옥마을과 전주천 건너편을 잇는 다리로, 다리 위에는 한옥 누각 청연루가 지어져 있습니다. 누각 마루에 앉아 쉬면서 전주천과 한옥마을, 멀리 남고산 자락까지 바라볼 수 있어 여행자들의 쉼터 역할을 합니다. 전주천 둔치를 따라 산책로가 이어져 있으며, 해가 지면 누각과 다리에 조명이 들어와 은은한 야경을 만들어 냅니다.',
    timeRecommended: '소요시간: 약 40분',
    address: '전북특별자치도 전주시 완산구 교동 남천교 일대',
    tip: '청연루 마루에서는 신발을 벗고 올라가 쉴 수 있습니다. 해 질 녘부터 조명이 켜지는 시간까지 머무르면 낮과 밤 풍경을 모두 볼 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'hanok_village_lanes',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '전주한옥마을 골목 산책',
    engName: 'Jeonju Hanok Village Lanes',
    theme: '한옥 골목 / 거리 먹거리',
    tags: ['#한옥마을', '#골목산책', '#한복나들이', '#길거리간식'],
    images: [
      'img/hanok_village_lanes_1.jpg',
      'img/hanok_village_lanes_2.jpg',
      'img/hanok_village_lanes_3.jpg'
    ],
    imageCaptions: [
      '언덕에서 내려다본 한옥마을 기와지붕',
      '산자락 아래 펼쳐진 한옥마을 전경',
      '한옥 사이로 난 고즈넉한 길'
    ],
    shortDesc: '700여 채의 한옥이 모여 있는 국내 최대 규모의 도심 한옥마을로, 골목마다 카페와 공방, 길거리 간식이 가득해 걷는 것만으로도 즐거운 곳입니다.',
    fullDesc: '전주한옥마을은 1930년대 전후로 지어진 한옥들이 교동과 풍남동 일대에 모여 형성된 마을로, 지금은 전주를 대표하는 관광지가 되었습니다. 태조로와 은행로를 중심으로 골목이 이어지며, 한옥을 고친 카페와 찻집, 공방, 기념품숍이 곳곳에 자리하고 있습니다. 한복을 빌려 입고 골목을 거닐거나, 길거리 간식을 맛보며 천천히 둘러보기 좋습니다. 해가 지면 골목마다 은은한 조명이 켜져 낮과는 또 다른 분위기를 느낄 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '전북특별자치도 전주시 완산구 교동·풍남동 일대',
    tip: '낮에는 무척 붐비니 저녁 무렵 골목을 걸어보세요. 한옥마을 남쪽 끝 남천교 청연루까지 이어서 걸으면 야경 산책 코스가 완성됩니다.',
    initialLikes: 0,
    initialComments: []
  }
];

CITIES_DATA.jeonju = {
  id: 'jeonju',
  name: '전주',
  badge: '전주편',
  pageTitle: '하루트립 전주 | 한옥마을과 맛의 도시 전주 당일치기 여행 가이드',
  metaDesc: '전주 당일치기 A·B·C 코스! 한옥마을, 경기전, 전동성당, 남부시장 청년몰과 야경까지 한눈에.',
  heroPill: '🏯 전국 당일치기 여행 프로젝트 #4 · 맛과 멋의 도시 전주',
  heroTitle: '700채 한옥 지붕 아래 조선의 시간<br /><span class="highlight">전주 당일치기 완벽 여행</span>',
  heroSubtitle: '경기전과 전동성당, 남부시장 야시장부터 한옥마을 골목 야경까지!<br />A · B · C 맞춤 코스로 하루 만에 즐기는 전주의 맛과 멋.',
  heroBg: 'img/jeonju_hero_bg.jpg',
  storageKeyLikes: 'haru_trip_jeonju_likes_v1',
  storageKeyComments: 'haru_trip_jeonju_comments_v1',
  courses: COURSES_JEONJU,
  destinations: DESTINATIONS_JEONJU
};
