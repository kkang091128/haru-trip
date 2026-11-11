// ========================================================
// 하루트립 (HARU TRIP) - [강릉편] 코스 & 명소 데이터
// data.js 다음에 로드되어 CITIES_DATA에 등록됩니다.
// ========================================================

const COURSES_GANGNEUNG = [
  {
    id: 'A',
    badge: '코스 A',
    title: '커피향 바다 & 경포 감성 코스',
    subtitle: '안목 커피거리의 바다 카페부터 경포·강문 해변, 경포호 호숫가 산책까지',
    highlight: '창 너머 동해를 바라보며 마시는 한 잔의 핸드드립',
    duration: '약 5~6시간',
    distance: '약 8.5 km',
    color: '#3B82F6',
    icon: '☕',
    destinations: ['anmok_coffee_street', 'gyeongpo_beach', 'gyeongpo_lake']
  },
  {
    id: 'B',
    badge: '코스 B',
    title: '율곡의 숨결 & 강릉 원도심 미식 코스',
    subtitle: '오죽헌과 선교장의 고즈넉한 한옥, 중앙시장의 먹거리까지',
    highlight: '500년 고택의 정취와 시장 골목의 따끈한 강릉 별미',
    duration: '약 5~6시간',
    distance: '약 7.0 km',
    color: '#06B6D4',
    icon: '🏯',
    destinations: ['ojukheon', 'seongyojang', 'jungang_market_wolhwa']
  },
  {
    id: 'C',
    badge: '코스 C',
    title: '정동진 해돋이 & 바다부채길 코스',
    subtitle: '바다와 가장 가까운 기차역, 해안단구 절벽길, 절벽 위 크루즈 전망대',
    highlight: '2,300만 년 전 지각변동이 빚은 동해안 절벽 위를 걷는 길',
    duration: '약 5~6시간',
    distance: '약 6.5 km',
    color: '#F59E0B',
    icon: '🌅',
    destinations: ['jeongdongjin_station', 'badabuchae_trail', 'sun_cruise_jeongdongjin']
  }
];

