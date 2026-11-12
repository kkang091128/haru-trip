// ========================================================
// 하루트립 (HARU TRIP) - [제주편] 코스 & 명소 데이터
// data.js 다음에 로드되어 CITIES_DATA에 등록됩니다.
// ========================================================

const COURSES_JEJU = [
  {
    id: 'A',
    badge: '코스 A',
    title: '애월·협재 에메랄드 해변 & 녹차밭 코스',
    subtitle: '제주 서쪽 해안 산책로와 비양도가 보이는 협재 바다, 드넓은 녹차밭',
    highlight: '투명한 에메랄드빛 바다와 초록 녹차밭이 이어지는 서쪽 제주',
    duration: '약 6~7시간',
    distance: '약 40 km (차량 이동)',
    color: '#3B82F6',
    icon: '🍵',
    destinations: ['handam_coastal_trail', 'hyeopjae_beach', 'osulloc_tea_museum']
  },
  {
    id: 'B',
    badge: '코스 B',
    title: '성산일출봉 & 동쪽 해안 드라이브 코스',
    subtitle: '유네스코 세계자연유산 성산일출봉, 바다로 뻗은 섭지코지, 월정리 카페 해변',
    highlight: '바다 위로 솟은 화산 분화구와 푸른 동쪽 해안',
    duration: '약 6~7시간',
    distance: '약 35 km (차량 이동)',
    color: '#06B6D4',
    icon: '🌋',
    destinations: ['seongsan_ilchulbong', 'seopjikoji', 'woljeongri_beach']
  },
  {
    id: 'C',
    badge: '코스 C',
    title: '서귀포 폭포 & 예술 산책 야경 코스',
    subtitle: '이중섭 거리와 매일올레시장, 숲속 천지연폭포, 새연교의 밤바다',
    highlight: '예술가의 골목과 폭포, 그리고 조명이 켜진 서귀포항의 밤',
    duration: '약 5~6시간',
    distance: '약 4.0 km',
    color: '#F59E0B',
    icon: '🌊',
    destinations: ['lee_jungseop_street', 'cheonjiyeon_falls', 'saeyeongyo_bridge']
  }
];

