// ========================================================
// 하루트립 (HARU TRIP) - 전국 당일치기 여행 데이터베이스
// [목포편] & [부산편]
// ========================================================

// --------------------------------------------------------
// 1. 목포 (Mokpo) 코스 & 명소 데이터
// --------------------------------------------------------
const COURSES_MOKPO = [
  {
    id: 'A',
    badge: '코스 A',
    title: '근대역사 & 레트로 문화 탐방 코스',
    subtitle: '100년 전 과거로 떠나는 시간 여행과 목포 고유의 레트로 감성',
    highlight: '목포의 옛 정취와 영화·드라마 명장면 속으로',
    duration: '약 5~6시간',
    distance: '약 4.2 km',
    color: '#3B82F6',
    icon: '🏛️',
    destinations: ['modern_history_hall', 'seosandong_mural', 'yudalsan_mountain']
  },
  {
    id: 'B',
    badge: '코스 B',
    title: '해양 힐링 & 파노라마 오션뷰 코스',
    subtitle: '국내 최장 해상케이블카를 타고 다도해의 푸른 물결을 마주하는 여정',
    highlight: '산과 바다, 섬을 하나로 잇는 압도적 절경',
    duration: '약 6~7시간',
    distance: '약 8.5 km',
    color: '#06B6D4',
    icon: '🚡',
    destinations: ['marine_cable_car', 'gohado_trail', 'peace_square']
  },
  {
    id: 'C',
    badge: '코스 C',
    title: '남도 미식 & 로맨틱 선셋/야경 코스',
    subtitle: '목포 9미(味)의 깊은 손맛과 대반동 노을, 목포대교의 화려한 밤바다',
    highlight: '입안 가득 번지는 남도의 풍미와 낭만 야경',
    duration: '약 5~6시간',
    distance: '약 6.0 km',
    color: '#F59E0B',
    icon: '✨',
    destinations: ['gourmet_market', 'skywalk', 'mokpodaegyo_night']
  }
];

