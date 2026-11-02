// 목포 당일치기 관광 여행지 & 코스 데이터베이스
const COURSES_DATA = [
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

const DESTINATIONS_DATA = [
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
      '목포의 개항과 일제강점기 저항의 역사를 품은 전시실',
      '앤틱한 창가와 고풍스러운 건축 디테일'
    ],
    shortDesc: '1900년 완공된 르네상스 건축양식의 국가사적지로, 드라마 <호텔 델루나>의 촬영지로도 유명한 목포 근대역사의 상징입니다.',
    fullDesc: '목포근대역사관 1관은 1897년 개항 이후 1900년에 건립된 서양식 벽돌조 건물로, 원형이 가장 잘 보존된 근대건축물 중 하나입니다. 붉은 벽돌과 독특한 문양, 당시의 벽난로와 건축 양식이 고스란히 남아있습니다. 내부에는 일제강점기 수탈과 목포 독립운동의 기록이 전시되어 있으며, 방공호와 일본군 유적지도 함께 둘러볼 수 있어 역사 교육과 감성 사진 촬영 모두를 만족시킵니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전라남도 목포시 영산로29번길 6',
    tip: '드라마 <호텔 델루나> 표지판이 있는 정문 계단에서 건물을 배경으로 찍으면 인생샷이 완성됩니다. 바로 옆 2관(구 동양척식주식회사)과 연계 관람을 추천합니다.',
    initialLikes: 254,
    initialComments: [
      {
        id: 1,
        author: '여행엔진심',
        rating: 5,
        date: '2026-10-24',
        text: '호텔 델루나 팬이라 찾아갔는데 건물 외관이 정말 웅장하고 멋집니다. 안쪽 방공호 터널 체험도 인상적이었어요.'
      },
      {
        id: 2,
        author: '모모',
        rating: 5,
        date: '2026-10-28',
        text: '역사적인 의미도 깊고, 건물 벽돌 색감이 사진에 너무 예쁘게 담겨요! 근대역사거리 산책과 함께하기 딱 좋습니다.'
      }
    ]
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
      '보리마당으로 이어지는 바다가 보이는 레트로 골목길',
      '주민 시인들과 화가들의 정겨운 시와 벽화',
      '영화 1987의 무대 연희네슈퍼와 옛 추억의 소품들'
    ],
    shortDesc: '영화 <1987>의 주요 촬영지인 연희네슈퍼와 목포 바다가 내려다보이는 비탈길을 따라 주민들의 시와 그림이 수놓아진 감성 골목입니다.',
    fullDesc: '유달산 아래 바닷가 비탈 마을인 서산동에 위치한 시화골목은 첫째길, 둘째길, 셋째길로 나뉘며, 골목골목 주민들의 애환과 삶이 담긴 자작시와 아기자기한 벽화가 이어집니다. 골목 입구의 연희네슈퍼는 1980년대 생활소품과 과자, 신문 등이 그대로 재현되어 있어 시간 여행을 떠난 듯한 기분을 선사합니다. 골목 끝 언덕의 보리마당에 서면 목포 앞바다와 선창이 시원하게 펼쳐집니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전라남도 목포시 보리마당로 14',
    tip: '편한 운동화를 추천하며, 골목 꼭대기 바보마당 갤러리 카페에서 바다를 보며 쉬어가는 것이 꿀팁입니다.',
    initialLikes: 198,
    initialComments: [
      {
        id: 1,
        author: '레트로매니아',
        rating: 5,
        date: '2026-10-15',
        text: '연희네슈퍼 앞에서 빨간 공중전화 들고 찍은 사진이 이번 여행 베스트샷입니다. 골목 계단 올라가며 읽는 시들도 따뜻했어요.'
      },
      {
        id: 2,
        author: '산책러버',
        rating: 4,
        date: '2026-10-29',
        text: '경사가 살짝 있지만 바다가 한눈에 내려다보이는 뷰가 모든 수고를 잊게 해줍니다!'
      }
    ]
  },
  {
    id: 'yudalsan_mountain',
    courseId: 'A',
    courseBadge: '코스 A',
    name: '유달산 노적봉 & 조각공원',
    engName: 'Yudalsan Nojeokbong & Sculpture Park',
    theme: '자연경관 / 파노라마 전망',
    tags: ['#노적봉', '#이순신호국유적', '#유달산전망', '#다도해파노라마'],
    images: [
      'img/yudalsan_mountain_1.jpg',
      'img/yudalsan_mountain_2.jpg',
      'img/yudalsan_mountain_3.jpg'
    ],
    imageCaptions: [
      '웅장한 기암괴석이 솟아있는 목포의 명산 유달산',
      '노적봉에서 내려다보는 목포 시가지와 푸른 바다',
      '국내 최초의 야외 조각공원과 숲길 산책로'
    ],
    shortDesc: '이순신 장군의 지혜가 서린 거대한 바위 노적봉과 목포 시내 및 다도해의 비경을 360도로 조망할 수 있는 목포의 영산(靈山)입니다.',
    fullDesc: '해발 228m의 유달산은 높지 않지만 웅장한 기암괴석과 바다 절경으로 "영혼이 쉬어가는 산"이라 불립니다. 유달산 초입의 노적봉은 임진왜란 당시 이순신 장군이 볏짚을 덮어 군량미처럼 보이게 위장하여 왜군을 물리친 호국의 역사가 깃든 곳입니다. 능선을 따라 오르면 다도해 해상케이블카가 머리 위를 지나가고, 유달산 조각공원에서는 자연과 예술이 어우러진 쉼터를 즐길 수 있습니다.',
    timeRecommended: '소요시간: 약 2시간',
    address: '전라남도 목포시 유달로 119',
    tip: '초입 정자나 마당바위까지만 가도 목포 시내와 오션뷰가 훌륭하므로 당일치기 일정에 맞춰 코스 길이를 조절하세요.',
    initialLikes: 312,
    initialComments: [
      {
        id: 1,
        author: '블루스카이',
        rating: 5,
        date: '2026-10-20',
        text: '마당바위에 서서 보는 목포 바다와 다도해 섬 풍경은 정말 가슴이 뻥 뚫리는 기분입니다!'
      }
    ]
  },

  // --- Course B ---
  {
    id: 'marine_cable_car',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '목포 해상케이블카 (북항-유달산-고하도)',
    engName: 'Mokpo Marine Cable Car',
    theme: '해양 액티비티 / 랜드마크',
    tags: ['#국내최장3.23km', '#크리스탈캐빈', '#바다위를가로지르는', '#목포필수코스'],
    images: [
      'img/marine_cable_car_1.jpg',
      'img/marine_cable_car_2.jpg',
      'img/marine_cable_car_3.jpg'
    ],
    imageCaptions: [
      '국내 최장 3.23km, 산과 바다를 횡단하는 케이블카',
      '크리스탈 캐빈 투명 유리바닥 아래로 펼쳐지는 에메랄드빛 바다',
      '노을빛에 물드는 해상 케이블카와 목포대교의 황홀한 뷰'
    ],
    shortDesc: '총 길이 3.23km, 주탑 높이 155m의 국내 최장 해상케이블카로 북항에서 유달산을 넘어 고하도까지 압도적인 바다 위 스릴을 선사합니다.',
    fullDesc: '목포 해상케이블카는 산(유달산)과 바다를 동시에 건너는 독보적인 코스를 자랑합니다. 바닥이 투명 강화유리로 된 크리스탈 캐빈을 타면 발밑으로 아찔한 바다와 선박의 항해가 생생하게 펼쳐집니다. 북항 스테이션에서 출발해 유달산 정상부를 거쳐 고하도에 이르는 동안 목포 구도심, 신도심, 다도해의 점점이 떠 있는 섬들까지 파노라마 뷰를 만끽할 수 있습니다.',
    timeRecommended: '소요시간: 왕복 탑승 약 40분 (관람 포함 2시간)',
    address: '전라남도 목포시 해양대학로 110 (북항스테이션)',
    tip: '바닥이 투명한 크리스탈 캐빈 탑승을 강력 추천하며, 늦은 오후에 탑승하면 갈 때는 낮 풍경, 올 때는 황금빛 석양을 모두 즐길 수 있습니다.',
    initialLikes: 489,
    initialComments: [
      {
        id: 1,
        author: '하늘바람',
        rating: 5,
        date: '2026-10-25',
        text: '살면서 타본 케이블카 중 단연 최고였습니다. 높이도 상당하고 바다 건널 때 개방감이 환상적이에요!'
      },
      {
        id: 2,
        author: '바다사랑',
        rating: 5,
        date: '2026-10-30',
        text: '부모님 모시고 다녀왔는데 두 분 다 너무 만족하셨습니다. 크리스탈 캐빈 꼭 타세요!'
      }
    ]
  },
  {
    id: 'gohado_trail',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '고하도 전망대 & 해안데크 둘레길',
    engName: 'Gohado Observatory & Coastal Deck',
    theme: '자연힐링 / 트레킹',
    tags: ['#판옥선전망대', '#바다위해안데크', '#힐링로드', '#이순신역사'],
    images: [
      'img/gohado_trail_1.jpg',
      'img/gohado_trail_2.jpg',
      'img/gohado_trail_3.jpg'
    ],
    imageCaptions: [
      '바다 바로 위를 걸을 수 있도록 조성된 투명 해안데크길',
      '기암절벽과 철썩이는 파도를 곁에 둔 해안 산책로',
      '이순신 장군의 13척 판옥선을 모티브로 건축된 독특한 고하도 전망대'
    ],
    shortDesc: '이순신 장군의 판옥선을 층층이 쌓아올린 독특한 전망대와 바다 위를 걸으며 해식애와 파도를 즐기는 힐링 해안데크길입니다.',
    fullDesc: '케이블카 고하도 승강장에서 숲길을 따라 10분 정도 걸어가면 충무공 이순신의 판옥선을 모티브로 디자인된 웅장한 고하도 전망대를 만납니다. 전망대 아래로는 바다 수면 위에 조성된 해안데크길(길이 약 1.8km)이 연결되어 있어, 깎아지른 해안 절벽과 맑은 파도를 바로 곁에서 느끼며 산책할 수 있습니다. 길 중간중간 스카이워크 구간과 포토존이 마련되어 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분',
    address: '전라남도 목포시 고하도안길 234',
    tip: '전망대 1층 카페에서 시원한 음료를 테이크아웃해 해안데크길을 걸으면 지상낙원이 따로 없습니다.',
    initialLikes: 276,
    initialComments: [
      {
        id: 1,
        author: '솔바람',
        rating: 5,
        date: '2026-10-18',
        text: '바다 바로 위를 걷는 해안데크길이 정말 걷기 편하고 바람이 시원합니다. 전망대 디자인도 독특해요!'
      }
    ]
  },
  {
    id: 'peace_square',
    courseId: 'B',
    courseBadge: '코스 B',
    name: '평화광장 & 춤추는 바다분수',
    engName: 'Peace Square & Dancing Sea Fountain',
    theme: '야경 / 문화광장',
    tags: ['#춤추는바다분수', '#음악분수쇼', '#목포핫플', '#밤바다산책'],
    images: [
      'img/peace_square_1.jpg',
      'img/peace_square_2.jpg',
      'img/peace_square_3.jpg'
    ],
    imageCaptions: [
      '화려한 조명과 레이저가 바다 위에서 춤추는 세계 최초 초대형 부체식 바다분수',
      '바다를 따라 길게 뻗은 평화광장의 산책로와 카페거리',
      '웅장한 음악과 함께 하늘 높이 치솟는 물줄기'
    ],
    shortDesc: '세계 최초의 초대형 부체식 음악분수가 바다 위에서 화려한 레이저쇼를 선보이며, 활기찬 야간 산책과 버스킹을 즐길 수 있는 힐링 명소입니다.',
    fullDesc: '목포 하당 신도심에 위치한 평화광장은 목포 시민과 여행자들이 가장 사랑하는 친수 공간입니다. 바다 앞 광장에서는 세계 최대 규모의 해상 음악분수인 "춤추는 바다분수"가 매일 밤 음악, 분수, 조명, 레이저, 워터스크린 영상이 어우러진 화려한 미디어 쇼를 선사합니다. 광장 뒤편으로는 트렌디한 오션뷰 카페와 남도 맛집들이 줄지어 있어 저녁 식사와 산책에 완벽합니다.',
    timeRecommended: '소요시간: 약 1시간 (분수쇼 관람 20분)',
    address: '전라남도 목포시 평화로 82',
    tip: '춤추는 바다분수는 계절별로 공연 시간이 상이하므로 방문 전 시작 시간(통상 화~일 저녁 8시, 8시 30분)을 미리 체크하세요.',
    initialLikes: 341,
    initialComments: [
      {
        id: 1,
        author: '야경헌터',
        rating: 5,
        date: '2026-10-26',
        text: '바다 위에서 뿜어져 나오는 분수 스케일이 기대 이상이었습니다. 사연 신청하면 분수쇼에 띄워주는 이벤트도 로맨틱해요.'
      }
    ]
  },

  // --- Course C ---
  {
    id: 'gourmet_market',
    courseId: 'C',
    courseBadge: '코스 C',
    name: '목포 전통 미식거리 (동부시장 & 항동시장)',
    engName: 'Mokpo Traditional Gourmet Food Market',
    theme: '남도 미식 / 전통시장',
    tags: ['#목포9미', '#낙지탕탕이', '#민어회', '#홍어삼합', '#게살비빔밥'],
    images: [
      'img/gourmet_market_1.jpg',
      'img/gourmet_market_2.jpg',
      'img/gourmet_market_3.jpg'
    ],
    imageCaptions: [
      '목포의 활기와 정이 넘쳐나는 동부시장의 미식 골목',
      '신선한 뻘낙지와 참기름의 조화, 낙지탕탕이 한상',
      '목포 9미의 정수! 깊은 맛의 남도 반찬과 해산물 향연'
    ],
    shortDesc: '목포 9미(낙지탕탕이, 민어회, 홍어삼합, 게살비빔밥, 갈치조림 등)를 가장 신선하고 푸짐하게 맛볼 수 있는 남도 미식의 성지입니다.',
    fullDesc: '맛의 도시 목포 여행에서 결코 빠질 수 없는 필수 코스는 바로 전통시장과 미식거리입니다. 목포 최대 규모의 동부시장과 바닷가 선창 인근 항동시장에서는 청정 서해 갯벌에서 갓 잡은 싱싱한 세발낙지 탕탕이, 부드럽고 담백한 여름 보양식 민어회, 알싸한 흑산도 홍어와 묵은지의 조합 홍어삼합, 달콤매콤한 밥도둑 꽃게살 비빔밥을 합리적인 가격에 맛볼 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분 (식사 포함)',
    address: '전라남도 목포시 산정로 174 (동부시장)',
    tip: '목포의 식당은 밑반찬만 10가지가 넘게 나오는 푸짐한 인심이 특징입니다. 2인 이상이라면 꽃게무침과 낙지호롱 구이를 곁들여보세요!',
    initialLikes: 412,
    initialComments: [
      {
        id: 1,
        author: '미식가김선생',
        rating: 5,
        date: '2026-10-22',
        text: '꽃게살비빔밥과 낙지탕탕이는 정말 목포에 와야만 이 맛을 느낄 수 있습니다. 밑반찬 젓갈 하나까지 감칠맛 폭발!'
      },
      {
        id: 2,
        author: '맛있는인생',
        rating: 5,
        date: '2026-10-27',
        text: '시장 상인분들도 정말 친절하시고 활기가 넘쳐서 먹는 즐거움이 두 배였습니다.'
      }
    ]
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
      'img/skywalk_2.jpg',
      'img/skywalk_3.jpg'
    ],
    imageCaptions: [
      '유달유원지 앞바다로 길게 뻗은 아찔한 해상 스카이워크',
      '발아래로 부서지는 파도가 훤히 들여다보이는 투명 유리바닥',
      '석양 무렵 붉은 노을과 어우러지는 환상적인 실루엣'
    ],
    shortDesc: '바다 위 15m 상공에서 목포 앞바다와 웅장한 목포대교를 가장 가까이 마주하며 바다 위를 걷는 듯한 짜릿한 감동을 선사합니다.',
    fullDesc: '유달유원지 대반동 해변에 위치한 목포 해상스카이워크는 바다 위로 총 54m가 뻗어 나와 있는 전망 시설입니다. 상공 12~15m 높이에서 투명 강화유리와 스틸 그레이팅 바닥을 걸으며 마치 바다 위를 걷는 듯한 짜릿함을 느낄 수 있습니다. 정면으로는 장엄한 사장교 목포대교와 고하도가 그림처럼 펼쳐지며, 일몰 시간대에는 황금빛 노을이 스카이워크를 물들입니다.',
    timeRecommended: '소요시간: 약 45분',
    address: '전라남도 목포시 해양대학로 59',
    tip: '스카이워크 끝자락에서 목포대교를 등지고 찍는 인생샷이 가장 유명합니다. 덧신 착용 후 무료로 이용할 수 있습니다.',
    initialLikes: 358,
    initialComments: [
      {
        id: 1,
        author: '바다바람소리',
        rating: 5,
        date: '2026-10-29',
        text: '유리바닥 아래로 파도치는 게 보여서 스릴 넘쳐요! 여기서 보는 목포대교 모습이 제일 멋집니다.'
      }
    ]
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
      '다도해 너머로 하루를 마감하는 대반동의 붉은 노을 장관',
      '화려한 LED 조명으로 빛나는 4.1km 사장교 목포대교 야경',
      '파도 소리를 들으며 맥주 한 잔을 기울이는 대반동 밤거리'
    ],
    shortDesc: '목포 당일치기 여행의 완벽한 피날레! 황홀한 다도해 낙조와 불을 밝힌 목포대교를 바라보며 해변 카페와 낭만 포차를 즐기는 곳입니다.',
    fullDesc: '대반동 유달유원지는 목포 시민과 여행자들이 입을 모아 손꼽는 최고의 노을 및 야경 스팟입니다. 일몰 무렵이면 다도해 수평선과 고하도 너머로 하늘이 분홍빛과 붉은빛으로 타오르고, 어둠이 깔리면 총연장 4.13km의 사장교인 목포대교 주탑에 오색 조명이 켜지며 장관을 연출합니다. 해안가를 따라 분위기 좋은 오션뷰 루프탑 카페와 목포 해산물 포차들이 늘어서 있어 낭만적인 밤을 만끽할 수 있습니다.',
    timeRecommended: '소요시간: 약 1시간 30분~2시간',
    address: '전라남도 목포시 해양대학로 57',
    tip: '해 지기 30분 전에 도착해 노을이 야경으로 바뀌는 매직아워(Magic Hour)를 즐기는 것이 당일치기 여행의 가장 로맨틱한 방법입니다.',
    initialLikes: 521,
    initialComments: [
      {
        id: 1,
        author: '선셋홀릭',
        rating: 5,
        date: '2026-10-31',
        text: '목포 여행의 하이라이트였습니다. 노을 질 때 대반동 테라스에서 바라보는 목포대교는 잊지 못할 풍경이에요.'
      },
      {
        id: 2,
        author: '낭만청춘',
        rating: 5,
        date: '2026-11-01',
        text: '밤바람 맞으며 버스킹 음악 듣고 포차에서 해물라면에 맥주 한 잔 하니 당일치기 피로가 싹 가십니다!'
      }
    ]
  }
];

// 향후 전국 확장을 위한 지역 메타데이터 (확장성)
const REGIONS_DATA = [
  { id: 'mokpo', name: '목포', tag: '낭만과 근대역사', active: true, count: 9 },
  { id: 'busan', name: '부산', tag: '푸른 해운대 & 광안리', active: false, badge: 'Coming Soon', count: '준비중' },
  { id: 'gangneung', name: '강릉', tag: '커피거리 & 동해안 솔향', active: false, badge: 'Coming Soon', count: '준비중' },
  { id: 'jeonju', name: '전주', tag: '한옥마을 & 조선왕조의 숨결', active: false, badge: 'Coming Soon', count: '준비중' },
  { id: 'jeju', name: '제주', tag: '신비로운 에메랄드 섬', active: false, badge: 'Coming Soon', count: '준비중' },
  { id: 'yeosu', name: '여수', tag: '여수 밤바다 & 낭만포차', active: false, badge: 'Coming Soon', count: '준비중' }
];