const DESTINATIONS_GANGNEUNG = [
  // --- Course A ---
  {
    id: 'anmok_coffee_street',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '안목해변 커피거리',
    engName: 'Anmok Beach Coffee Street',
    theme: '카페 투어 / 오션뷰',
    tags: ['#강릉커피', '#오션뷰카페', '#안목해변', '#바다산책'],
    images: [
      'img/anmok_coffee_street_1.jpg',
      'img/anmok_coffee_street_2.jpg',
      'img/anmok_coffee_street_3.jpg'
    ],
    imageCaptions: [
      '해변을 따라 길게 늘어선 오션뷰 카페 거리',
      '모래사장과 맞닿은 안목해변의 푸른 동해',
      '"ANMOK" 조형물이 서 있는 안목해변'
    ],
    shortDesc: '해변을 따라 개성 있는 카페들이 줄지어 선 강릉 커피 문화의 상징으로, 어느 카페에 들어가도 동해가 한눈에 펼쳐집니다.',
    fullDesc: '안목해변 커피거리는 과거 해변가에 늘어선 커피 자판기에서 시작해, 지금은 로스터리와 대형 오션뷰 카페가 모인 국내 대표 커피 거리로 자리 잡았습니다. 루프탑과 통창을 갖춘 카페가 많아 커피를 마시며 바다를 감상하기 좋고, 바로 앞 백사장과 남항진으로 이어지는 솔바람다리까지 산책하기에도 좋습니다. 매년 가을에는 강릉커피축제가 열려 다양한 커피를 맛볼 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '강원특별자치도 강릉시 창해로14번길 일대 (견소동)',
    tip: '2층 이상의 루프탑 카페를 고르면 백사장과 수평선을 한 프레임에 담을 수 있습니다. 해 질 녘에는 남쪽 솔바람다리 방향 산책을 추천합니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'gyeongpo_beach',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '경포해변 & 강문해변',
    engName: 'Gyeongpo Beach & Gangmun Beach',
    theme: '해변 / 바다 산책',
    tags: ['#경포해변', '#강문해변', '#동해안대표해변', '#솟대다리'],
    images: [
      'img/gyeongpo_beach_1.jpg',
      'img/gyeongpo_beach_2.jpg',
      'img/gyeongpo_beach_3.jpg'
    ],
    imageCaptions: [
      '바위와 파도가 어우러진 경포 해안',
      '백사장 위 포토존 그네',
      '송림을 따라 이어진 해변 산책로'
    ],
    shortDesc: '길고 고운 백사장과 울창한 송림이 어우러진 동해안 대표 해변 경포해변과, 바로 남쪽에 이어진 아담한 강문해변을 함께 걷는 코스입니다.',
    fullDesc: '경포해변은 동해안을 대표하는 해수욕장으로, 넓고 고운 백사장과 해변 뒤편의 소나무 숲이 아름다운 곳입니다. 여름에는 피서객으로 붐비고, 다른 계절에는 한적하게 바다를 바라보며 산책하기 좋습니다. 남쪽으로 조금 걸어가면 강문해변이 이어지는데, 경포호와 바다가 만나는 물길 위에 놓인 강문솟대다리와 마을을 지키는 진또배기 솟대가 있어 소박한 어촌 분위기를 느낄 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간~1시간 30분',
    address: '강원특별자치도 강릉시 창해로 514 (경포해수욕장)',
    tip: '경포해변에서 강문해변까지는 해안을 따라 걸어서 20분 정도입니다. 강문해변 주변에도 오션뷰 카페가 많아 쉬어가기 좋습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'gyeongpo_lake',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '경포호 & 경포대',
    engName: 'Gyeongpoho Lake & Gyeongpodae Pavilion',
    theme: '호수 산책 / 누각',
    tags: ['#경포호산책', '#경포대', '#벚꽃명소', '#자전거길'],
    images: [
      'img/gyeongpo_lake_1.jpg',
      'img/gyeongpo_lake_2.jpg',
      'img/gyeongpo_lake_3.jpg'
    ],
    imageCaptions: [
      '잔잔한 물결이 비치는 경포호',
      '소나무와 산책로가 이어진 호숫가',
      '봄이면 벚꽃이 피어나는 경포호 주변 풍경'
    ],
    shortDesc: '바닷물과 민물이 만나는 석호 경포호와, 호숫가 언덕 위 누각 경포대가 어우러진 강릉의 대표 산책 명소입니다.',
    fullDesc: '경포호는 바다와 이어진 석호로, 호수를 한 바퀴 도는 약 4km의 산책로와 자전거길이 잘 정비되어 있습니다. 호숫가 언덕 위의 누각 경포대는 관동팔경 중 하나로 꼽히며, 하늘과 바다, 호수, 술잔, 그리고 임의 눈동자에 달이 다섯 개 뜬다는 이야기가 전해질 만큼 달맞이 명소로 유명합니다. 봄에는 호숫가를 따라 벚꽃이 흐드러지게 피어 강릉의 대표 꽃놀이 장소가 됩니다.',
    timeRecommended: '소요시간: 약 1시간~1시간 30분',
    address: '강원특별자치도 강릉시 경포로 365 (경포대)',
    tip: '자전거를 빌려 호수를 한 바퀴 도는 것을 추천합니다. 4월 초 벚꽃 시즌에는 주차가 어려우니 대중교통을 이용하세요.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course B ---
  {
    id: 'ojukheon',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '오죽헌',
    engName: 'Ojukheon House',
    theme: '역사 유적 / 전통 건축',
    tags: ['#율곡이이', '#신사임당', '#검은대나무', '#보물'],
    images: [
      'img/ojukheon_1.jpg',
      'img/ojukheon_2.jpg',
      'img/ojukheon_3.jpg'
    ],
    imageCaptions: [
      '조선 중기 주택 건축을 보여주는 오죽헌 본채',
      '잘 가꾸어진 오죽헌 경내의 정원',
      '단정한 담장과 기와가 어우러진 고택의 정취'
    ],
    shortDesc: '신사임당과 율곡 이이가 태어난 유서 깊은 집으로, 줄기가 검은 대나무(오죽)가 자라 이름 붙여진 강릉의 대표 역사 명소입니다.',
    fullDesc: '오죽헌은 조선 중기 사대부 주택 건축의 모습을 잘 간직한 곳으로, 신사임당과 그 아들 율곡 이이가 태어난 곳으로 유명합니다. 본채인 오죽헌은 보물로 지정되어 있으며, 집 주변에 줄기가 까마귀처럼 검은 대나무가 자라 오죽헌이라는 이름이 붙었습니다. 경내에는 율곡의 위패를 모신 문성사와 강릉시립박물관이 함께 있어 역사와 문화를 차분히 둘러보기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간~1시간 30분',
    address: '강원특별자치도 강릉시 율곡로3139번길 24',
    tip: '오천 원권 지폐 뒷면의 배경이 바로 오죽헌입니다. 지폐를 들고 같은 구도로 사진을 찍어보세요.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'seongyojang',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '강릉 선교장',
    engName: 'Seongyojang House',
    theme: '전통 한옥 / 고택 체험',
    tags: ['#300년고택', '#활래정', '#한옥스테이', '#연못정자'],
    images: [
      'img/seongyojang_1.jpg',
      'img/seongyojang_2.jpg',
      'img/seongyojang_3.jpg'
    ],
    imageCaptions: [
      '넓은 터에 자리한 선교장의 한옥 건물들',
      '연못과 정원이 어우러진 선교장 풍경',
      '세월이 느껴지는 고택의 마당과 담장'
    ],
    shortDesc: '조선 후기 사대부 상류 주택의 모습을 그대로 간직한 고택으로, 연못 위 정자 활래정이 아름다운 강릉의 대표 한옥입니다.',
    fullDesc: '선교장은 효령대군의 후손이 조선 후기에 지어 대대로 살아온 대규모 상류 주택으로, 국가민속문화유산으로 지정되어 있습니다. 예전에는 경포호를 배로 건너 들어왔다고 하여 "배다리 마을의 집"이라는 이름이 붙었습니다. 안채와 사랑채, 별당이 넓은 터에 자리하고, 입구의 연못 위에 지어진 정자 활래정은 계절마다 다른 풍경을 보여줍니다. 일부 건물에서는 한옥 숙박 체험도 운영합니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '강원특별자치도 강릉시 운정길 63',
    tip: '여름에는 활래정 앞 연못에 연꽃이 가득 피어 가장 아름답습니다. 오죽헌에서 차로 약 10분 거리입니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'jungang_market_wolhwa',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '강릉중앙시장 & 월화거리',
    engName: 'Gangneung Jungang Market & Wolhwa Street',
    theme: '전통시장 / 로컬 미식',
    tags: ['#닭강정', '#감자전', '#장칼국수', '#시장먹방'],
    images: [
      'img/jungang_market_wolhwa_1.jpg',
      'img/jungang_market_wolhwa_2.jpg',
      'img/jungang_market_wolhwa_3.jpg'
    ],
    imageCaptions: [
      '활기 넘치는 강릉중앙시장 골목',
      '옛 철길의 흔적이 남은 월화거리',
      '시장에서 맛볼 수 있는 강릉 먹거리'
    ],
    shortDesc: '닭강정, 감자전, 장칼국수 등 강릉 별미가 가득한 전통시장과, 옛 철길 자리를 산책로로 꾸민 월화거리가 이어지는 원도심 명소입니다.',
    fullDesc: '강릉중앙시장은 강릉 시민들의 생활 시장이자 여행자들이 꼭 들르는 먹거리 명소입니다. 바삭한 닭강정과 감자전, 어묵고로케, 칼칼한 장칼국수 등 다양한 먹거리를 맛볼 수 있습니다. 시장 바로 옆 월화거리는 옛 영동선 철길이 지하화되면서 생긴 부지를 산책로와 광장으로 꾸민 곳으로, 강릉 설화 속 무월랑과 연화부인의 이야기에서 이름을 따왔습니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '강원특별자치도 강릉시 금성로 21 (강릉중앙시장)',
    tip: '인기 닭강정 가게는 줄이 길어 미리 포장 주문해두고 시장을 둘러보면 시간을 아낄 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course C ---
  {
    id: 'jeongdongjin_station',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '정동진역 & 정동진해변',
    engName: 'Jeongdongjin Station & Beach',
    theme: '해돋이 명소 / 기차역',
    tags: ['#바다와가장가까운역', '#정동진해돋이', '#모래시계', '#기차여행'],
    images: [
      'img/jeongdongjin_station_1.jpg',
      'img/jeongdongjin_station_2.jpg',
      'img/jeongdongjin_station_3.jpg'
    ],
    imageCaptions: [
      '바다 바로 앞에 자리한 정동진역',
      '여명이 밝아오는 정동진 바다',
      '바다와 나란히 이어진 정동진역 철길'
    ],
    shortDesc: '세계에서 바다와 가장 가까운 기차역으로 알려진 정동진역과 해돋이 명소 정동진해변이 함께 있는 곳입니다.',
    fullDesc: '정동진은 한양(서울 광화문)에서 정동쪽에 있는 나루라는 뜻으로, 플랫폼 바로 앞에 바다가 펼쳐지는 정동진역이 유명합니다. 1990년대 드라마 <모래시계>의 촬영지로 알려지며 전국적인 해돋이 명소가 되었고, 새해 첫날이면 많은 사람이 이곳을 찾습니다. 해변 근처에는 대형 모래시계 조형물과 시간박물관이 있어 함께 둘러보기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '강원특별자치도 강릉시 강동면 정동역길 17 (정동진역)',
    tip: '해돋이를 보려면 서울에서 출발하는 이른 새벽 열차를 이용하면 편리합니다. 역 입장 시 플랫폼 입장권이 필요할 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'badabuchae_trail',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '정동심곡 바다부채길',
    engName: 'Jeongdong-Simgok Badabuchae-gil Trail',
    theme: '해안 트레킹 / 지질 명소',
    tags: ['#해안단구', '#천연기념물', '#바다위산책로', '#트레킹'],
    images: [
      'img/badabuchae_trail_1.jpg',
      'img/badabuchae_trail_2.jpg',
      'img/badabuchae_trail_3.jpg'
    ],
    imageCaptions: [
      '파도가 드나드는 해안 절벽의 바위굴',
      '오랜 세월 지각 변동이 빚은 해안단구 절벽',
      '물결무늬처럼 휘어진 기암괴석'
    ],
    shortDesc: '천연기념물로 지정된 정동 해안단구를 따라 바다 바로 위를 걷는 해안 산책로로, 오랫동안 군 경계 지역이라 일반인 출입이 막혀 있던 곳입니다.',
    fullDesc: '정동심곡 바다부채길은 정동진 썬크루즈 주차장 부근에서 심곡항까지 이어지는 약 2.9km 길이의 해안 탐방로입니다. 약 2,300만 년 전 지각 변동으로 생긴 해안단구 지형을 따라 걸을 수 있으며, 이 일대는 천연기념물로 지정되어 있습니다. 길의 모양이 부채를 펼친 것처럼 보인다고 하여 이름 붙여졌고, 오랜 기간 군 경계 철책으로 막혀 있다가 탐방로로 개방되었습니다.',
    timeRecommended: '소요시간: 편도 약 1시간~1시간 30분',
    address: '강원특별자치도 강릉시 강동면 정동진리 (정동매표소, 썬크루즈 주차장 인근)',
    tip: '기상 상황(높은 파도, 강풍)에 따라 출입이 통제될 수 있으니 방문 전 운영 여부를 꼭 확인하세요. 편도 코스라 택시나 버스로 돌아올 방법을 미리 계획하면 좋습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'sun_cruise_jeongdongjin',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '정동진 썬크루즈 & 해안 전망',
    engName: 'Jeongdongjin Sun Cruise',
    theme: '전망 명소 / 이색 건축',
    tags: ['#크루즈호텔', '#절벽위배', '#정동진전망', '#해돋이명소'],
    images: [
      'img/sun_cruise_jeongdongjin_1.jpg',
      'img/sun_cruise_jeongdongjin_2.jpg',
      'img/sun_cruise_jeongdongjin_3.jpg'
    ],
    imageCaptions: [
      '절벽 위에 자리한 크루즈선 모양의 썬크루즈',
      '하늘에서 내려다본 썬크루즈와 정동진 해안',
      '해변 너머 절벽 위로 보이는 썬크루즈'
    ],
    shortDesc: '바다를 내려다보는 절벽 위에 크루즈선 모양으로 지어진 이색 리조트로, 전망대와 조각공원에서 정동진 바다를 한눈에 내려다볼 수 있습니다.',
    fullDesc: '정동진 썬크루즈는 마치 거대한 배가 산 위에 올라앉은 듯한 독특한 모양으로 유명한 리조트입니다. 숙박객이 아니어도 입장료를 내면 정원과 조각공원, 전망대를 둘러볼 수 있으며, 높은 곳에서 정동진역과 해변, 끝없이 펼쳐진 동해를 시원하게 내려다볼 수 있습니다. 바다부채길 정동 매표소와 가까워 트레킹 전후로 함께 들르기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '강원특별자치도 강릉시 강동면 헌화로 950-39',
    tip: '해돋이 명소로도 유명해 새벽 일출 시간에 맞춰 방문하는 사람이 많습니다. 정동진역에서 차로 약 5분 거리입니다.',
    initialLikes: 0,
    initialComments: []
  }
];

CITIES_DATA.gangneung = {
  id: 'gangneung',
  name: '강릉',
  badge: '강릉편',
  pageTitle: '하루트립 강릉 | 커피향 바다와 정동진 해돋이 강릉 당일치기 여행 가이드',
  metaDesc: 'A, B, C 맞춤 코스로 즐기는 강릉 당일치기 여행! 안목 커피거리, 경포호, 오죽헌, 중앙시장, 정동진 바다부채길까지 한눈에 둘러보세요.',
  heroPill: '☕ 전국 당일치기 여행 프로젝트 #3 · 커피도시 강릉',
  heroTitle: '커피향 가득한 바다와 율곡의 숨결<br /><span class="highlight">강릉 당일치기 완벽 여행</span>',
  heroSubtitle: '안목해변 오션뷰 카페부터 오죽헌 고택, 정동진 바다부채길까지!<br />A · B · C 맞춤 코스로 하루 만에 즐기는 강릉의 바다와 역사.',
  heroBg: 'img/gangneung_hero_bg.jpg',
  storageKeyLikes: 'haru_trip_gangneung_likes_v1',
  storageKeyComments: 'haru_trip_gangneung_comments_v1',
  courses: COURSES_GANGNEUNG,
  destinations: DESTINATIONS_GANGNEUNG
};