const DESTINATIONS_MOKPO = [
  // --- Course A ---
  {
    id: 'modern_history_hall',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '목포근대역사관 1관 (구 목포일본영사관)',
    engName: 'Mokpo Modern History Hall No.1',
    theme: '근대역사 / 건축문화',
    tags: ['#호텔델루나촬영지', '#근대문화유산', '#붉은벽돌건물', '#역사포토존'],
    images: [
      'img/modern_history_hall_1.jpg',
      'img/modern_history_hall_2.jpg',
      'img/modern_history_hall_3.jpg'
    ],
    imageCaptions: [
      '1900년에 건립된 르네상스 양식의 붉은 벽돌 외관',
      '목포의 개항과 근대 역사를 소개하는 전시실',
      '계단 위로 올려다본 옛 영사관 건물'
    ],
    shortDesc: '1900년 완공된 르네상스 건축양식의 국가사적지로, 드라마 <호텔 델루나>의 촬영지로도 유명한 목포 근대역사의 상징입니다.',
    fullDesc: '목포근대역사관 1관은 1897년 개항 이후 1900년에 건립된 서양식 벽돌조 건물로, 원형이 가장 잘 보존된 근대건축물 중 하나입니다. 붉은 벽돌과 독특한 문양, 당시의 벽난로와 건축 양식이 고스란히 남아있습니다. 내부에는 일제강점기 수탈과 목포 독립운동의 기록이 전시되어 있으며, 방공호와 일본군 유적지도 함께 둘러볼 수 있어 역사 교육과 감성 사진 촬영 모두를 만족시킵니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전라남도 목포시 영산로29번길 6',
    tip: '드라마 <호텔 델루나> 표지판이 있는 정문 계단에서 건물을 배경으로 찍으면 인생샷이 완성됩니다. 바로 옆 2관(구 동양척식주식회사)과 연계 관람을 추천합니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'seosandong_mural',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '서산동 시화골목 & 연희네슈퍼',
    engName: 'Seosandong Poet & Mural Village',
    theme: '레트로 감성 / 골목여행',
    tags: ['#영화1987촬영지', '#시화골목', '#연희네슈퍼', '#바다보이는골목'],
    images: [
      'img/seosandong_mural_1.jpg',
      'img/seosandong_mural_2.jpg',
      'img/seosandong_mural_3.jpg'
    ],
    imageCaptions: [
      '유달산 바위 아래 언덕을 따라 들어선 원도심 주택가',
      '목포 골목 담벼락에서 만나는 벽화',
      '언덕 위에서 내려다본 목포 원도심'
    ],
    shortDesc: '영화 <1987> 촬영지인 연희네슈퍼와 옛 골목길에 피어난 따스한 시(詩)와 벽화가 있는 목포의 대표 레트로 감성 마을입니다.',
    fullDesc: '목포 유달산 자락 서산동에 위치한 시화골목은 목포 어민들의 삶의 터전이었던 곳으로, 좁은 비탈길을 따라 1980년대 옛 정취가 고스란히 남아있습니다. 영화 <1987>에서 주인공 연희가 살던 "연희네슈퍼"가 원형 그대로 보존되어 당시 문구류와 잡화들을 구경할 수 있습니다. 언덕을 오르며 만나는 아기자기한 시화와 벽화, 그리고 정상 부근 "보리마당"에서 내려다보는 목포 앞바다 전경이 가슴을 뻥 뚫리게 합니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전라남도 목포시 보리마당로 14',
    tip: '연희네슈퍼 앞 평상과 공중전화 부스에서 복고풍 포즈로 사진을 찍어보세요. 오르막길이 있으니 편안한 신발을 추천합니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'yudalsan_mountain',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '유달산 공원 & 노적봉',
    engName: 'Yudalsan Mountain & Nojeokbong',
    theme: '자연경관 / 역사유적',
    tags: ['#목포의영산', '#노적봉이순신', '#다도해파노라마', '#유달산일등바위'],
    images: [
      'img/yudalsan_mountain_1.jpg',
      'img/yudalsan_mountain_2.jpg',
      'img/yudalsan_mountain_3.jpg'
    ],
    imageCaptions: [
      '기암괴석 봉우리와 정자가 어우러진 유달산',
      '이순신 장군의 지혜가 서려 있는 거대한 바위 노적봉',
      '유달산 바위 위에서 내려다본 목포 시가지'
    ],
    shortDesc: '목포의 기상이 서린 영산으로, 이순신 장군의 지혜가 담긴 노적봉과 다도해의 올망졸망한 섬들을 파노라마로 굽어볼 수 있습니다.',
    fullDesc: '해발 228m의 유달산은 높지 않지만 웅장한 기암괴석과 빼어난 경관을 자랑하는 목포의 상징입니다. 입구에 위치한 노적봉은 임진왜란 당시 이순신 장군이 군량미를 쌓아둔 것처럼 위장하여 왜군을 물리쳤다는 역사적 일화로 유명합니다. 잘 정비된 등산로와 데크길을 따라 1등바위, 2등바위에 오르면 목포 도심과 영산강 하구, 푸른 다도해가 시원하게 펼쳐집니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '전라남도 목포시 유달산길 118',
    tip: '정상까지 가지 않아도 노적봉 마당과 달성각 쉼터 주변에서 충분히 멋진 목포 전경을 감상할 수 있습니다. 봄에는 꽃축제가 열립니다.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course B ---
  {
    id: 'marine_cable_car',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '목포해상케이블카 (북항~유달산~고하도)',
    engName: 'Mokpo Marine Cable Car',
    theme: '랜드마크 / 해양 액티비티',
    tags: ['#국내최장케이블카', '#크리스탈캐빈', '#바다위를가로지르는스릴', '#압도적오션뷰'],
    images: [
      'img/marine_cable_car_1.jpg',
      'img/marine_cable_car_2.jpg',
      'img/marine_cable_car_3.jpg'
    ],
    imageCaptions: [
      '해 질 녘 바다 위를 지나는 목포해상케이블카',
      '바다와 섬 사이를 건너는 케이블카 캐빈',
      '노을빛에 물든 목포대교와 다도해'
    ],
    shortDesc: '총연장 3.23km, 최고 높이 155m! 산과 바다, 섬을 관통하며 다도해의 숨 막히는 비경을 하늘 위에서 감상하는 압도적 어트랙션입니다.',
    fullDesc: '목포해상케이블카는 북항스테이션을 출발해 유달산 정상 유달스테이션을 거쳐 바다를 건너 고하도스테이션에 도달하는 국내 최장(3.23km)의 해상 케이블카입니다. 바다 위를 가로지르는 지주 타워 높이만 155m에 달해 짜릿한 스릴을 선사합니다. 바닥이 투명한 크리스탈 캐빈을 타면 발밑으로 파도가 넘실대는 광경을 그대로 볼 수 있으며, 목포 시가지와 유달산 기암절벽, 목포대교, 다도해 섬들이 360도 파노라마로 펼쳐집니다.',
    timeRecommended: '소요시간: 왕복 탑승 및 관람 약 2시간 30분',
    address: '전라남도 목포시 해양대학로 110 (북항 승강장)',
    tip: '노을 지는 골든아워(일몰 40분 전)에 탑승하면 황금빛 바다와 반짝이는 목포대교 야경을 동시에 누릴 수 있는 인생 순간을 만날 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'gohado_trail',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '고하도 해상데크길 & 판옥선 전망대',
    engName: 'Gohado Coastal Trail & Observatory',
    theme: '해안 힐링 트레킹 / 이색 건축',
    tags: ['#바다위해상데크', '#판옥선전망대', '#용머리포토존', '#기암절벽오션뷰'],
    images: [
      'img/gohado_trail_1.jpg',
      'img/gohado_trail_2.jpg',
      'img/gohado_trail_3.jpg'
    ],
    imageCaptions: [
      '목포대교를 바라보며 걷는 고하도 해상데크길',
      '숲 너머로 보이는 판옥선 전망대',
      '용머리 끝자락에서 올려다본 목포대교'
    ],
    shortDesc: '기암절벽과 바다 물결 사이를 걸으며 판옥선 모양의 독창적인 전망대와 용머리 해안 절경을 마주하는 힐링 트레킹 코스입니다.',
    fullDesc: '케이블카 고하도 승강장에서 숲길을 지나 내려오면 바다 위에 길게 놓인 1.8km의 해상데크길을 만날 수 있습니다. 한쪽에는 수천만 년 풍화작용이 빚어낸 기암괴석이, 다른 한쪽에는 시원한 바다가 펼쳐져 파도 소리를 들으며 걷기에 제격입니다. 코스 중간에는 이순신 장군의 판옥선 13척을 현대적으로 형상화한 24m 높이의 독특한 목조 전망대가 우뚝 솟아 있어 사방의 절경을 한눈에 담을 수 있습니다.',
    timeRecommended: '소요시간: 왕복 약 1시간 30분',
    address: '전라남도 목포시 고하도안길 234',
    tip: '케이블카를 타고 고하도역에서 내려 바로 연결됩니다. 바람이 시원하게 부니 겉옷을 챙기시고, 편안한 운동화는 필수입니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'peace_square',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '평화광장 & 춤추는 바다분수',
    engName: 'Peace Square & Dancing Sea Fountain',
    theme: '수변 힐링 / 야간 미디어쇼',
    tags: ['#춤추는바다분수', '#평화광장산책로', '#목포밤바다', '#해변카페거리'],
    images: [
      'img/peace_square_1.jpg',
      'img/peace_square_2.jpg',
      'img/peace_square_3.jpg'
    ],
    imageCaptions: [
      '빛과 음악이 어우러진 춤추는 바다분수 야간 공연',
      '바다를 따라 시원하게 뻗은 평화광장 산책로',
      '평화광장 앞으로 펼쳐진 영산강 하구 바다'
    ],
    shortDesc: '세계 최초 초대형 해상 부유식 음악분수의 화려한 연출과 시원한 바다 산책로, 다양한 오션뷰 카페가 모여있는 목포의 대표 휴식처입니다.',
    fullDesc: '평화광장은 하당 신도심 바닷가를 따라 조성된 목포 시민과 여행자들의 열린 쉼터입니다. 탁 트인 바다 전망을 따라 조깅과 산책을 즐길 수 있으며, 광장 앞바다에 설치된 "춤추는 바다분수"는 수막 영상과 레이저, 조명, 분수 물줄기가 최신 음악에 맞춰 역동적으로 춤을 추는 환상적인 해상 멀티미디어 쇼를 선보입니다. 인근에는 갓바위 해상보행교와 맛집 거리도 이어집니다.',
    timeRecommended: '소요시간: 약 1시간',
    address: '전라남도 목포시 평화로 82',
    tip: '바다분수 공연은 계절별 야간 지정 시간에 맞춰 운영됩니다. 광장 벤치나 인근 오션뷰 카페 테라스에서 커피 한잔과 함께 관람해 보세요.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Course C ---
  {
    id: 'gourmet_market',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '목포 동부시장 & 남도 9미 맛집 탐방',
    engName: 'Dongbu Traditional Market & Mokpo 9 Delicacies',
    theme: '로컬 미식 / 전통시장',
    tags: ['#목포9미', '#꽃게살비빔밥', '#낙지탕탕이', '#홍어삼합', '#동부시장'],
    images: [
      'img/gourmet_market_1.jpg',
      'img/gourmet_market_2.jpg',
      'img/gourmet_market_3.jpg'
    ],
    imageCaptions: [
      '활기 넘치는 목포 수산시장 풍경',
      '싱싱한 산낙지 요리',
      '남도의 손맛이 담긴 푸짐한 회 한상'
    ],
    shortDesc: '맛의 도시 목포의 진수! 매콤달콤한 꽃게살비빔밥, 기운 넘치는 낙지탕탕이, 민어회 등 남도 9미(味)를 오감으로 맛보는 미식 코스입니다.',
    fullDesc: '목포는 바다와 육지가 만나는 풍요로운 미식의 고장으로 "맛의 도시"로 공인받았습니다. 목포 최대 규모의 전통시장인 동부시장에서는 갓 잡은 싱싱한 제철 해산물과 떡, 닭강정 등 풍성한 먹거리가 넘쳐납니다. 특히 목포 9미로 꼽히는 꽃게무침과 꽃게살비빔밥, 갯벌의 산삼 세발낙지 탕탕이, 삭힌 홍어삼합, 여름 보양식 민어회는 오직 목포에서만 맛볼 수 있는 깊은 감칠맛을 자랑합니다.',
    timeRecommended: '소요시간: 식사 포함 약 1시간 30분',
    address: '전라남도 목포시 산정로 174',
    tip: '꽃게살비빔밥은 김가루와 참기름을 두른 밥에 게살 양념을 조금씩 비벼 김에 싸 먹으면 최고의 풍미를 느낄 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'skywalk',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '목포 해상스카이워크',
    engName: 'Mokpo Skywalk',
    theme: '오션뷰 / 전망 / 포토스팟',
    tags: ['#투명바닥스카이워크', '#바다위를걷는기분', '#목포대교뷰', '#노을명소'],
    images: [
      'img/skywalk_1.jpg',
      'img/skywalk_2.jpg'
    ],
    imageCaptions: [
      '스카이워크가 자리한 대반동 앞바다와 목포대교',
      '석양 무렵 붉은 노을 속 목포대교 실루엣'
    ],
    shortDesc: '바다 위 15m 상공에서 목포 앞바다와 웅장한 목포대교를 가장 가까이 마주하며 바다 위를 걷는 듯한 짜릿한 감동을 선사합니다.',
    fullDesc: '유달유원지 대반동 해변에 위치한 목포 해상스카이워크는 바다 위로 총 54m가 뻗어 나와 있는 전망 시설입니다. 상공 12~15m 높이에서 투명 강화유리와 스틸 그레이팅 바닥을 걸으며 마치 바다 위를 걷는 듯한 짜릿함을 느낄 수 있습니다. 정면으로는 장엄한 사장교 목포대교와 고하도가 그림처럼 펼쳐지며, 일몰 시간대에는 황금빛 노을이 스카이워크를 물들입니다.',
    timeRecommended: '소요시간: 약 45분',
    address: '전라남도 목포시 해양대학로 59',
    tip: '스카이워크 끝자락에서 목포대교를 등지고 찍는 인생샷이 가장 유명합니다. 덧신 착용 후 무료로 이용할 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'mokpodaegyo_night',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '대반동 유달유원지 & 목포대교 야경',
    engName: 'Daebandong & Mokpodaegyo Sunset and Nightscape',
    theme: '로맨틱 야경 / 카페 & 포차거리',
    tags: ['#목포대교야경', '#대반동노을', '#목포밤바다', '#해변오션뷰카페'],
    images: [
      'img/mokpodaegyo_night_1.jpg',
      'img/mokpodaegyo_night_2.jpg',
      'img/mokpodaegyo_night_3.jpg'
    ],
    imageCaptions: [
      '다도해 너머로 하루를 마감하는 붉은 노을',
      '화려한 조명으로 빛나는 목포대교 야경',
      '물 위에 비친 목포대교의 불빛'
    ],
    shortDesc: '목포 당일치기 여행의 완벽한 피날레! 황홀한 다도해 낙조와 불을 밝힌 목포대교를 바라보며 해변 카페와 낭만 포차를 즐기는 곳입니다.',
    fullDesc: '대반동 유달유원지는 목포 시민과 여행자들이 입을 모아 손꼽는 최고의 노을 및 야경 스팟입니다. 일몰 무렵이면 다도해 수평선과 고하도 너머로 하늘이 분홍빛과 붉은빛으로 타오르고, 어둠이 깔리면 총연장 4.13km의 사장교인 목포대교 주탑에 오색 조명이 켜지며 장관을 연출합니다. 해안가를 따라 분위기 좋은 오션뷰 루프탑 카페와 목포 해산물 포차들이 늘어서 있어 낭만적인 밤을 만끽할 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '전라남도 목포시 해양대학로 57',
    tip: '해 지기 30분 전에 도착해 노을이 야경으로 바뀌는 매직아워(Magic Hour)를 즐기는 것이 당일치기 여행의 가장 로맨틱한 방법입니다.',
    initialLikes: 0,
    initialComments: []
  }
];


// --------------------------------------------------------
// 2. 부산 (Busan) 코스 & 명소 데이터
// --------------------------------------------------------
const COURSES_BUSAN = [
  {
    id: 'A',
    badge: '코스 A',
    title: '블루라인 오션 & 해운대 낭만 코스',
    subtitle: '동해남부선 해안 레일을 따라 만나는 에메랄드빛 바다와 스카이캡슐',
    highlight: '하늘과 바다 사이를 달리는 낭만 캡슐과 청사포의 정취',
    duration: '약 5~6시간',
    distance: '약 6.8 km',
    color: '#3B82F6',
    icon: '🚃',
    destinations: ['haeundae_blueline', 'cheongsapo_skywalk', 'haeundae_beach']
  },
  {
    id: 'B',
    badge: '코스 B',
    title: '원도심 레트로 & 영도 흰여울 감성 코스',
    subtitle: '부산의 살아있는 역사와 절벽 위 산토리니 마을, 자갈치 시장의 활력',
    highlight: '푸른 영도 바다 절벽 골목과 부산 사람들의 따스한 정',
    duration: '약 6~7시간',
    distance: '약 7.5 km',
    color: '#06B6D4',
    icon: '🎨',
    destinations: ['huinnyeoul_culture_village', 'jagalchi_biff', 'gamcheon_culture_village']
  },
  {
    id: 'C',
    badge: '코스 C',
    title: '트렌디 오션라이프 & 광안대교 다이아몬드 야경 코스',
    subtitle: '젊음의 바다 광안리, 트렌디 복합공간 밀락더마켓과 환상적인 드론쇼',
    highlight: '다이아몬드 브릿지를 배경으로 즐기는 핫플레이스와 밤바다의 열기',
    duration: '약 5~6시간',
    distance: '약 5.2 km',
    color: '#F59E0B',
    icon: '🌉',
    destinations: ['gwangalli_beach', 'millac_the_market', 'gwangandaegyo_night']
  }
];

const DESTINATIONS_BUSAN = [
  // --- Busan Course A ---
  {
    id: 'haeundae_blueline',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '해운대 블루라인파크 & 스카이캡슐',
    engName: 'Haeundae Blueline Park & Sky Capsule',
    theme: '해안 관광열차 / 이색 액티비티',
    tags: ['#스카이캡슐', '#해운대해변열차', '#바다뷰열차', '#부산필수코스'],
    images: [
      'img/haeundae_blueline_1.jpg',
      'img/haeundae_blueline_2.jpg'
    ],
    imageCaptions: [
      '해운대 마천루를 배경으로 달리는 스카이캡슐',
      '옛 동해남부선 철길 건널목이 남아 있는 미포 거리'
    ],
    shortDesc: '옛 동해남부선 폐선 철로를 수려한 해안 절경을 따라 달리는 해변열차와 공중 레일 스카이캡슐로 재탄생시킨 부산의 대표 관광 명소입니다.',
    fullDesc: '해운대 블루라인파크는 해운대 미포에서 출발하여 달맞이터널, 청사포, 다릿돌전망대, 구덕포를 지나 송정에 이르는 4.8km 구간을 달리는 친환경 관광 철도입니다. 특히 7~10m 높이의 공중 레일을 시속 5km로 천천히 주행하는 4인승 "스카이캡슐"은 발아래로 넘실대는 동해 바다를 프라이빗하게 감상할 수 있어 국내외 여행자들에게 최고의 인기를 누리고 있습니다. 미포 정거장 주변의 세련된 카페와 함께 즐기기 좋습니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '부산광역시 해운대구 달맞이길62번길 13 (미포정거장)',
    tip: '스카이캡슐은 미포에서 청사포 방향(서→동)을 타면 바다 쪽 레일(외측)을 달려 더 넓은 오션뷰를 감상할 수 있습니다. 사전 온라인 예약은 필수입니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'cheongsapo_skywalk',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '청사포 다릿돌전망대 & 해안가',
    engName: 'Cheongsapo Daritdol Skywalk',
    theme: '해상 스카이워크 / 어촌 힐링',
    tags: ['#청사포다릿돌', '#유리바닥전망대', '#청사포쌍둥이등대', '#조개구이거리'],
    images: [
      'img/cheongsapo_skywalk_1.jpg'
    ],
    imageCaptions: [
      '빨간 등대가 서 있는 청사포구 풍경'
    ],
    shortDesc: '해수면 20m 위, 바다 쪽으로 길게 뻗은 스카이워크 위에서 청사포 맑은 바다와 해안 절경을 조망할 수 있는 힐링 명소입니다.',
    fullDesc: '청사포 다릿돌전망대는 청사포에서 송정 방향으로 뻗은 미포 철길 중간에 자리한 해상 전망 시설입니다. "다릿돌"은 청사포 해안에서 해상 암초까지 징검다리처럼 늘어선 암초군을 의미합니다. 끝자락의 반달형 유리바닥 위를 걸으면 마치 바다 위를 걷는 듯한 짜릿한 스릴을 경험할 수 있습니다. 산책 후에는 청사포 명물인 연탄불 조개구이나 오션뷰 감성 카페에서 여유를 만끽할 수 있습니다.',
    timeRecommended: '소요시간: 약 40분~1시간',
    address: '부산광역시 해운대구 중동 산3-9',
    tip: '바람이 강한 날에는 입장이 제한될 수 있으니 날씨를 체크하세요. 덧신을 신고 무료 입장하며, 일몰 시간대 석양이 어우러져 장관입니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'haeundae_beach',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '해운대 해수욕장 & 동백섬 누리마루',
    engName: 'Haeundae Beach & Dongbaekseom Island',
    theme: '명품 해변 / 해안 산책로',
    tags: ['#해운대해변', '#동백섬산책로', '#누리마루APEC하우스', '#마린시티뷰'],
    images: [
      'img/haeundae_beach_1.jpg',
      'img/haeundae_beach_2.jpg',
      'img/haeundae_beach_3.jpg'
    ],
    imageCaptions: [
      '파라솔이 줄지어 선 해운대 백사장',
      '동백섬 해안에서 바라본 마린시티 마천루',
      '해 질 녘 불이 켜지는 해운대 해변'
    ],
    shortDesc: '대한민국을 대표하는 백사장 해운대 해변과 울창한 해송 숲 사이로 광안대교를 조망하는 동백섬 해안 산책로입니다.',
    fullDesc: '해운대 해수욕장은 1.5km에 이르는 넓고 고운 모래사장과 맑은 바다가 조화를 이루는 명실상부 대한민국 최고의 해변입니다. 해변 서쪽 끝자락에 연결된 동백섬은 과거 섬이었으나 모래가 퇴적되어 육지와 이어진 육계도로, 동백나무와 해송 숲 사이로 잘 닦인 해안 데크로드가 조성되어 있습니다. 역대 정상들이 모였던 누리마루 APEC하우스와 광안대교, 오륙도가 한눈에 보이는 전망 포인트가 일품입니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '부산광역시 해운대구 우동 동백로 116',
    tip: '동백섬 해안 데크길을 따라 인어상과 등대 전망대를 거쳐 누리마루까지 걷는 코스를 추천합니다. 해운대 시장의 곰장어와 상국이네 떡볶이도 놓치지 마세요.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Busan Course B ---
  {
    id: 'huinnyeoul_culture_village',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '영도 흰여울문화마을 & 절영해안터널',
    engName: 'Huinnyeoul Culture Village & Coastal Tunnel',
    theme: '바다 절벽 마을 / 영화 촬영지',
    tags: ['#한국의산토리니', '#영화변호인촬영지', '#흰여울해안터널', '#오션뷰골목'],
    images: [
      'img/huinnyeoul_culture_village_1.jpg',
      'img/huinnyeoul_culture_village_2.jpg',
      'img/huinnyeoul_culture_village_3.jpg'
    ],
    imageCaptions: [
      '가파른 해안 절벽을 따라 옹기종기 모인 흰여울마을',
      '골목 계단 사이로 이어지는 마을 길',
      '절벽 아래로 이어진 해안 산책로'
    ],
    shortDesc: '봉래산 기슭 가파른 해안 절벽을 따라 바다를 내려다보며 걷는 한국의 산토리니이자 영화 <변호인>의 촬영지입니다.',
    fullDesc: '흰여울문화마을은 한국전쟁 당시 피란민들의 애환이 서린 벼랑 끝 동네에서 출발하여, 지금은 예술가들과 주민들이 함께 가꾼 부산 최고의 감성 명소입니다. 흰 담벼락과 파스텔톤 건물이 푸른 남항 바다와 어우러져 독특한 정취를 뽐내며, 골목마다 감성 소품샵과 오션뷰 테라스 카페가 가득합니다. 마을 아래 절영해안산책로로 내려가면 동굴 밖 바다를 배경으로 인생샷을 건질 수 있는 흰여울해안터널이 있습니다.',
    timeRecommended: '소요시간: 약 2시간',
    address: '부산광역시 영도구 절영로 194',
    tip: '흰여울해안터널은 터널 안쪽 어두운 곳에서 바깥 바다를 바라보는 역광 실루엣 샷이 가장 유명합니다. 계단이 많으므로 편한 운동화 착용을 권장합니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'jagalchi_biff',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '자갈치시장 & BIFF 광장 미식골목',
    engName: 'Jagalchi Fish Market & BIFF Square',
    theme: '전통 어시장 / 로컬 스트리트푸드',
    tags: ['#오이소보이소사이소', '#부산대표어시장', '#씨앗호떡', '#국제시장먹자골목'],
    images: [
      'img/jagalchi_biff_1.jpg',
      'img/jagalchi_biff_2.jpg',
      'img/jagalchi_biff_3.jpg'
    ],
    imageCaptions: [
      '싱싱한 생선이 가득한 자갈치시장 좌판',
      '해산물 가게가 늘어선 시장 안 풍경',
      '갈매기 날개 모양의 자갈치시장 건물'
    ],
    shortDesc: '"오이소, 보이소, 사이소!" 부산의 넘치는 활력을 오감으로 체감하는 대한민국 최대 수산시장과 영화의 거리 먹거리 탐방입니다.',
    fullDesc: '자갈치시장은 부산을 상징하는 대한민국 최대의 어시장으로, 자갈치 아지매들의 정겨운 사투리와 싱싱한 해산물이 가득한 삶의 현장입니다. 수산물센터 1층에서 직접 고른 활어를 2층 초장집에서 맛보거나, 시장 골목의 고등어구이·꼼장어 구이를 즐길 수 있습니다. 지하도를 건너면 만나는 BIFF(부산국제영화제) 광장은 핸드프린팅 거리와 함께 견과류가 듬뿍 들어간 원조 씨앗호떡, 비빔당면, 유부전골 등 부산 대표 길거리 음식을 맛볼 수 있는 미식 천국입니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '부산광역시 중구 자갈치해안로 52',
    tip: '자갈치시장 현대화 건물 옥상 "자갈치 하늘공원(전망대)"에 오르면 남항 바다와 영도대교, 부산타워를 360도로 무료 조망할 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'gamcheon_culture_village',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '감천문화마을 & 어린왕자 포토존',
    engName: 'Gamcheon Culture Village',
    theme: '계단식 예술마을 / 포토존',
    tags: ['#어린왕자와사막여우', '#한국의마추픽추', '#파스텔마을', '#부산도시재생'],
    images: [
      'img/gamcheon_culture_village_1.jpg',
      'img/gamcheon_culture_village_2.jpg',
      'img/gamcheon_culture_village_3.jpg'
    ],
    imageCaptions: [
      '산비탈을 따라 늘어선 파스텔톤 계단식 주택 전경',
      '알록달록한 지붕이 빼곡한 마을 풍경',
      '마을 곳곳에 숨은 예술 벽화'
    ],
    shortDesc: '산비탈을 따라 파스텔톤 집들이 층층이 늘어선 "한국의 마추픽추"! 어린왕자와 함께 마을과 바다를 내려다보는 인생 포토존입니다.',
    fullDesc: '감천문화마을은 1950년대 피란민들이 산비탈을 일구어 만든 계단식 마을입니다. 뒷집의 조망권을 가리지 않도록 질서 있게 지어진 독특한 계단식 주택 구조를 바탕으로, 예술가들과 주민들이 합심하여 골목 곳곳에 다채로운 벽화와 조형 예술 작품을 설치하며 세계적인 관광 명소로 탈바꿈했습니다. 특히 난간에 걸터앉아 마을을 바라보는 어린왕자와 사막여우 조각상은 전 세계 여행자들의 줄이 끊이지 않는 필수 인증샷 명소입니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '부산광역시 사하구 감내2로 203',
    tip: '마을 안내센터에서 스탬프 투어 지도를 구입하면 골목 구석구석 숨겨진 갤러리와 옥상 전망대를 효율적으로 탐방할 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },

  // --- Busan Course C ---
  {
    id: 'gwangalli_beach',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '광안리 해수욕장 & 테라스 카페거리',
    engName: 'Gwangalli Beach & Ocean Terrace Cafe Street',
    theme: '젊음의 해변 / 오션뷰 카페',
    tags: ['#광안리해변', '#광안대교정면뷰', '#오션뷰카페거리', '#SUP패들보드'],
    images: [
      'img/gwangalli_beach_1.jpg',
      'img/gwangalli_beach_2.jpg',
      'img/gwangalli_beach_3.jpg'
    ],
    imageCaptions: [
      '바다 한가운데 놓인 광안대교 정면 풍경',
      '해변을 따라 늘어선 건물과 광안리 바다',
      '해변에서 펼쳐지는 버스킹 공연'
    ],
    shortDesc: '정면으로 웅장한 광안대교가 펼쳐지는 도심형 해변! 해안도로를 따라 테라스 카페와 펍이 즐비한 젊음과 낭만의 성지입니다.',
    fullDesc: '광안리 해수욕장은 도심과 바다가 가장 조화롭게 맞닿아 있는 부산 대표 해변 중 하나입니다. 바다 한가운데를 가로지르는 광안대교의 전경이 가장 아름답게 정면으로 조망되며, 수질이 깨끗하고 백사장이 넓어 사계절 내내 활기가 넘칩니다. 해변가를 따라 통유리창 너머로 바다를 감상할 수 있는 감성 카페와 브런치 식당, 크래프트 맥주 펍들이 밀집해 있어 여유로운 오션라이프를 즐기기에 최적입니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '부산광역시 수영구 광안해변로 219',
    tip: '해변에 비치된 광안리 시그니처 조형물 앞과 백사장 모래사장에서 광안대교를 손바닥 위에 올려놓는 원근법 사진을 남겨보세요.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'millac_the_market',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '밀락더마켓 (Millac the Market)',
    engName: 'Millac The Market Complex Cultural Space',
    theme: '트렌디 복합문화공간 / 오션스탠드',
    tags: ['#밀락더마켓', '#오션뷰스탠드', '#부산핫플', '#실내복합문화공간'],
    images: [
      'img/millac_the_market_1.jpg',
      'img/millac_the_market_2.jpg',
      'img/millac_the_market_3.jpg'
    ],
    imageCaptions: [
      '통유리창 너머로 바다가 보이는 밀락더마켓 내부',
      '밤이 되면 조명이 켜지는 밀락더마켓',
      '사람들로 북적이는 복합문화공간'
    ],
    shortDesc: '광안리 민락항에 문을 연 초대형 복합문화공간! 대형 오션뷰 스탠드 계단에 앉아 맥주와 먹거리를 즐기며 문화를 만끽하는 핫플입니다.',
    fullDesc: '밀락더마켓은 옛 민락수변공원 인근에 붉은 벽돌 창고형 건축물로 조성된 부산 최고의 복합문화공간입니다. 지하 1층부터 지상 2층까지 약 7,700㎡ 규모로, 중앙의 거대한 "오션뷰 스탠드" 계단 좌석에 앉아 대형 통창 너머로 광안대교와 민락항 바다를 감상할 수 있습니다. 수제맥주, 도넛, 랍스터 샌드위치 등 다채로운 미식 F&B와 개성 넘치는 편집숍, 주기적인 버스킹 공연과 아트 전시가 열립니다.',
    timeRecommended: '소요시간: 약 1시간~1시간 30분',
    address: '부산광역시 수영구 민락수변로17번길 56',
    tip: '식음료 매장에서 음식을 테이크아웃해 오션뷰 스탠드 좌석에 자리를 잡으면 근사한 실내 오션뷰 피크닉을 즐길 수 있습니다.',
    initialLikes: 0,
    initialComments: []
  },
  {
    id: 'gwangandaegyo_night',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '광안대교 다이아몬드 야경 & M 드론라이트쇼',
    engName: 'Gwangandaegyo Diamond Bridge Nightscape & Drone Show',
    theme: '초대형 랜드마크 야경 / 드론 라이트쇼',
    tags: ['#광안대교야경', '#광안리드론쇼', '#부산밤바다', '#야경핫플레이스'],
    images: [
      'img/gwangandaegyo_night_1.jpg',
      'img/gwangandaegyo_night_2.jpg',
      'img/gwangandaegyo_night_3.jpg'
    ],
    imageCaptions: [
      '화려한 조명으로 빛나는 광안대교',
      '마천루와 함께 빛나는 광안대교 야경',
      '해 질 녘 광안대교와 해운대 마천루'
    ],
    shortDesc: '부산 당일치기 여행의 찬란한 대미! 7.42km 광안대교의 다이아몬드 조명 쇼와 매주 토요일 밤하늘을 수놓는 첨단 드론 라이트쇼입니다.',
    fullDesc: '광안대교는 총연장 7,420m의 바다 위 복층 교량으로, 밤이 되면 첨단 LED 조명 시스템이 10만 가지 이상의 색상을 연출하여 "다이아몬드 브릿지"라는 별칭으로 불립니다. 특히 광안리 해변에서 정면으로 바라보는 야경은 부산 여행의 정점으로 꼽힙니다. 매주 토요일 저녁에는 백사장에서 수백 대의 최첨단 드론이 음악에 맞춰 밤하늘에 입체적인 그림과 메시지를 그리는 "광안리 M 드론라이트쇼"가 열려 전 세계 관광객들의 감탄을 자아냅니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '부산광역시 수영구 광안해변로 219 (광안리 해변 일원)',
    tip: '매주 토요일 저녁(동절기 19시/21시, 하절기 20시/22시) 드론쇼가 열립니다. 시작 30분 전에 백사장 중앙에 돗자리를 펴고 관람하면 가장 좋습니다.',
    initialLikes: 0,
    initialComments: []
  }
];


// --------------------------------------------------------
// 3. 전국 도시 통합 사전 (CITIES_DATA)
// --------------------------------------------------------
const CITIES_DATA = {
  mokpo: {
    id: 'mokpo',
    name: '목포',
    emoji: '📍',
    badge: '목포편',
    pageTitle: '하루트립 목포 | 낭만과 역사의 항구도시 목포 당일치기 여행 가이드',
    metaDesc: '목포 당일치기 A·B·C 코스! 근대역사거리, 해상케이블카, 남도 9미, 목포대교 야경까지 한눈에.',
    heroPill: '✨ 전국 당일치기 여행 프로젝트 #1 · 항구도시 목포',
    heroTitle: '푸른 다도해와 100년 역사가 빚어낸<br /><span class="highlight">목포 당일치기 완벽 여행</span>',
    heroSubtitle: '취향 따라 선택하는 A · B · C 3가지 맞춤 테마 코스부터 로컬 찐명소까지!<br />아름다운 슬라이드 사진과 생생한 여행자 후기로 하루의 설렘을 완성해 보세요.',
    heroBg: 'img/hero_bg.jpg',
    map: { lat: 34.8118, lng: 126.3922 }, // 지역 선택 지도의 핀 위치
    storageKeyLikes: 'haru_trip_mokpo_likes_v1',
    storageKeyComments: 'haru_trip_mokpo_comments_v1',
    courses: COURSES_MOKPO,
    destinations: DESTINATIONS_MOKPO
  },
  busan: {
    id: 'busan',
    name: '부산',
    emoji: '🌊',
    badge: '부산편',
    pageTitle: '하루트립 부산 | 푸른 파도와 빛나는 마천루 부산 당일치기 여행 가이드',
    metaDesc: '부산 당일치기 A·B·C 코스! 블루라인파크, 흰여울마을, 감천문화마을, 광안대교 야경까지 한눈에.',
    heroPill: '🌊 전국 당일치기 여행 프로젝트 #2 · 해양수도 부산',
    heroTitle: '끝없이 펼쳐진 푸른 바다와 다채로운 매력<br /><span class="highlight">부산 당일치기 완벽 여행</span>',
    heroSubtitle: '해운대 스카이캡슐부터 절벽 위 흰여울마을, 황홀한 광안대교 야경까지!<br />A · B · C 맞춤 코스로 하루 만에 즐기는 부산의 낭만과 미식 여행.',
    heroBg: 'img/busan_hero_bg.jpg',
    map: { lat: 35.1796, lng: 129.0756 }, // 지역 선택 지도의 핀 위치
    storageKeyLikes: 'haru_trip_busan_likes_v1',
    storageKeyComments: 'haru_trip_busan_comments_v1',
    courses: COURSES_BUSAN,
    destinations: DESTINATIONS_BUSAN
  }
};

// 현재 선택된 도시 (첫 화면에서는 null — app.js 가 지역을 고르면 설정)
let currentCityId = null;

// 호환성을 위한 활성 데이터 포인터 (도시를 고르기 전에는 빈 배열)
let COURSES_DATA = [];
let DESTINATIONS_DATA = [];

// --------------------------------------------------------
// 4. 지역 선택 지도
// --------------------------------------------------------
// 지도 범위(경도·위도)와 가로 보정값(k = 위도 36° 부근의 cos 값).
// generate_map.js(지도 SVG)와 app.js(핀 위치)가 같은 값을 씁니다. 바꾸면 node generate_map.js 를 다시 실행하세요.
const MAP_BOUNDS = { lngMin: 124.6, lngMax: 132.2, latMin: 33.0, latMax: 38.75, k: 0.811 };

// 오픈 예정 도시: 지도에 흐리게 표시만 됩니다. 정식 오픈할 때 data_<도시>.js 를 만들고 여기서 지우세요.
const UPCOMING_CITIES = [
  { id: 'yeosu', name: '여수', emoji: '🌉', map: { lat: 34.7604, lng: 127.6622 } }
];
