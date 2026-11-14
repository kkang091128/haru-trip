// ========================================================
// 하루트립 (HARU TRIP) - [여수편] 코스 & 명소 데이터
// data.js 다음에 로드되어 CITIES_DATA에 등록됩니다.
// ========================================================

const COURSES_YEOSU = [
  {
    id: 'A',
    badge: '코스 A',
    title: '엑스포 & 오동도 동백섬 & 해상케이블카 코스',
    subtitle: '여수세계박람회장의 빅오쇼, 동백숲 우거진 오동도, 바다 위를 건너는 해상케이블카',
    highlight: '걸어서 이어지는 여수 대표 명소 3곳을 하루에',
    duration: '약 5~6시간',
    distance: '약 3.0 km',
    color: '#3B82F6',
    icon: '🌺',
    destinations: ['yeosu_expo', 'odongdo', 'yeosu_cable_car']
  },
  {
    id: 'B',
    badge: '코스 B',
    title: '향일암 해돋이 & 돌산대교 & 예술의 섬 장도 코스',
    subtitle: '바다 절벽 위 암자 향일암, 돌산공원에서 보는 돌산대교, 바닷길을 건너는 장도',
    highlight: '남해 바다를 따라 달리는 돌산도 드라이브와 섬 산책',
    duration: '약 6~7시간',
    distance: '약 45 km (차량 이동)',
    color: '#06B6D4',
    icon: '🌅',
    destinations: ['hyangiram', 'dolsan_park', 'jangdo_island']
  },
  {
    id: 'C',
    badge: '코스 C',
    title: '진남관 역사 산책 & 여수 밤바다 낭만 코스',
    subtitle: '이순신 장군의 전라좌수영 진남관, 붉은 하멜등대, 낭만포차가 불을 밝히는 밤바다',
    highlight: '역사의 거리에서 시작해 노래 속 여수 밤바다로 마무리',
    duration: '약 5~6시간',
    distance: '약 2.5 km',
    color: '#F59E0B',
    icon: '🌉',
    destinations: ['jinnamgwan', 'hamel_lighthouse', 'yeosu_night_sea']
  }
];