const DESTINATIONS_JEJU = [
  // --- Course A ---
  {
    id: 'handam_coastal_trail',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '애월 한담해안산책로',
    engName: 'Aewol Handam Coastal Trail',
    theme: '해안 산책 / 오션뷰 카페',
    tags: ['#애월', '#해안산책로', '#오션뷰카페', '#노을명소'],
    images: [
      'img/handam_coastal_trail_1.jpg',
      'img/handam_coastal_trail_2.jpg',
      'img/handam_coastal_trail_3.jpg'
    ],
    imageCaptions: [
      '검은 현무암 해안을 따라 이어진 한담 산책로',
      '맑고 푸른 애월 앞바다',
      '해 질 녘 붉게 물든 애월 해안'
    ],
    shortDesc: '애월리에서 곽지해수욕장까지 검은 현무암 해안을 따라 이어지는 산책로로, 투명한 바다와 오션뷰 카페가 어우러진 제주 서쪽의 대표 명소입니다.',
    fullDesc: '한담해안산책로는 애월읍 한담마을에서 곽지해수욕장까지 약 1.2km 이어지는 해안 산책길입니다. 울퉁불퉁한 현무암 바위 사이로 길이 나 있어 바다를 아주 가까이에서 볼 수 있고, 물이 맑아 바닥이 훤히 들여다보입니다. 산책로 시작 지점 주변에는 바다를 바라보는 카페와 식당이 모여 있어 여유로운 시간을 보내기 좋으며, 해 질 무렵에는 노을 명소로도 유명합니다.',
    timeRecommended: '소요시간: 약 1시간~1시간 30분',
    address: '제주특별자치도 제주시 애월읍 애월리 한담해안산책로 일대',
    tip: '곽지해수욕장 쪽에서 출발해 한담 방향으로 걸으면 끝에서 카페에 들러 쉬기 좋습니다. 바람이 강한 날이 많으니 가벼운 겉옷을 챙기세요.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'hyeopjae_beach',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '협재해수욕장',
    engName: 'Hyeopjae Beach',
    theme: '해변 / 에메랄드 바다',
    tags: ['#비양도뷰', '#에메랄드바다', '#하얀모래', '#제주서쪽'],
    images: [
      'img/hyeopjae_beach_1.jpg',
      'img/hyeopjae_beach_2.jpg',
      'img/hyeopjae_beach_3.jpg'
    ],
    imageCaptions: [
      '에메랄드빛 바다 너머로 보이는 비양도',
      '현무암 너머로 펼쳐진 에메랄드빛 바다',
      '얕은 바다에서 물놀이하는 여행자들'
    ],
    shortDesc: '하얀 모래와 에메랄드빛 바다, 그리고 바로 앞에 떠 있는 비양도가 그림 같은 풍경을 만드는 제주 서쪽의 대표 해수욕장입니다.',
    fullDesc: '협재해수욕장은 조개껍질이 섞인 하얀 모래와 얕고 투명한 바다로 유명한 해변입니다. 해변 앞바다에는 작은 섬 비양도가 떠 있어 어디서 사진을 찍어도 엽서 같은 풍경이 나옵니다. 수심이 얕아 아이들과 함께 물놀이하기 좋고, 해변 뒤편 송림에서는 그늘 아래 쉬어갈 수 있습니다. 바로 옆 금능해수욕장과 이어져 함께 산책하기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '제주특별자치도 제주시 한림읍 한림로 329-10',
    tip: '맑은 날 오후 햇빛이 비칠 때 바다색이 가장 선명한 에메랄드빛을 띱니다. 해 질 녘 비양도 너머로 지는 노을도 아름답습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'osulloc_tea_museum',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '오설록 티뮤지엄',
    engName: 'O\'sulloc Tea Museum',
    theme: '녹차밭 / 카페 / 전시',
    tags: ['#녹차밭', '#녹차아이스크림', '#티뮤지엄', '#서광차밭'],
    images: [
      'img/osulloc_tea_museum_1.jpg',
      'img/osulloc_tea_museum_2.jpg',
      'img/osulloc_tea_museum_3.jpg'
    ],
    imageCaptions: [
      '끝없이 펼쳐진 서광 녹차밭',
      '녹차밭 옆에 자리한 티뮤지엄 건물',
      '오설록 티뮤지엄 입구'
    ],
    shortDesc: '드넓은 서광 녹차밭 옆에 자리한 차 박물관이자 카페로, 녹차 디저트와 함께 초록빛 차밭 산책을 즐길 수 있는 제주 대표 명소입니다.',
    fullDesc: '오설록 티뮤지엄은 한국 차 문화를 소개하는 전시 공간과 카페, 기념품숍이 함께 있는 곳입니다. 바로 앞에는 넓은 서광 녹차밭이 펼쳐져 있어 줄지어 선 차나무 사이를 걸으며 사진을 찍을 수 있습니다. 녹차 아이스크림과 롤케이크 같은 디저트가 특히 유명하며, 전망대에서는 녹차밭 전체를 내려다볼 수 있습니다. 근처 이니스프리 제주하우스와 함께 둘러보는 여행자도 많습니다.',
    timeRecommended: '소요시간: 약 1시간~1시간 30분',
    address: '제주특별자치도 서귀포시 안덕면 신화역사로 15',
    tip: '주말 오후에는 매우 붐비니 오전 일찍 방문하는 것을 추천합니다. 녹차밭 사이 산책로는 흙길이라 편한 신발이 좋습니다.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course B ---
  {
    id: 'seongsan_ilchulbong',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '성산일출봉',
    engName: 'Seongsan Ilchulbong Peak',
    theme: '세계자연유산 / 일출 명소',
    tags: ['#유네스코세계자연유산', '#해돋이', '#분화구', '#제주필수코스'],
    images: [
      'img/seongsan_ilchulbong_1.jpg',
      'img/seongsan_ilchulbong_2.jpg',
      'img/seongsan_ilchulbong_3.jpg'
    ],
    imageCaptions: [
      '하늘에서 내려다본 성산일출봉과 분화구',
      '수국 너머로 보이는 푸른 저녁의 성산일출봉',
      '일출봉에서 내려다본 성산 마을의 야경'
    ],
    shortDesc: '바닷속 화산 폭발로 만들어진 거대한 분화구로, 유네스코 세계자연유산에 등재된 제주를 대표하는 해돋이 명소입니다.',
    fullDesc: '성산일출봉은 약 5천 년 전 얕은 바다에서 일어난 화산 폭발로 만들어진 응회구로, 2007년 유네스코 세계자연유산에 등재되었습니다. 정상에는 지름이 600m에 이르는 거대한 분화구가 있으며, 해 뜨는 모습이 아름다워 "일출봉"이라는 이름이 붙었습니다. 계단으로 된 탐방로를 따라 20~30분 정도 오르면 정상에 닿고, 분화구와 함께 성산 마을과 우도까지 한눈에 볼 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
    tip: '해돋이를 보려면 일출 약 1시간 전에 도착해 오르는 것이 좋습니다. 하산 길에 해녀들의 물질 공연을 볼 수 있는 날도 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'seopjikoji',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '섭지코지',
    engName: 'Seopjikoji',
    theme: '해안 절경 / 산책',
    tags: ['#해안절벽', '#하얀등대', '#유채꽃', '#드라마촬영지'],
    images: [
      'img/seopjikoji_1.jpg',
      'img/seopjikoji_2.jpg',
      'img/seopjikoji_3.jpg'
    ],
    imageCaptions: [
      '바다를 향해 뻗은 섭지코지 해안',
      '바다로 뻗은 섭지코지의 기암과 언덕',
      '멀리 성산일출봉이 보이는 해안 풍경'
    ],
    shortDesc: '바다를 향해 길게 뻗은 해안 지형으로, 초원 언덕과 하얀 등대, 멀리 보이는 성산일출봉이 어우러진 제주 동쪽의 산책 명소입니다.',
    fullDesc: '섭지코지는 "좁은 땅"을 뜻하는 섭지와 "곶"을 뜻하는 코지가 합쳐진 이름으로, 바다 쪽으로 툭 튀어나온 지형입니다. 완만한 초원 언덕을 따라 산책로가 이어져 있고, 언덕 끝의 하얀 등대에 오르면 탁 트인 바다와 성산일출봉이 한눈에 들어옵니다. 봄에는 유채꽃이 피어 더욱 아름다우며, 여러 드라마와 영화의 촬영지로도 알려져 있습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '제주특별자치도 서귀포시 성산읍 고성리 섭지코지 일대',
    tip: '성산일출봉에서 차로 10분 정도 거리라 함께 묶어 다니기 좋습니다. 바람이 매우 강한 곳이니 모자는 단단히 챙기세요.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'woljeongri_beach',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '월정리해변',
    engName: 'Woljeong-ri Beach',
    theme: '해변 / 카페 거리',
    tags: ['#월정리', '#오션뷰카페', '#하얀모래', '#제주동쪽'],
    images: [
      'img/woljeongri_beach_1.jpg',
      'img/woljeongri_beach_2.jpg',
      'img/woljeongri_beach_3.jpg'
    ],
    imageCaptions: [
      '하얀 모래와 맑은 바다의 월정리해변',
      '해변을 따라 늘어선 카페와 건물들',
      '해변 앞에 놓인 알록달록한 의자와 바다'
    ],
    shortDesc: '하얀 모래와 투명한 옥빛 바다, 해변을 따라 늘어선 감성 카페가 어우러진 제주 동쪽의 인기 해변입니다.',
    fullDesc: '월정리해변은 "달이 머무는 곳"이라는 뜻의 이름처럼 아름다운 바다로 사랑받는 해변입니다. 얕은 수심의 바다가 햇빛을 받으면 옥빛으로 빛나며, 해변을 따라 바다를 향한 카페와 식당이 줄지어 있어 하루 일정을 여유롭게 마무리하기 좋습니다. 해안도로를 따라 드라이브하며 근처 김녕해변이나 세화해변까지 함께 둘러보는 것도 추천합니다.',
    timeRecommended: '소요시간: 약 1시간~1시간 30분',
    address: '제주특별자치도 제주시 구좌읍 월정리 해변 일대',
    tip: '해변 앞 카페의 창가 자리는 일찍 차니 오후 늦게보다는 이른 오후 방문을 추천합니다. 썰물 때는 현무암 바위 사이 조간대를 구경할 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course C ---
  {
    id: 'lee_jungseop_street',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '서귀포매일올레시장 & 이중섭거리',
    engName: 'Lee Jung-seop Street & Seogwipo Olle Market',
    theme: '예술 거리 / 전통시장',
    tags: ['#이중섭미술관', '#예술거리', '#올레시장', '#시장먹방'],
    images: [
      'img/lee_jungseop_street_1.jpg',
      'img/lee_jungseop_street_2.jpg',
      'img/lee_jungseop_street_3.jpg'
    ],
    imageCaptions: [
      '서귀포매일올레시장의 활기찬 풍경',
      '제주 먹거리가 가득한 시장 골목',
      '이중섭이 서귀포 시절 그린 「서귀포의 환상」(1951)'
    ],
    shortDesc: '화가 이중섭이 한국전쟁 피란 시절 가족과 머물렀던 거리와, 제주 먹거리가 가득한 서귀포매일올레시장을 함께 둘러보는 코스입니다.',
    fullDesc: '이중섭거리는 화가 이중섭이 1951년 한국전쟁을 피해 가족과 함께 머물렀던 곳을 기념해 조성한 거리입니다. 그가 살던 작은 초가집이 복원되어 있고, 바로 위에는 그의 작품을 전시하는 이중섭미술관이 있습니다. 거리를 따라 공방과 갤러리, 카페가 이어지며, 주말에는 프리마켓이 열리기도 합니다. 가까운 서귀포매일올레시장에서는 귤, 회, 흑돼지 꼬치 등 다양한 제주 먹거리를 맛볼 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '제주특별자치도 서귀포시 이중섭로 27-3 (이중섭미술관)',
    tip: '이중섭 거주지 뒤편 언덕에서 바라보는 서귀포 바다와 섶섬 풍경이 화가의 작품 속 풍경과 닮아 있습니다. 미술관은 월요일 휴관일 수 있으니 확인하세요.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'cheonjiyeon_falls',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '천지연폭포',
    engName: 'Cheonjiyeon Waterfall',
    theme: '폭포 / 숲 산책',
    tags: ['#폭포', '#난대림', '#야간관람', '#서귀포필수코스'],
    images: [
      'img/cheonjiyeon_falls_1.jpg',
      'img/cheonjiyeon_falls_2.jpg',
      'img/cheonjiyeon_falls_3.jpg'
    ],
    imageCaptions: [
      '절벽 아래로 시원하게 떨어지는 천지연폭포',
      '울창한 난대림 사이로 흐르는 계곡',
      '폭포 아래 맑고 푸른 연못'
    ],
    shortDesc: '하늘과 땅이 만나 이룬 연못이라는 뜻의 이름을 가진 폭포로, 울창한 숲길을 따라 걸어 들어가면 시원하게 쏟아지는 물줄기를 만날 수 있습니다.',
    fullDesc: '천지연폭포는 높이 약 22m의 절벽에서 떨어지는 물줄기가 깊은 연못을 이루는 서귀포의 대표 폭포입니다. 입구에서 폭포까지 이어지는 산책로 양옆으로 난대림이 울창하게 우거져 있으며, 이 일대 계곡은 천연기념물로 지정되어 보호되고 있습니다. 밤늦게까지 관람할 수 있어 조명이 비치는 폭포의 색다른 모습도 즐길 수 있습니다.',
    timeRecommended: '소요시간: 약 40분~1시간',
    address: '제주특별자치도 서귀포시 남성중로 2-15',
    tip: '입구에서 폭포까지 평탄한 길로 약 10분 정도라 누구나 편하게 다녀올 수 있습니다. 해가 진 후에 방문하면 조명이 켜진 폭포를 볼 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'saeyeongyo_bridge',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '새연교 & 새섬',
    engName: 'Saeyeongyo Bridge & Saeseom Island',
    theme: '야경 명소 / 섬 산책',
    tags: ['#새연교야경', '#서귀포항', '#새섬산책', '#밤바다'],
    images: [
      'img/saeyeongyo_bridge_1.jpg',
      'img/saeyeongyo_bridge_2.jpg',
      'img/saeyeongyo_bridge_3.jpg'
    ],
    imageCaptions: [
      '돛을 단 배 모양으로 만든 새연교',
      '고깃배가 정박한 서귀포항과 새연교',
      '새섬으로 이어지는 새연교 보행로'
    ],
    shortDesc: '서귀포항과 작은 섬 새섬을 잇는 보행 다리로, 제주 전통 뗏목 "테우"를 본뜬 모양과 밤의 화려한 조명이 아름다운 야경 명소입니다.',
    fullDesc: '새연교는 "새섬과 연결하는 다리"라는 뜻으로, 서귀포항에서 바로 앞 무인도 새섬까지 걸어서 건널 수 있도록 놓인 다리입니다. 제주의 전통 뗏목인 테우를 형상화한 돛 모양 주탑이 특징이며, 해가 지면 다리 전체에 조명이 들어와 서귀포 밤바다를 화려하게 밝힙니다. 다리를 건너면 새섬 둘레를 따라 약 1km 남짓한 산책로가 이어져 바다를 보며 걷기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '제주특별자치도 서귀포시 서홍동 707-4',
    tip: '천지연폭포에서 걸어서 갈 수 있는 거리라 저녁에 두 곳을 이어서 둘러보기 좋습니다. 새섬 산책로는 야간에 출입이 제한될 수 있으니 확인하세요.',
    initialLikes: 0,
    initialComments: []
  }
];

CITIES_DATA.jeju = {
  id: 'jeju',
  name: '제주',
  badge: '제주편',
  pageTitle: '하루트립 제주 | 에메랄드 바다와 화산섬 제주 당일치기 여행 가이드',
  metaDesc: '제주 당일치기 A·B·C 코스! 애월 해안길, 협재해수욕장, 성산일출봉, 새연교 야경까지 한눈에.',
  heroPill: '🌴 전국 당일치기 여행 프로젝트 #5 · 신비로운 화산섬 제주',
  heroTitle: '에메랄드빛 바다와 신비로운 화산섬<br /><span class="highlight">제주 당일치기 완벽 여행</span>',
  heroSubtitle: '애월·협재의 투명한 바다부터 성산일출봉, 서귀포의 폭포와 밤바다까지!<br />A · B · C 맞춤 코스로 하루 만에 즐기는 제주의 자연과 낭만.',
  heroBg: 'img/jeju_hero_bg.jpg',
  storageKeyLikes: 'haru_trip_jeju_likes_v1',
  storageKeyComments: 'haru_trip_jeju_comments_v1',
  courses: COURSES_JEJU,
  destinations: DESTINATIONS_JEJU
};