const DESTINATIONS_YEOSU = [
  // --- Course A ---
  {
    id: 'yeosu_expo',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '여수세계박람회장 & 빅오쇼',
    engName: 'Yeosu Expo Park & Big-O Show',
    theme: '복합 문화 공간 / 야간 쇼',
    tags: ['#빅오쇼', '#아쿠아플라넷', '#엑스포공원', '#바다산책'],
    images: [
      'img/yeosu_expo_1.jpg',
      'img/yeosu_expo_2.jpg',
      'img/yeosu_expo_3.jpg'
    ],
    imageCaptions: [
      '물과 빛, 불꽃이 어우러지는 빅오쇼',
      '여수세계박람회장 국제관 입구',
      '박람회장 안의 아쿠아플라넷 여수'
    ],
    shortDesc: '2012 여수세계박람회가 열렸던 바닷가 공간으로, 아쿠아플라넷과 스카이타워, 그리고 밤마다 펼쳐지는 빅오쇼를 즐길 수 있는 곳입니다.',
    fullDesc: '여수세계박람회장은 "살아있는 바다, 숨 쉬는 연안"을 주제로 열린 2012 여수세계박람회의 행사장을 공원으로 꾸민 곳입니다. 바다를 따라 넓은 산책로와 광장이 이어지고, 대형 아쿠아리움인 아쿠아플라넷 여수와 전망대가 있는 스카이타워가 자리하고 있습니다. 해가 지면 바다 위 거대한 원형 구조물 "빅오(Big-O)"에서 물·빛·레이저가 어우러진 멀티미디어 쇼가 펼쳐져 여수의 밤을 화려하게 엽니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '전라남도 여수시 박람회길 1',
    tip: '빅오쇼는 계절과 요일에 따라 운영 시간이 달라지니 방문 전 공식 일정을 확인하세요. KTX 여수엑스포역에서 바로 걸어갈 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'odongdo',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '오동도',
    engName: 'Odongdo Island',
    theme: '동백섬 / 숲 산책',
    tags: ['#동백꽃', '#방파제길', '#오동도등대', '#동백열차'],
    images: [
      'img/odongdo_1.jpg',
      'img/odongdo_2.jpg',
      'img/odongdo_3.jpg'
    ],
    imageCaptions: [
      '오동도로 이어지는 바다 위 방파제길',
      '오동도에 핀 붉은 동백꽃',
      '숲 위로 솟은 오동도 등대와 해안 절벽'
    ],
    shortDesc: '육지와 긴 방파제로 이어진 작은 섬으로, 섬 전체를 덮은 동백나무 숲과 등대, 해안 절벽 산책로가 아름다운 여수의 상징입니다.',
    fullDesc: '오동도는 멀리서 보면 오동잎처럼 생겼다고 해서 이름 붙은 섬으로, 약 768m 길이의 방파제길을 따라 걸어서 들어갈 수 있습니다. 섬에는 수천 그루의 동백나무와 시누대가 빽빽하게 자라 "동백섬"이라 불리며, 이른 봄이면 붉은 동백꽃이 숲길을 물들입니다. 숲속 산책로를 따라 오동도 등대와 바닷물이 드나드는 용굴, 해안 절벽 전망대를 차례로 둘러볼 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전라남도 여수시 수정동 오동도 일대',
    tip: '방파제길이 꽤 길어 걷기 힘들다면 입구에서 섬까지 오가는 동백열차를 이용하세요. 동백꽃은 보통 2~3월에 가장 많이 핍니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'yeosu_cable_car',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '여수해상케이블카',
    engName: 'Yeosu Maritime Cable Car',
    theme: '케이블카 / 바다 전망',
    tags: ['#해상케이블카', '#크리스탈캐빈', '#돌산대교뷰', '#여수항'],
    images: [
      'img/yeosu_cable_car_1.jpg',
      'img/yeosu_cable_car_2.jpg',
      'img/yeosu_cable_car_3.jpg'
    ],
    imageCaptions: [
      '바다 위를 건너는 케이블카와 거북선대교',
      '발아래 바다가 보이는 크리스탈 캐빈',
      '여수해상케이블카 탑승장'
    ],
    shortDesc: '자산공원과 돌산공원 사이 바다 위를 건너는 케이블카로, 여수항과 거북선대교, 오동도를 한눈에 내려다볼 수 있습니다.',
    fullDesc: '여수해상케이블카는 2014년 국내 최초로 바다 위를 가로지르도록 놓인 해상 케이블카입니다. 오동도 옆 자산공원과 건너편 돌산공원을 약 1.5km 길이로 연결하며, 캐빈에 앉아 여수항과 거북선대교, 오동도, 멀리 돌산대교까지 시원하게 내려다볼 수 있습니다. 바닥이 투명한 크리스탈 캐빈을 타면 발아래로 바다와 배가 지나가는 짜릿한 풍경을 볼 수 있고, 해 질 녘과 밤에 타면 불빛이 켜진 여수 야경을 감상할 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 (왕복)',
    address: '전라남도 여수시 돌산읍 돌산로 3600-1 (돌산탑승장)',
    tip: '오동도에서 가까운 자산공원 탑승장에서 타면 동선이 편합니다. 주말 해 질 녘에는 대기 줄이 길어지니 조금 일찍 탑승하는 것을 추천합니다.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course B ---
  {
    id: 'hyangiram',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '향일암',
    engName: 'Hyangiram Hermitage',
    theme: '사찰 / 해돋이 명소',
    tags: ['#해돋이명소', '#바다절벽', '#관음성지', '#돌산도'],
    images: [
      'img/hyangiram_1.jpg',
      'img/hyangiram_2.jpg',
      'img/hyangiram_3.jpg'
    ],
    imageCaptions: [
      '거대한 바위 아래 자리한 향일암 원통보전',
      '향일암에서 내려다본 남해 바다',
      '향일암 전각 처마의 화려한 용 조각'
    ],
    shortDesc: '돌산도 끝 금오산 바위 절벽에 자리한 암자로, 이름처럼 "해를 향한" 탁 트인 남해 바다 전망과 해돋이로 유명합니다.',
    fullDesc: '향일암은 "해를 향한 암자"라는 뜻으로, 돌산도 남쪽 끝 금오산 기슭의 바위 절벽에 자리하고 있습니다. 신라 때 원효대사가 수도하던 곳이라 전해지며, 우리나라의 대표적인 관음 기도처 가운데 하나로 꼽힙니다. 오르는 길에는 바위 틈 사이를 지나는 좁은 석문들이 이어지고, 전각 앞에 서면 끝없이 펼쳐진 남해 바다가 눈앞에 들어옵니다. 매년 새해 첫날에는 해돋이를 보려는 사람들로 크게 붐빕니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전라남도 여수시 돌산읍 향일암로 60',
    tip: '주차장에서 암자까지 가파른 계단과 오르막이 이어지니 편한 신발을 신으세요. 해돋이를 보려면 일출 1시간 전에는 도착하는 것이 좋습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'dolsan_park',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '돌산공원 & 돌산대교',
    engName: 'Dolsan Park & Dolsan Bridge',
    theme: '전망 공원 / 야경 명소',
    tags: ['#돌산대교', '#여수야경', '#전망대', '#케이블카'],
    images: [
      'img/dolsan_park_1.jpg',
      'img/dolsan_park_2.jpg',
      'img/dolsan_park_3.jpg'
    ],
    imageCaptions: [
      '돌산공원에서 내려다본 돌산대교와 여수 시내',
      '바다와 섬들이 펼쳐진 돌산공원 광장',
      '해 질 녘 불이 켜진 돌산대교'
    ],
    shortDesc: '여수 시내와 돌산도를 잇는 돌산대교 바로 옆 언덕 공원으로, 다리와 여수항이 한눈에 들어오는 여수 최고의 전망 명소입니다.',
    fullDesc: '돌산공원은 돌산도 입구 언덕 위에 조성된 공원으로, 바로 아래 돌산대교와 건너편 여수 구도심, 장군도와 여수항을 한눈에 내려다볼 수 있습니다. 돌산대교는 여수 육지와 돌산도를 처음으로 이어 준 사장교로, 밤이 되면 주탑과 케이블에 화려한 조명이 들어와 여수의 대표 야경을 만듭니다. 공원 안에는 여수해상케이블카 돌산탑승장도 있어 케이블카와 함께 둘러보기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '전라남도 여수시 돌산읍 우두리 돌산공원 일대',
    tip: '해 질 무렵 도착해 노을과 돌산대교에 조명이 켜지는 순간을 함께 보는 것을 추천합니다. 공원 주차장은 케이블카 이용객으로 붐빌 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'jangdo_island',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '예술의 섬 장도',
    engName: 'Jangdo Art Island',
    theme: '섬 산책 / 예술 공간',
    tags: ['#예술의섬', '#진섬다리', '#섬산책', '#웅천'],
    images: [
      'img/jangdo_island_1.jpg',
      'img/jangdo_island_2.jpg',
      'img/jangdo_island_3.jpg'
    ],
    imageCaptions: [
      '바다를 건너 장도로 이어지는 진섬다리',
      '잔잔한 바다 위에 떠 있는 장도',
      '불빛이 켜진 저녁의 장도 입구'
    ],
    shortDesc: '웅천 해변 앞 작은 섬을 예술 공원으로 꾸민 곳으로, 바다 위 다리를 건너 전시관과 조각, 대숲 산책로를 둘러볼 수 있습니다.',
    fullDesc: '장도는 여수 웅천 해변 바로 앞에 떠 있는 작은 섬으로, 섬 전체가 전시관과 야외 조각, 정원이 어우러진 "예술의 섬"으로 꾸며져 있습니다. 육지와 섬은 "진섬다리"라는 낮은 다리로 이어져 있는데, 바닷물이 가장 높이 차오르는 만조 때에는 다리가 물에 잠겨 건널 수 없어 더욱 특별합니다. 섬 둘레를 따라 대나무숲과 잔디 언덕을 지나는 산책로가 있어 바다를 보며 천천히 걷기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간~1시간 30분',
    address: '전라남도 여수시 웅천동 장도 일대',
    tip: '만조 시간에는 진섬다리가 잠겨 출입이 통제되니 방문 전 물때를 꼭 확인하세요. 바로 옆 웅천친수공원 해변에서 노을을 보며 쉬어 가기 좋습니다.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course C ---
  {
    id: 'jinnamgwan',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '진남관 & 이순신광장',
    engName: 'Jinnamgwan Hall & Yi Sun-sin Square',
    theme: '역사 유적 / 광장',
    tags: ['#국보', '#전라좌수영', '#이순신장군', '#거북선'],
    images: [
      'img/jinnamgwan_1.jpg',
      'img/jinnamgwan_2.jpg',
      'img/jinnamgwan_3.jpg'
    ],
    imageCaptions: [
      '68개의 기둥이 늘어선 진남관 정면',
      '옆에서 바라본 진남관의 긴 지붕선',
      '진남관 정문 누각 망해루'
    ],
    shortDesc: '이순신 장군의 전라좌수영 터에 세워진 거대한 목조 건물 진남관과, 거북선 모형이 있는 바닷가 이순신광장을 함께 둘러보는 코스입니다.',
    fullDesc: '진남관은 임진왜란 때 이순신 장군이 이끈 전라좌수영의 본영 자리에 세워진 객사로, "남쪽의 왜적을 진압한다"는 뜻을 담고 있습니다. 정면 15칸, 측면 5칸에 기둥 68개가 받치는 현존 최대 규모의 단층 목조 건물로 국보로 지정되어 있습니다. 언덕 아래 바닷가의 이순신광장에는 이순신 장군 동상과 실물 크기로 재현한 거북선이 있으며, 주변에 여수 별미 식당과 카페가 모여 있어 여행의 출발점으로 좋습니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전라남도 여수시 동문로 11 (진남관)',
    tip: '진남관은 보수 공사 등으로 관람이 제한될 때가 있으니 방문 전 확인하세요. 이순신광장 주변 골목에서 여수 명물 딱새우회나 갓김치를 맛볼 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'hamel_lighthouse',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '하멜등대 & 하멜전시관',
    engName: 'Hamel Lighthouse & Hamel Museum',
    theme: '등대 / 전시관',
    tags: ['#빨간등대', '#하멜표류기', '#포토존', '#바다산책'],
    images: [
      'img/hamel_lighthouse_1.jpg',
      'img/hamel_lighthouse_2.jpg',
      'img/hamel_lighthouse_3.jpg'
    ],
    imageCaptions: [
      '밤이 되면 붉게 빛나는 하멜등대',
      '바다 앞에 자리한 하멜전시관',
      '전시관 앞 하멜 동상과 안내비'
    ],
    shortDesc: '조선을 서양에 처음 자세히 알린 네덜란드인 하멜을 기념하는 붉은 등대와 전시관으로, 밤바다 산책길의 인기 포토존입니다.',
    fullDesc: '하멜은 1653년 제주에 표류한 뒤 13년 동안 조선에 머물다 여수에서 배를 타고 탈출한 네덜란드 선원입니다. 그가 남긴 「하멜표류기」는 조선을 서양에 자세히 소개한 첫 기록으로 꼽힙니다. 하멜전시관에서는 하멜 일행의 표류 과정과 조선 생활을 살펴볼 수 있고, 바로 앞 방파제 끝에 선 빨간 하멜등대는 밤이 되면 조명이 켜져 여수 밤바다의 대표 포토존이 됩니다.',
    timeRecommended: '소요시간: 약 40분~1시간',
    address: '전라남도 여수시 종화동 하멜전시관 일대',
    tip: '전시관은 월요일에 쉬는 경우가 많으니 확인하세요. 등대는 해가 진 뒤 조명이 켜졌을 때 사진이 가장 예쁘게 나옵니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'yeosu_night_sea',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '여수 밤바다 & 낭만포차 거리',
    engName: 'Yeosu Night Sea & Nangman Pocha Street',
    theme: '야경 명소 / 포장마차 거리',
    tags: ['#여수밤바다', '#낭만포차', '#해물삼합', '#거북선대교야경'],
    images: [
      'img/yeosu_night_sea_1.jpg',
      'img/yeosu_night_sea_2.jpg',
      'img/yeosu_night_sea_3.jpg'
    ],
    imageCaptions: [
      '불빛이 물든 여수 시내의 밤바다',
      '바다에 비친 여수 구도심의 야경',
      '해안을 따라 이어지는 여수의 밤 풍경'
    ],
    shortDesc: '노래로도 유명한 여수 밤바다를 따라 포장마차가 줄지어 불을 밝히는 거리로, 해물삼합과 함께 하루를 마무리하기 좋은 곳입니다.',
    fullDesc: '종포해양공원 일대 바닷가에는 해가 지면 낭만포차가 하나둘 불을 켜고, 바다 건너 돌산대교와 거북선대교의 조명이 물 위에 비치며 노래 속 "여수 밤바다" 풍경이 펼쳐집니다. 포차에서는 삼겹살과 키조개, 갓김치를 함께 구워 먹는 해물삼합이 대표 메뉴이며, 바닷바람을 맞으며 해안 산책로를 따라 이순신광장까지 걸어도 좋습니다. 여수 여행의 마지막을 장식하기에 가장 여수다운 장소입니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '전라남도 여수시 종화동 종포해양공원 일대',
    tip: '낭만포차는 보통 저녁부터 문을 열고 주말에는 자리가 금방 차니 해 질 무렵 일찍 가는 것을 추천합니다. 바닷바람이 차가우니 얇은 겉옷을 챙기세요.',
    initialLikes: 0,
    initialComments: []
  }
];

CITIES_DATA.yeosu = {
  id: 'yeosu',
  name: '여수',
  emoji: '🌉',
  badge: '여수편',
  pageTitle: '하루트립 여수 | 동백섬과 밤바다의 도시 여수 당일치기 여행 가이드',
  metaDesc: '여수 당일치기 A·B·C 코스! 오동도, 해상케이블카, 향일암, 진남관, 낭만포차 밤바다까지 한눈에.',
  heroPill: '🌉 전국 당일치기 여행 프로젝트 #6 · 낭만의 밤바다 여수',
  heroTitle: '동백꽃 피는 섬과 반짝이는 밤바다<br /><span class="highlight">여수 당일치기 완벽 여행</span>',
  heroSubtitle: '오동도 동백숲과 해상케이블카부터 향일암 해돋이, 낭만포차 밤바다까지!<br />A · B · C 맞춤 코스로 하루 만에 즐기는 여수의 바다와 낭만.',
  heroBg: 'img/yeosu_hero_bg.jpg',
  map: { lat: 34.7604, lng: 127.6622 }, // 지역 선택 지도의 핀 위치
  storageKeyLikes: 'haru_trip_yeosu_likes_v1',
  storageKeyComments: 'haru_trip_yeosu_comments_v1',
  courses: COURSES_YEOSU,
  destinations: DESTINATIONS_YEOSU
};
