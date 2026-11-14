// ========================================================
// HARU TRIP - English translation overlay for data*.js
// 한국어 원본(CITIES_DATA)을 불러온 뒤 이 파일을 실행하면 영어로 덮어씁니다.
//   - 키 구조: 도시 id → 도시 문구 / courses[코스 id] / destinations[명소 id]
//   - 비워 둔 필드는 한국어 원본이 그대로 남습니다.
//     (node generate_pages.js 가 번역이 빠진 필드를 경고로 알려 줍니다)
//   - 영어 페이지에서는 engName 자리에 한국어 원래 이름이 표시됩니다.
// ========================================================
const HARU_DATA_EN = {
  // ------------------------------------------------------ MOKPO
  mokpo: {
    name: 'Mokpo',
    badge: 'Mokpo',
    pageTitle: 'HARU TRIP Mokpo | A Day Trip Guide to Mokpo, the Romantic Historic Port City',
    metaDesc: 'Mokpo day trip in 4 courses: the modern history street, marine cable car, Mokpo Bridge at night and a food tour of skate, croaker and octopus.',
    heroPill: '✨ Korea Day Trip Project #1 · Mokpo, the port city',
    heroTitle: 'Shaped by a blue archipelago and 100 years of history<br /><span class="highlight">The Perfect Mokpo Day Trip</span>',
    heroSubtitle: 'From four themed A · B · C · D courses to local favorites only residents know!<br />Plan your day with photo slides and real traveler reviews.',
    courses: {
      A: { title: 'Modern History & Retro Culture Course', subtitle: 'A trip back 100 years and Mokpo\'s one-of-a-kind retro vibe', highlight: 'Old-town charm and famous film and drama scenes', duration: 'About 5–6 hours', distance: 'About 4.2 km' },
      B: { title: 'Ocean Healing & Panoramic Sea View Course', subtitle: 'Ride Korea\'s longest marine cable car over the blue archipelago', highlight: 'Breathtaking views linking mountain, sea and islands', duration: 'About 6–7 hours', distance: 'About 8.5 km' },
      C: { title: 'Southern Food & Romantic Sunset/Night Course', subtitle: 'Mokpo\'s 9 signature dishes, Daebandong sunsets and the glittering Mokpo Bridge', highlight: 'Rich southern flavors and a romantic night view', duration: 'About 5–6 hours', distance: 'About 6.0 km' },
      D: { title: 'Mokpo 9 Delicacies Food Tour Course', subtitle: 'Hongeo samhap at the fish market, summer mineo on Croaker Street and sebal nakji at Bukhang', highlight: 'A three-meal food trip through Korea\'s "City of Taste"', duration: 'About 5–6 hours (including meals)', distance: 'About 4.5 km' }
    },
    destinations: {
      modern_history_hall: {
        name: 'Mokpo Modern History Hall No.1 (Former Japanese Consulate)',
        theme: 'Modern history / Architecture',
        tags: ['#HotelDelLunaLocation', '#ModernHeritage', '#RedBrickBuilding', '#HistoricPhotoSpot'],
        imageCaptions: ['The red-brick Renaissance-style exterior built in 1900', 'Exhibition hall on Mokpo\'s port opening and modern history', 'The former consulate seen from the bottom of the stairs'],
        shortDesc: 'A national historic site in Renaissance style completed in 1900, famous as a filming location of the drama "Hotel del Luna" and a symbol of Mokpo\'s modern history.',
        fullDesc: 'Built in 1900, shortly after Mokpo opened its port in 1897, this Western-style brick building is one of the best-preserved modern structures in Korea. Its red brick, distinctive patterns and original fireplaces remain intact. Inside, exhibits document colonial-era exploitation and Mokpo\'s independence movement, and you can also visit an air-raid shelter and Japanese military remains — a place that satisfies both history lovers and photographers.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '6 Yeongsan-ro 29beon-gil, Mokpo, Jeollanam-do',
        tip: 'Take a photo from the front stairs where the "Hotel del Luna" sign stands. We recommend combining it with Hall No.2 (the former Oriental Development Company) right next door.'
      },
      seosandong_mural: {
        name: 'Seosandong Poetry & Mural Alley and Yeonhee\'s Supermarket',
        theme: 'Retro vibes / Alley walk',
        tags: ['#Film1987Location', '#PoetryAlley', '#YeonheeSupermarket', '#SeaViewAlley'],
        imageCaptions: ['Old-town houses climbing the hill below Yudalsan\'s rocks', 'A mural on an alley wall in Mokpo', 'Mokpo\'s old town seen from the hilltop'],
        shortDesc: 'Mokpo\'s signature retro village, home to Yeonhee\'s Supermarket from the film "1987" and old alleys decorated with warm poems and murals.',
        fullDesc: 'On the slopes of Yudalsan in Seosan-dong, this poetry alley was once home to Mokpo\'s fishing families, and its narrow hillside lanes still carry the feel of the 1980s. "Yeonhee\'s Supermarket," where the heroine of the film "1987" lived, is preserved as it was, with old stationery and sundries on display. Charming poems and murals line the climb, and the view of Mokpo\'s harbor from "Borimadang" near the top is wonderfully refreshing.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '14 Borimadang-ro, Mokpo, Jeollanam-do',
        tip: 'Strike a retro pose on the wooden bench and phone booth in front of Yeonhee\'s Supermarket. The lanes are steep, so wear comfortable shoes.'
      },
      yudalsan_mountain: {
        name: 'Yudalsan Park & Nojeokbong Peak',
        theme: 'Nature / Historic site',
        tags: ['#MokposSacredMountain', '#NojeokbongAdmiralYi', '#ArchipelagoPanorama', '#IldeungRock'],
        imageCaptions: ['Yudalsan\'s rocky peaks and pavilions', 'Nojeokbong, the giant rock linked to Admiral Yi Sun-sin\'s strategy', 'Downtown Mokpo seen from the rocks of Yudalsan'],
        shortDesc: 'Mokpo\'s sacred mountain, where you can see Nojeokbong — tied to Admiral Yi Sun-sin\'s clever strategy — and a panorama of the islands of the archipelago.',
        fullDesc: 'At just 228 m, Yudalsan is not tall, but its dramatic rock formations and views make it the symbol of Mokpo. Nojeokbong at the entrance is famous for a legend from the Imjin War: Admiral Yi Sun-sin disguised the rock as a giant pile of army rice to deceive the Japanese forces. Follow the well-kept trails and decks up to Ildeung Rock and Ideung Rock for sweeping views of downtown Mokpo, the Yeongsan River estuary and the blue archipelago.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: '118 Yudalsan-gil, Mokpo, Jeollanam-do',
        tip: 'You don\'t need to reach the summit — the area around Nojeokbong and the Dalseonggak rest area already offers great views of Mokpo. A flower festival is held in spring.'
      },
      marine_cable_car: {
        name: 'Mokpo Marine Cable Car (Bukhang–Yudalsan–Gohado)',
        theme: 'Landmark / Ocean activity',
        tags: ['#KoreasLongestCableCar', '#CrystalCabin', '#ThrillOverTheSea', '#EpicOceanView'],
        imageCaptions: ['The Mokpo Marine Cable Car crossing the sea at sunset', 'A cabin flying between sea and islands', 'Mokpo Bridge and the archipelago glowing at sunset'],
        shortDesc: '3.23 km long and up to 155 m high! A spectacular ride across mountain, sea and island with breathtaking views of the archipelago from above.',
        fullDesc: 'Starting at Bukhang Station, the cable car passes Yudal Station near the top of Yudalsan, then crosses the sea to Gohado Station — at 3.23 km, it is Korea\'s longest marine cable car. The tower over the sea alone stands 155 m tall for a real thrill. In a glass-floored Crystal Cabin you can watch the waves right beneath your feet, while downtown Mokpo, Yudalsan\'s cliffs, Mokpo Bridge and the islands unfold in a 360-degree panorama.',
        timeRecommended: 'Time needed: about 2.5 hours for a round trip and sightseeing',
        address: '110 Haeyangdaehak-ro, Mokpo, Jeollanam-do (Bukhang Station)',
        tip: 'Ride during golden hour (about 40 minutes before sunset) to catch both the golden sea and the sparkling lights of Mokpo Bridge.'
      },
      gohado_trail: {
        name: 'Gohado Coastal Deck Trail & Panokseon Observatory',
        theme: 'Coastal trekking / Unique architecture',
        tags: ['#DeckOverTheSea', '#PanokseonObservatory', '#DragonHeadPhotoSpot', '#CliffOceanView'],
        imageCaptions: ['Gohado deck trail with a view of Mokpo Bridge', 'The Panokseon Observatory beyond the forest', 'Mokpo Bridge seen from the tip of Yongmeori (Dragon Head)'],
        shortDesc: 'A healing coastal walk between rugged cliffs and waves, with a unique observatory shaped like Joseon warships and the scenic Dragon Head coast.',
        fullDesc: 'From the cable car\'s Gohado Station, a forest path leads down to a 1.8 km deck trail built over the sea. Rock formations carved by millions of years of weathering rise on one side and open sea stretches on the other — perfect for walking to the sound of the waves. Midway stands a striking 24 m wooden observatory inspired by Admiral Yi Sun-sin\'s 13 panokseon warships, offering views in every direction.',
        timeRecommended: 'Time needed: about 1.5 hours round trip',
        address: '234 Gohadoan-gil, Mokpo, Jeollanam-do',
        tip: 'The trail connects directly to the cable car\'s Gohado Station. It can be windy, so bring a jacket and comfortable sneakers.'
      },
      peace_square: {
        name: 'Peace Square & Dancing Sea Fountain',
        theme: 'Waterfront / Night media show',
        tags: ['#DancingSeaFountain', '#PeaceSquareWalk', '#MokpoNightSea', '#BeachCafeStreet'],
        imageCaptions: ['The Dancing Sea Fountain\'s night show of light and music', 'Peace Square\'s seaside promenade', 'The Yeongsan River estuary in front of Peace Square'],
        shortDesc: 'Mokpo\'s favorite place to relax, with a huge floating musical fountain show, a breezy seaside promenade and plenty of ocean-view cafés.',
        fullDesc: 'Peace Square is an open waterfront space along the coast of the new Hadang district, loved by locals and travelers alike. You can jog or stroll with wide-open sea views, and the "Dancing Sea Fountain" offshore puts on a spectacular multimedia show where water screens, lasers, lights and jets dance to music. The Gatbawi pedestrian bridge and a street of restaurants are nearby.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '82 Pyeonghwa-ro, Mokpo, Jeollanam-do',
        tip: 'Fountain shows run at set evening times that change by season. Watch from a bench on the square or the terrace of a nearby ocean-view café.'
      },
      gourmet_market: {
        name: 'Mokpo Dongbu Market & the 9 Delicacies of Mokpo',
        theme: 'Local food / Traditional market',
        tags: ['#Mokpo9Delicacies', '#CrabBibimbap', '#NakjiTangtangi', '#HongeoSamhap', '#DongbuMarket'],
        imageCaptions: ['A lively Mokpo seafood market', 'Fresh live octopus dish', 'A generous spread of southern-style raw fish'],
        shortDesc: 'The essence of Mokpo, the "City of Taste": sweet-and-spicy crab bibimbap, energizing chopped octopus, croaker sashimi and more of the 9 local delicacies.',
        fullDesc: 'Where land meets sea, Mokpo is officially recognized as a "City of Taste." At Dongbu Market, the city\'s largest traditional market, you\'ll find fresh seasonal seafood, rice cakes, sweet-and-crispy fried chicken and much more. Among the "9 Delicacies of Mokpo," seasoned crab and crab-meat bibimbap, nakji tangtangi made from tidal-flat octopus, fermented skate with pork and kimchi (hongeo samhap) and summer croaker sashimi offer flavors you can only truly enjoy here.',
        timeRecommended: 'Time needed: about 1.5 hours including a meal',
        address: '174 Sanjeong-ro, Mokpo, Jeollanam-do',
        tip: 'For crab bibimbap, mix a little crab sauce into rice with seaweed flakes and sesame oil, then wrap it in dried laver for the best flavor.'
      },
      skywalk: {
        name: 'Mokpo Marine Skywalk',
        theme: 'Ocean view / Observation / Photo spot',
        tags: ['#GlassFloorSkywalk', '#WalkOnTheSea', '#MokpoBridgeView', '#SunsetSpot'],
        imageCaptions: ['The sea off Daebandong and Mokpo Bridge, home of the skywalk', 'Mokpo Bridge silhouetted against a red sunset'],
        shortDesc: 'Walk 15 m above the water for a thrilling close-up view of Mokpo\'s harbor and the grand Mokpo Bridge — like walking on the sea.',
        fullDesc: 'Located on Daebandong beach in the Yudal resort area, the Mokpo Marine Skywalk stretches 54 m out over the sea. Walking 12–15 m above the water on tempered glass and steel grating feels like strolling on the sea itself. Straight ahead, the cable-stayed Mokpo Bridge and Gohado island spread out like a painting, and at sunset golden light floods the skywalk.',
        timeRecommended: 'Time needed: about 45 minutes',
        address: '59 Haeyangdaehak-ro, Mokpo, Jeollanam-do',
        tip: 'The most famous shot is taken at the end of the skywalk with Mokpo Bridge behind you. Entry is free — just put on the shoe covers provided.'
      },
      mokpodaegyo_night: {
        name: 'Daebandong Yudal Resort & Mokpo Bridge Night View',
        theme: 'Romantic night view / Cafés & food stalls',
        tags: ['#MokpoBridgeAtNight', '#DaebandongSunset', '#MokpoNightSea', '#BeachOceanViewCafe'],
        imageCaptions: ['A red sunset closing the day over the archipelago', 'Mokpo Bridge glowing with colorful lights', 'Mokpo Bridge\'s lights reflected on the water'],
        shortDesc: 'The perfect finale to a Mokpo day trip: watch the archipelago sunset and the illuminated Mokpo Bridge from beach cafés and cozy food stalls.',
        fullDesc: 'Locals and travelers agree that the Daebandong Yudal resort area is the best sunset and night-view spot in Mokpo. At dusk the sky over the archipelago and Gohado burns pink and red, and after dark the towers of the 4.13 km cable-stayed Mokpo Bridge light up in vivid colors. Stylish rooftop cafés and seafood food stalls line the shore for a romantic evening.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: '57 Haeyangdaehak-ro, Mokpo, Jeollanam-do',
        tip: 'Arrive 30 minutes before sunset and enjoy the "magic hour" as the sunset turns into a night view — the most romantic way to end your day trip.'
      },
      hongeo_fish_market: {
        name: 'Mokpo Fish Market & Hongeo Samhap',
        theme: 'Fish market / Skate dishes',
        tags: ['#HongeoSamhap', '#FermentedSkate', '#FishMarket', '#Mokpo9Delicacies'],
        imageCaptions: ['Mokpo Fish Market lined with skate shops', 'Hongeo samhap: fermented skate with boiled pork and aged kimchi', 'Sweet and tangy spicy skate salad'],
        shortDesc: 'A "holy ground" for skate where most shops specialize in hongeo — the place to try hongeo samhap, one of Mokpo\'s 9 signature dishes.',
        fullDesc: 'Mokpo Fish Market sits on Haean-ro facing Mokpo Port, and so many of its shops specialize in skate (hongeo) that the market is famous for it. Skate caught in the southwestern sea around Heuksando is fermented in jars to give it a sharp, pungent kick, then wrapped together with boiled pork and aged kimchi to make "hongeo samhap," the signature dish. If the fermented flavor sounds intimidating, start with lightly fermented skate sashimi or the sweet-and-tangy spicy skate salad. You can also browse dried seafood, salted fish and seasonal catches.',
        timeRecommended: 'Time needed: about 1.5 hours including a meal',
        address: '265-4 Haean-ro, Mokpo, Jeollanam-do',
        tip: 'Skate tastes very different depending on how long it\'s fermented, so ask for a "lightly fermented" one if it\'s your first time. Most shops can pack it to go or ship it.'
      },
      mineo_street: {
        name: 'Manho-dong Mineo (Croaker) Street',
        theme: 'Croaker restaurants / Summer stamina food',
        tags: ['#MineoSashimi', '#SummerStaminaFood', '#SwimBladder', '#OldTownEats'],
        imageCaptions: ['A generous spread centered on mineo sashimi', 'Thick slices of mineo sashimi', 'Chewy mineo swim bladder, a delicacy'],
        shortDesc: 'A street of mineo (brown croaker) restaurants in old-town Manho-dong, where summer\'s top stamina food is served as sashimi, pancakes and soup.',
        fullDesc: 'Despite its name, "the people\'s fish," mineo (brown croaker) has long been treasured as a summer stamina food and is one of Mokpo\'s 9 signature dishes. Along Beonhwa-ro in Manho-dong, the old downtown, restaurants that have served mineo for decades cluster together to form "Mineo Street." The local way is to enjoy the whole fish: thick-cut sashimi, chewy swim bladder, savory skin, golden mineo pancakes and a refreshing soup made from the bones. It\'s close to the Modern History Museum, so it pairs well with an old-town walk.',
        timeRecommended: 'Time needed: about 1–1.5 hours for a meal',
        address: 'Beonhwa-ro area, Manho-dong, Mokpo, Jeollanam-do',
        tip: 'Mineo is in season from June to August, when it\'s at its richest. Go with 2–3 people and order both sashimi and soup to taste a variety of cuts.'
      },
      bukhang_nakji: {
        name: 'Bukhang Raw Fish Center & Sebal Nakji',
        theme: 'Raw fish center / Octopus dishes / Sunset',
        tags: ['#SebalNakji', '#NakjiTangtangi', '#BukhangFishCenter', '#MokpoBridgeSunset'],
        imageCaptions: ['A plate of live octopus with sesame oil and seeds', 'Sunset behind Mokpo Bridge beyond Bukhang', 'Finely chopped nakji tangtangi'],
        shortDesc: 'End the day at the raw fish center in Bukhang, right by Mokpo Bridge, with mudflat-raised sebal nakji and fresh sashimi.',
        fullDesc: 'Bukhang is a fishing port right beneath Mokpo Bridge, with live-fish centers and raw fish restaurants lined up along the harbor. The must-try here is "sebal nakji," a mudflat octopus with thin legs and one of Mokpo\'s 9 signature dishes. It\'s eaten whole wrapped around chopsticks, chopped and tossed in sesame oil as "nakji tangtangi," or in a light, clear yeonpo-tang soup. You can also pick a live fish at the center and have it sliced on the spot, and around sunset the sky behind Mokpo Bridge makes a beautiful backdrop for dinner.',
        timeRecommended: 'Time needed: about 1.5 hours for a meal',
        address: 'Bukhang area, Jukgyo-dong, Mokpo, Jeollanam-do',
        tip: 'If you eat live octopus whole, chew well and take your time. First-timers may prefer tangtangi or yeonpo-tang. Arrive about an hour before sunset to dine with the view.'
      }
    }
  },

  // ------------------------------------------------------ BUSAN
  busan: {
    name: 'Busan',
    badge: 'Busan',
    pageTitle: 'HARU TRIP Busan | A Day Trip Guide to Busan\'s Blue Waves and Shining Skyline',
    metaDesc: 'Busan day trip in 3 courses: Blueline Park, Huinnyeoul Village, Gamcheon Culture Village and Gwangan Bridge at night.',
    heroPill: '🌊 Korea Day Trip Project #2 · Busan, the ocean city',
    heroTitle: 'Endless blue sea and a city full of charm<br /><span class="highlight">The Perfect Busan Day Trip</span>',
    heroSubtitle: 'From the Haeundae Sky Capsule to cliffside Huinnyeoul Village and the dazzling Gwangan Bridge at night!<br />Enjoy Busan\'s romance and food in a single day with our A · B · C courses.',
    courses: {
      A: { title: 'Blueline Ocean & Haeundae Romance Course', subtitle: 'Emerald seas and the Sky Capsule along the old coastal railway', highlight: 'A romantic capsule gliding between sky and sea, and the charm of Cheongsapo', duration: 'About 5–6 hours', distance: 'About 6.8 km' },
      B: { title: 'Old Downtown Retro & Yeongdo Huinnyeoul Course', subtitle: 'Busan\'s living history, a cliffside "Santorini" village and lively Jagalchi Market', highlight: 'Seaside cliff alleys of Yeongdo and the warm hearts of Busan locals', duration: 'About 6–7 hours', distance: 'About 7.5 km' },
      C: { title: 'Trendy Ocean Life & Gwangan Bridge "Diamond" Night Course', subtitle: 'Youthful Gwangalli Beach, the trendy Millac the Market and a stunning drone show', highlight: 'Hot spots and the buzzing night sea against the Diamond Bridge', duration: 'About 5–6 hours', distance: 'About 5.2 km' }
    },
    destinations: {
      haeundae_blueline: {
        name: 'Haeundae Blueline Park & Sky Capsule',
        theme: 'Coastal tourist train / Unique activity',
        tags: ['#SkyCapsule', '#HaeundaeBeachTrain', '#OceanViewTrain', '#BusanMustDo'],
        imageCaptions: ['The Sky Capsule running against Haeundae\'s skyline', 'Mipo street, where an old Donghae Nambu Line crossing remains'],
        shortDesc: 'Busan\'s star attraction: a disused coastal railway reborn as a seaside beach train and the elevated Sky Capsule along stunning coastal scenery.',
        fullDesc: 'Haeundae Blueline Park is an eco-friendly tourist railway running 4.8 km from Mipo in Haeundae through Dalmaji Tunnel, Cheongsapo, the Daritdol Skywalk and Gudeokpo to Songjeong. The 4-seat "Sky Capsule," which rolls slowly at 5 km/h along a rail 7–10 m above the ground, offers a private view of the East Sea right below your feet and is hugely popular with travelers. Pair it with the stylish cafés around Mipo Station.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: '13 Dalmaji-gil 62beon-gil, Haeundae-gu, Busan (Mipo Station)',
        tip: 'Ride the Sky Capsule from Mipo toward Cheongsapo (west to east) to use the seaward rail for wider ocean views. Book online in advance.'
      },
      cheongsapo_skywalk: {
        name: 'Cheongsapo Daritdol Skywalk & Coast',
        theme: 'Sea skywalk / Fishing village',
        tags: ['#CheongsapoDaritdol', '#GlassFloorObservatory', '#CheongsapoTwinLighthouses', '#GrilledClamStreet'],
        imageCaptions: ['Cheongsapo harbor with its red lighthouse'],
        shortDesc: 'A relaxing spot where a skywalk stretches out over the sea 20 m above the water, with views of Cheongsapo\'s clear sea and coastline.',
        fullDesc: 'The Cheongsapo Daritdol Skywalk sits along the old Mipo railway between Cheongsapo and Songjeong. "Daritdol" refers to the reefs that line up like stepping stones from the Cheongsapo shore out to sea. Walking on the half-moon glass floor at the end feels like stepping out over the water. Afterwards, relax over Cheongsapo\'s famous charcoal-grilled clams or at an ocean-view café.',
        timeRecommended: 'Time needed: about 40 minutes–1 hour',
        address: 'San 3-9, Jung-dong, Haeundae-gu, Busan',
        tip: 'Entry may be restricted on very windy days, so check the weather. Entry is free with shoe covers, and the sunset view is spectacular.'
      },
      haeundae_beach: {
        name: 'Haeundae Beach & Dongbaekseom Island (Nurimaru)',
        theme: 'Famous beach / Coastal walk',
        tags: ['#HaeundaeBeach', '#DongbaekseomTrail', '#NurimaruAPECHouse', '#MarineCityView'],
        imageCaptions: ['Rows of parasols on Haeundae\'s sandy beach', 'Marine City skyscrapers seen from the Dongbaekseom coast', 'Haeundae Beach lighting up at dusk'],
        shortDesc: 'Korea\'s most famous beach and the Dongbaekseom coastal trail, where you can see Gwangan Bridge through dense pine forest.',
        fullDesc: 'With 1.5 km of fine sand and clear water, Haeundae Beach is truly Korea\'s top beach. Dongbaekseom at its western end was once an island but is now joined to the mainland by sand deposits, with a well-built coastal deck road running through camellia and pine trees. The viewpoints around Nurimaru APEC House, where world leaders once met, overlook Gwangan Bridge and the Oryukdo islets.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '116 Dongbaek-ro, U-dong, Haeundae-gu, Busan',
        tip: 'Follow the Dongbaekseom deck trail past the mermaid statue and the lighthouse viewpoint to Nurimaru. Don\'t miss grilled hagfish and tteokbokki at Haeundae Market.'
      },
      huinnyeoul_culture_village: {
        name: 'Yeongdo Huinnyeoul Culture Village & Jeoryeong Coastal Tunnel',
        theme: 'Seaside cliff village / Film location',
        tags: ['#SantoriniOfKorea', '#FilmTheAttorneyLocation', '#HuinnyeoulTunnel', '#OceanViewAlley'],
        imageCaptions: ['Huinnyeoul Village clustered along steep coastal cliffs', 'Village lanes winding between stairways', 'The coastal walkway below the cliffs'],
        shortDesc: 'The "Santorini of Korea": walk along steep seaside cliffs at the foot of Bongnaesan, a filming location of the movie "The Attorney".',
        fullDesc: 'Huinnyeoul Culture Village began as a cliff-edge neighborhood of Korean War refugees and is now one of Busan\'s most charming spots, nurtured by artists and residents. White walls and pastel houses blend with the blue sea of Namhang, and the lanes are full of small gift shops and ocean-view terrace cafés. Head down to the Jeoryeong Coastal Walk below the village to find the Huinnyeoul Coastal Tunnel, a favorite photo spot framing the sea.',
        timeRecommended: 'Time needed: about 2 hours',
        address: '194 Jeoryeong-ro, Yeongdo-gu, Busan',
        tip: 'The most famous shot at the coastal tunnel is a backlit silhouette looking out to the sea from inside. There are many stairs, so wear comfortable sneakers.'
      },
      jagalchi_biff: {
        name: 'Jagalchi Fish Market & BIFF Square Food Alley',
        theme: 'Traditional fish market / Street food',
        tags: ['#OisoBoisoSaiso', '#BusansFishMarket', '#SeedHotteok', '#GukjeMarketFoodAlley'],
        imageCaptions: ['Stalls full of fresh fish at Jagalchi Market', 'Seafood shops lining the market', 'Jagalchi Market\'s building shaped like seagull wings'],
        shortDesc: '"Come, look, buy!" Feel Busan\'s energy with all five senses at Korea\'s largest fish market and the street-food alleys of the Film Street.',
        fullDesc: 'Jagalchi is Korea\'s largest fish market and a symbol of Busan, full of fresh seafood and the friendly dialect of the "Jagalchi ajimae" fishwives. Pick live fish on the first floor of the seafood center and have it prepared upstairs, or enjoy grilled mackerel and hagfish in the market alleys. Cross the underpass to BIFF (Busan International Film Festival) Square, a food paradise with handprints of film stars, the original nut-filled seed hotteok, spicy glass noodles and stuffed tofu-pouch hot pot.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: '52 Jagalchihaean-ro, Jung-gu, Busan',
        tip: 'Go up to the "Jagalchi Sky Park" observatory on the market building\'s roof for a free 360-degree view of Namhang, Yeongdo Bridge and Busan Tower.'
      },
      gamcheon_culture_village: {
        name: 'Gamcheon Culture Village & Little Prince Photo Spot',
        theme: 'Terraced art village / Photo spot',
        tags: ['#LittlePrinceAndFox', '#MachuPicchuOfKorea', '#PastelVillage', '#BusanUrbanRegeneration'],
        imageCaptions: ['Pastel terraced houses lining the hillside', 'A village packed with colorful roofs', 'Art murals hidden throughout the village'],
        shortDesc: 'Pastel houses stacked up a hillside — the "Machu Picchu of Korea"! Look out over the village and sea alongside the Little Prince.',
        fullDesc: 'Gamcheon Culture Village is a terraced village built on a steep hillside by refugees in the 1950s. Its houses were built in orderly tiers so none blocks the view of the one behind. Artists and residents later filled the lanes with colorful murals and sculptures, turning it into a world-famous attraction. The statue of the Little Prince and the Desert Fox sitting on a railing overlooking the village always has a line of travelers waiting for a photo.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '203 Gamnae 2-ro, Saha-gu, Busan',
        tip: 'Buy a stamp-tour map at the village information center to efficiently find the hidden galleries and rooftop viewpoints.'
      },
      gwangalli_beach: {
        name: 'Gwangalli Beach & Terrace Café Street',
        theme: 'Youthful beach / Ocean-view cafés',
        tags: ['#GwangalliBeach', '#GwanganBridgeView', '#OceanViewCafeStreet', '#SUPPaddleboard'],
        imageCaptions: ['Gwangan Bridge stretching across the sea, seen head-on', 'Buildings along Gwangalli\'s seafront', 'Street performers on the beach'],
        shortDesc: 'An urban beach facing the majestic Gwangan Bridge, lined with terrace cafés and pubs — a hub of youth and romance.',
        fullDesc: 'Gwangalli is one of Busan\'s signature beaches where city and sea meet most harmoniously. It offers the best head-on view of Gwangan Bridge crossing the sea, and with clean water and a wide beach it\'s lively all year round. Cafés with floor-to-ceiling windows, brunch spots and craft beer pubs line the shore, making it perfect for a relaxed ocean lifestyle.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '219 Gwanganhaebyeon-ro, Suyeong-gu, Busan',
        tip: 'Try a forced-perspective photo that makes Gwangan Bridge sit on your palm, by the beach sculptures or on the sand.'
      },
      millac_the_market: {
        name: 'Millac the Market',
        theme: 'Trendy cultural complex / Ocean-view stand',
        tags: ['#MillacTheMarket', '#OceanViewStand', '#BusanHotSpot', '#IndoorCulturalSpace'],
        imageCaptions: ['Inside Millac the Market, with the sea beyond the glass', 'Millac the Market lit up at night', 'A busy cultural complex'],
        shortDesc: 'A huge cultural complex at Millak Port near Gwangalli — sit on the giant ocean-view stand with a beer and snacks and soak up the vibe.',
        fullDesc: 'Millac the Market is a red-brick, warehouse-style cultural complex near the former Millak Waterfront Park. Spanning about 7,700 m² from the basement to the second floor, its centerpiece is a giant "ocean-view stand" of stepped seating facing huge windows with views of Gwangan Bridge and Millak Port. Craft beer, doughnuts, lobster sandwiches and more are on offer, along with select shops, regular busking and art exhibitions.',
        timeRecommended: 'Time needed: about 1–1.5 hours',
        address: '56 Millaksubyeon-ro 17beon-gil, Suyeong-gu, Busan',
        tip: 'Grab takeout from the food stalls and settle into the ocean-view stand for an indoor seaside picnic.'
      },
      gwangandaegyo_night: {
        name: 'Gwangan Bridge "Diamond" Night View & M Drone Light Show',
        theme: 'Landmark night view / Drone light show',
        tags: ['#GwanganBridgeAtNight', '#GwangalliDroneShow', '#BusanNightSea', '#NightViewHotSpot'],
        imageCaptions: ['Gwangan Bridge glowing with brilliant lights', 'Gwangan Bridge shining alongside the skyline', 'Gwangan Bridge and Haeundae\'s skyline at dusk'],
        shortDesc: 'The dazzling finale of a Busan day trip: the 7.42 km Gwangan Bridge light show and a high-tech drone show over the night sky every Saturday.',
        fullDesc: 'Gwangan Bridge is a 7,420 m double-deck bridge over the sea. At night its LED lighting system displays over 100,000 colors, earning it the nickname "Diamond Bridge." The head-on view from Gwangalli Beach is considered the highlight of any Busan trip. Every Saturday evening, hundreds of drones draw 3D images and messages in the night sky to music in the "Gwangalli M Drone Light Show," amazing visitors from around the world.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: '219 Gwanganhaebyeon-ro, Suyeong-gu, Busan (Gwangalli Beach area)',
        tip: 'The drone show runs every Saturday evening (winter 7 pm/9 pm, summer 8 pm/10 pm). Lay out a mat in the middle of the beach 30 minutes early for the best view.'
      }
    }
  },

  // ------------------------------------------------------ GANGNEUNG
  gangneung: {
    name: 'Gangneung',
    badge: 'Gangneung',
    pageTitle: 'HARU TRIP Gangneung | A Day Trip Guide to Gangneung\'s Coffee Coast and Jeongdongjin Sunrise',
    metaDesc: 'Gangneung day trip in 3 courses: Anmok Coffee Street, Gyeongpo Lake, Ojukheon and the Badabuchae-gil Trail.',
    heroPill: '☕ Korea Day Trip Project #3 · Gangneung, the coffee city',
    heroTitle: 'A sea scented with coffee and the legacy of Yulgok<br /><span class="highlight">The Perfect Gangneung Day Trip</span>',
    heroSubtitle: 'From ocean-view cafés on Anmok Beach to the historic Ojukheon and Jeongdongjin\'s Badabuchae-gil!<br />Enjoy Gangneung\'s sea and history in a single day with our A · B · C courses.',
    courses: {
      A: { title: 'Coffee by the Sea & Gyeongpo Course', subtitle: 'From seaside cafés on Anmok Coffee Street to Gyeongpo and Gangmun beaches and a lakeside walk', highlight: 'A hand-drip coffee while gazing at the East Sea through the window', duration: 'About 5–6 hours', distance: 'About 8.5 km' },
      B: { title: 'Legacy of Yulgok & Old Downtown Food Course', subtitle: 'The tranquil hanok houses of Ojukheon and Seongyojang, plus the food of Jungang Market', highlight: 'The charm of 500-year-old houses and warm local treats in the market', duration: 'About 5–6 hours', distance: 'About 7.0 km' },
      C: { title: 'Jeongdongjin Sunrise & Badabuchae-gil Course', subtitle: 'The train station closest to the sea, a cliffside coastal trail and a cruise-ship observatory', highlight: 'A walk along East Sea cliffs shaped by tectonic shifts 23 million years ago', duration: 'About 5–6 hours', distance: 'About 6.5 km' }
    },
    destinations: {
      anmok_coffee_street: {
        name: 'Anmok Beach Coffee Street',
        theme: 'Café hopping / Ocean view',
        tags: ['#GangneungCoffee', '#OceanViewCafe', '#AnmokBeach', '#SeasideWalk'],
        imageCaptions: ['Ocean-view cafés lined up along the beach', 'The blue East Sea meeting the sand at Anmok Beach', 'The "ANMOK" sign on Anmok Beach'],
        shortDesc: 'The symbol of Gangneung\'s coffee culture, with unique cafés lined up along the beach — every one of them looks out on the East Sea.',
        fullDesc: 'Anmok Beach Coffee Street began with a row of coffee vending machines on the beach and has grown into Korea\'s best-known coffee street, full of roasteries and large ocean-view cafés. Many have rooftops and floor-to-ceiling windows, perfect for watching the sea over coffee, and you can stroll along the beach to the Solbaram Bridge leading to Namhangjin. The Gangneung Coffee Festival is held here every autumn.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: 'Changhae-ro 14beon-gil area, Gyeonso-dong, Gangneung, Gangwon-do',
        tip: 'Choose a rooftop café on the second floor or higher to fit the beach and horizon in one frame. At sunset, walk south toward Solbaram Bridge.'
      },
      gyeongpo_beach: {
        name: 'Gyeongpo Beach & Gangmun Beach',
        theme: 'Beach / Seaside walk',
        tags: ['#GyeongpoBeach', '#GangmunBeach', '#EastCoastBeach', '#SotdaeBridge'],
        imageCaptions: ['Rocks and waves on the Gyeongpo coast', 'A photo-spot swing on the sand', 'A beach path along the pine forest'],
        shortDesc: 'Walk the East Coast\'s signature Gyeongpo Beach, with its long fine sand and pine forest, and the cozy Gangmun Beach just to the south.',
        fullDesc: 'Gyeongpo Beach is one of the East Coast\'s best-known beaches, with wide fine sand and a pine forest behind it. It\'s packed in summer and quiet the rest of the year, perfect for a seaside stroll. A short walk south brings you to Gangmun Beach, where the Gangmun Sotdae Bridge spans the channel between Gyeongpo Lake and the sea and the village\'s guardian "jinttobaegi" totem poles give it a simple fishing-village feel.',
        timeRecommended: 'Time needed: about 1–1.5 hours',
        address: '514 Changhae-ro, Gangneung, Gangwon-do (Gyeongpo Beach)',
        tip: 'Gyeongpo Beach to Gangmun Beach is about a 20-minute walk along the coast. There are plenty of ocean-view cafés around Gangmun Beach for a break.'
      },
      gyeongpo_lake: {
        name: 'Gyeongpo Lake & Gyeongpodae Pavilion',
        theme: 'Lakeside walk / Pavilion',
        tags: ['#GyeongpoLakeWalk', '#Gyeongpodae', '#CherryBlossomSpot', '#BikePath'],
        imageCaptions: ['Gentle ripples on Gyeongpo Lake', 'Pine trees and a lakeside path', 'Cherry blossoms around Gyeongpo Lake in spring'],
        shortDesc: 'Gangneung\'s favorite walking spot: Gyeongpo Lake, a lagoon where seawater meets fresh water, and Gyeongpodae Pavilion on the hill above it.',
        fullDesc: 'Gyeongpo Lake is a lagoon connected to the sea, with a well-kept 4 km walking and cycling path around it. Gyeongpodae, the pavilion on a lakeside hill, is one of the "Eight Scenic Views of Gwandong" and is famous for moon-viewing — legend says five moons rise here: in the sky, the sea, the lake, your wine cup and your beloved\'s eyes. In spring, cherry blossoms line the shore, making it Gangneung\'s top flower spot.',
        timeRecommended: 'Time needed: about 1–1.5 hours',
        address: '365 Gyeongpo-ro, Gangneung, Gangwon-do (Gyeongpodae)',
        tip: 'Rent a bike and ride around the lake. Parking is hard during cherry blossom season in early April, so use public transport.'
      },
      ojukheon: {
        name: 'Ojukheon House',
        theme: 'Historic site / Traditional architecture',
        tags: ['#YulgokYiI', '#ShinSaimdang', '#BlackBamboo', '#TreasureOfKorea'],
        imageCaptions: ['The main house of Ojukheon, showing mid-Joseon residential architecture', 'The well-kept garden of Ojukheon', 'Neat walls and tiled roofs of the old house'],
        shortDesc: 'The historic birthplace of Shin Saimdang and Yulgok Yi I, named after the black-stemmed bamboo (ojuk) that grows here.',
        fullDesc: 'Ojukheon preserves the look of a mid-Joseon aristocratic home and is famous as the birthplace of Shin Saimdang and her son, the scholar Yulgok Yi I. The main house is designated a National Treasure (Bomul), and it takes its name from the bamboo with crow-black stems growing around it. The grounds also include Munseongsa Shrine for Yulgok and the Gangneung Municipal Museum, making for a calm visit through history and culture.',
        timeRecommended: 'Time needed: about 1–1.5 hours',
        address: '24 Yulgok-ro 3139beon-gil, Gangneung, Gangwon-do',
        tip: 'Ojukheon is the scene on the back of Korea\'s 5,000-won bill. Bring one and take a photo from the same angle!'
      },
      seongyojang: {
        name: 'Seongyojang House',
        theme: 'Traditional hanok / Historic house',
        tags: ['#300YearOldHouse', '#Hwalraejeong', '#HanokStay', '#PondPavilion'],
        imageCaptions: ['Seongyojang\'s hanok buildings on spacious grounds', 'Pond and garden at Seongyojang', 'The weathered courtyard and walls of the old house'],
        shortDesc: 'A historic upper-class home from the late Joseon period, famous for Hwalraejeong, a pavilion built over a lotus pond.',
        fullDesc: 'Seongyojang is a large upper-class residence built in the late Joseon period by descendants of Grand Prince Hyoryeong and lived in for generations; it is a designated National Folklore Cultural Heritage. Its name, "house of the boat-bridge village," comes from the days when visitors crossed Gyeongpo Lake by boat. The inner quarters, men\'s quarters and annexes sit on wide grounds, and Hwalraejeong, the pavilion over the pond at the entrance, shows a different face every season. Some buildings offer hanok stays.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '63 Unjeong-gil, Gangneung, Gangwon-do',
        tip: 'It\'s most beautiful in summer when lotus flowers fill the pond in front of Hwalraejeong. About 10 minutes by car from Ojukheon.'
      },
      jungang_market_wolhwa: {
        name: 'Gangneung Jungang Market & Wolhwa Street',
        theme: 'Traditional market / Local food',
        tags: ['#Dakgangjeong', '#PotatoPancake', '#Jangkalguksu', '#MarketFoodTour'],
        imageCaptions: ['A lively alley in Gangneung Jungang Market', 'Wolhwa Street, built on the old railway line', 'Gangneung treats at the market'],
        shortDesc: 'An old-downtown highlight: a traditional market full of local treats like sweet fried chicken, potato pancakes and spicy noodles, next to Wolhwa Street built on a former railway.',
        fullDesc: 'Jungang Market is where Gangneung locals shop and a must-visit food spot for travelers. Try crispy dakgangjeong (sweet glazed fried chicken), potato pancakes, fish-cake croquettes and spicy jang-kalguksu noodles. Right next to the market, Wolhwa Street turns the land left behind when the old Yeongdong Line went underground into a promenade and plaza, named after Muwollang and Lady Yeonhwa from a local legend.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '21 Geumseong-ro, Gangneung, Gangwon-do (Jungang Market)',
        tip: 'Popular dakgangjeong shops have long lines — place a takeout order first and look around the market while you wait.'
      },
      jeongdongjin_station: {
        name: 'Jeongdongjin Station & Beach',
        theme: 'Sunrise spot / Train station',
        tags: ['#StationClosestToTheSea', '#JeongdongjinSunrise', '#Hourglass', '#TrainTravel'],
        imageCaptions: ['Jeongdongjin Station, right in front of the sea', 'Dawn breaking over the Jeongdongjin sea', 'The railway running alongside the sea at Jeongdongjin'],
        shortDesc: 'Home to Jeongdongjin Station, known as the train station closest to the sea in the world, and the famous sunrise spot of Jeongdongjin Beach.',
        fullDesc: 'Jeongdongjin means "the port due east of Hanyang (Gwanghwamun, Seoul)," and its station is famous for the sea spreading out right in front of the platform. It became a nationwide sunrise destination after appearing in the 1990s drama "Sandglass," and crowds gather here on New Year\'s Day. A giant hourglass sculpture and a time museum near the beach are also worth a look.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '17 Jeongdongyeok-gil, Gangdong-myeon, Gangneung, Gangwon-do (Jeongdongjin Station)',
        tip: 'To catch the sunrise, take an early-morning train from Seoul. A platform ticket may be required to enter the station.'
      },
      badabuchae_trail: {
        name: 'Jeongdong-Simgok Badabuchae-gil Trail',
        theme: 'Coastal trekking / Geological site',
        tags: ['#CoastalTerrace', '#NaturalMonument', '#TrailOverTheSea', '#Trekking'],
        imageCaptions: ['A sea cave in the coastal cliffs where waves wash in', 'Coastal terrace cliffs shaped by ages of tectonic movement', 'Rock formations curved like ripples'],
        shortDesc: 'A coastal trail right above the sea along the Jeongdong coastal terrace, a natural monument long closed to the public as a military zone.',
        fullDesc: 'The Jeongdong-Simgok Badabuchae-gil is a coastal trail of about 2.9 km from near the Jeongdongjin Sun Cruise parking lot to Simgok Port. It follows coastal terrace formations created by tectonic movement about 23 million years ago, and the area is designated a natural monument. Named because its shape resembles an open fan ("buchae"), the trail was closed off by military fences for decades before opening to visitors.',
        timeRecommended: 'Time needed: about 1–1.5 hours one way',
        address: 'Jeongdongjin-ri, Gangdong-myeon, Gangneung, Gangwon-do (Jeongdong ticket office, near the Sun Cruise parking lot)',
        tip: 'The trail may close due to high waves or strong winds, so check before you go. It\'s a one-way route — plan your taxi or bus back in advance.'
      },
      sun_cruise_jeongdongjin: {
        name: 'Jeongdongjin Sun Cruise & Coastal Views',
        theme: 'Viewpoint / Unique architecture',
        tags: ['#CruiseShipHotel', '#ShipOnACliff', '#JeongdongjinView', '#SunriseSpot'],
        imageCaptions: ['Sun Cruise, a cruise-ship-shaped building on a cliff', 'Sun Cruise and the Jeongdongjin coast from above', 'Sun Cruise on the cliff beyond the beach'],
        shortDesc: 'A one-of-a-kind resort shaped like a cruise ship on a cliff above the sea, with an observatory and sculpture park overlooking Jeongdongjin.',
        fullDesc: 'Jeongdongjin Sun Cruise is famous for its unusual shape — like a giant ship perched on a hilltop. Even non-guests can pay an entrance fee to visit the garden, sculpture park and observatory, looking down over Jeongdongjin Station, the beach and the endless East Sea. It\'s close to the Badabuchae-gil Jeongdong ticket office, so it fits nicely before or after your trek.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '950-39 Heonhwa-ro, Gangdong-myeon, Gangneung, Gangwon-do',
        tip: 'It\'s also a famous sunrise spot, and many visitors come at dawn. About 5 minutes by car from Jeongdongjin Station.'
      }
    }
  },

  // ------------------------------------------------------ JEONJU
  jeonju: {
    name: 'Jeonju',
    badge: 'Jeonju',
    pageTitle: 'HARU TRIP Jeonju | A Day Trip Guide to Jeonju, the City of Hanok and Food',
    metaDesc: 'Jeonju day trip in 3 courses: Hanok Village, Gyeonggijeon, Jeondong Cathedral, Nambu Market and night views.',
    heroPill: '🏯 Korea Day Trip Project #4 · Jeonju, the city of taste and style',
    heroTitle: 'The Joseon era beneath 700 hanok roofs<br /><span class="highlight">The Perfect Jeonju Day Trip</span>',
    heroSubtitle: 'From Gyeonggijeon and Jeondong Cathedral to Nambu Night Market and Hanok Village alleys at night!<br />Enjoy Jeonju\'s food and charm in a single day with our A · B · C courses.',
    courses: {
      A: { title: 'Hanok Village & Joseon Dynasty History Course', subtitle: 'Gyeonggijeon with King Taejo\'s portrait, red-brick Jeondong Cathedral and Omokdae overlooking hanok roofs', highlight: 'Joseon-era time amid a sea of 700 hanok roofs', duration: 'About 4–5 hours', distance: 'About 2.5 km' },
      B: { title: 'Ginkgo Hyanggyo & City of Taste Food Course', subtitle: 'A Confucian school with 400-year-old ginkgo trees, Nambu Market\'s Youth Mall and Gaekridan-gil café lanes', highlight: 'The joy of a meal in Jeonju, a UNESCO City of Gastronomy', duration: 'About 5–6 hours', distance: 'About 3.5 km' },
      C: { title: 'Lotus Park & Hanok Village Night Walk Course', subtitle: 'Deokjin Park\'s lotus lake, Hanok Village alleys and a hanok pavilion bridge over Jeonjucheon at night', highlight: 'Softly lit hanok roofs and the night scenery of Jeonjucheon stream', duration: 'About 5–6 hours', distance: 'About 6.0 km' }
    },
    destinations: {
      gyeonggijeon: {
        name: 'Gyeonggijeon Shrine',
        theme: 'Historic site / Royal culture',
        tags: ['#KingTaejoPortrait', '#AnnalsOfJoseon', '#BambooForest', '#HanbokOuting'],
        imageCaptions: ['The main hall of Gyeonggijeon, housing King Taejo\'s portrait', 'The path through Gyeonggijeon beyond the red gate', 'Gyeonggijeon\'s garden surrounded by trees'],
        shortDesc: 'The shrine housing the royal portrait of King Taejo, founder of Joseon — a historic site in the heart of Jeonju Hanok Village.',
        fullDesc: 'Gyeonggijeon was built in 1410 to enshrine the portrait of King Taejo (Yi Seong-gye), reflecting Jeonju\'s status as the ancestral home of the Joseon royal family (the Jeonju Yi clan). At the Royal Portrait Museum on the grounds you can see Taejo\'s portrait, a National Treasure, and the Jeonju Sago archive that once stored the Annals of the Joseon Dynasty has been restored. Its lush trees and bamboo paths make it popular with travelers taking photos in hanbok.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '44 Taejo-ro, Wansan-gu, Jeonju, Jeonbuk',
        tip: 'Wearing hanbok often gets you a discount on admission. Visit the bamboo path behind the main hall in the morning for quiet photos.'
      },
      jeondong_cathedral: {
        name: 'Jeondong Catholic Cathedral',
        theme: 'Modern architecture / Religious heritage',
        tags: ['#Romanesque', '#RedBrickCathedral', '#ModernArchitecture', '#PhotoSpot'],
        imageCaptions: ['The front of Jeondong Cathedral in red brick and grey stone', 'The exterior with its rounded Byzantine bell towers', 'The cathedral seen between old trees'],
        shortDesc: 'A Romanesque cathedral built on the site of Korea\'s first Catholic martyrdom, one of the oldest Western-style buildings in the Honam region.',
        fullDesc: 'Jeondong Cathedral stands where Catholics were martyred during the persecutions of the late Joseon period. Construction began in 1908 and was completed in 1914. Its Romanesque style of red brick and grey granite, topped with rounded Byzantine bell towers, gives it an elegant look, and it is a designated national historic site. It stands right across from Gyeonggijeon, so it fits easily into a walk around Hanok Village.',
        timeRecommended: 'Time needed: about 30 minutes',
        address: '51 Taejo-ro, Wansan-gu, Jeonju, Jeonbuk',
        tip: 'Interior visits are limited during Mass, so please be quiet. You can fit the whole cathedral in one shot from across the street on the Gyeonggijeon side.'
      },
      omokdae_jaman: {
        name: 'Omokdae Pavilion & Jaman Mural Village',
        theme: 'Viewpoint / Mural alleys',
        tags: ['#HanokVillageView', '#MuralVillage', '#AlleyWalk', '#Viewpoint'],
        imageCaptions: ['Omokdae, a pavilion on the hill', 'Hanok Village roofs seen from Omokdae', 'Spring flowers around Omokdae'],
        shortDesc: 'Visit Omokdae, the hilltop pavilion where Yi Seong-gye held a victory feast, and the colorful Jaman Mural Village across the footbridge.',
        fullDesc: 'Omokdae is said to be where Yi Seong-gye held a feast on his way back from victory at the Battle of Hwangsan in the late Goryeo period. A short climb reveals a sweeping view of Jeonju Hanok Village\'s tiled roofs rolling like waves. Cross the footbridge from Omokdae to reach Jaman Mural Village, where small hillside lanes are full of murals of fairy tales and characters and charming little cafés.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '55 Girin-daero, Wansan-gu, Jeonju, Jeonbuk (Omokdae)',
        tip: 'Climb Omokdae around sunset to see the hanok roofs glowing in the evening light. People live in the mural village, so please keep your voice down.'
      },
      jeonju_hyanggyo: {
        name: 'Jeonju Hyanggyo Confucian School',
        theme: 'Traditional education / Ginkgo spot',
        tags: ['#GinkgoTrees', '#AutumnSpot', '#DramaLocation', '#JoseonSchool'],
        imageCaptions: ['The courtyard and Daeseongjeon hall lined with old trees', 'Neatly painted hyanggyo buildings', 'A path in the shade of trees at the hyanggyo'],
        shortDesc: 'A Joseon-era regional school where centuries-old ginkgo trees turn the courtyard golden every autumn — a hidden gem of Jeonju.',
        fullDesc: 'Jeonju Hyanggyo was a Joseon-era institution that held rites for Confucius and other sages and educated local scholars. Old buildings like Daeseongjeon and Myeongnyundang remain intact, and the ginkgo trees in the courtyard, hundreds of years old, are especially famous. Legend says ginkgos were planted at schools because they resist insects, reminding students not to become "pests" to society. Its tranquil atmosphere has made it a location for many historical dramas.',
        timeRecommended: 'Time needed: about 40 minutes',
        address: '139 Hyanggyo-gil, Wansan-gu, Jeonju, Jeonbuk',
        tip: 'It\'s most beautiful from late October to early November when the ginkgo leaves peak. Located at the eastern edge of Hanok Village, it\'s relatively quiet.'
      },
      pungnammun_nambu_market: {
        name: 'Pungnammun Gate & Nambu Market Youth Mall',
        theme: 'Traditional market / Night market / Local food',
        tags: ['#BeanSproutGukbap', '#YouthMall', '#NightMarket', '#JeonjuBibimbap'],
        imageCaptions: ['Pungnammun, the south gate of old Jeonju fortress', 'Pungnammun lit up at dusk', 'Nambu Market seen from across Jeonjucheon'],
        shortDesc: 'The heart of a Jeonju food trip: Pungnammun, the old fortress\'s south gate, and Nambu Market with its bean-sprout soup alley, Youth Mall and weekend night market.',
        fullDesc: 'Pungnammun is the only one of the four main gates of Joseon-era Jeonju fortress still standing and is designated a National Treasure (Bomul). Next to it, Nambu Market is Jeonju\'s best-known traditional market, where you can try local specialties like market-style kongnamul gukbap (bean-sprout rice soup) and blood sausage. Upstairs, the Youth Mall gathers small shops and cafés run by young merchants, and on weekend evenings a lively night market sells all kinds of street food.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '19-3 Pungnammun 1-gil, Wansan-gu, Jeonju, Jeonbuk (Nambu Market)',
        tip: 'The night market usually opens on Friday and Saturday evenings, so plan accordingly. Start your morning with market-style bean-sprout soup.'
      },
      gaeksa_street: {
        name: 'Jeonju Gaeksa & Gaekridan-gil',
        theme: 'Historic site / Café alleys',
        tags: ['#Pungpaejigwan', '#Gaekridangil', '#CafeHopping', '#StylishAlleys'],
        imageCaptions: ['Jeonju Gaeksa with its "Pungpaejigwan" signboard', 'Streets of shops around Gaeksa', 'Gaeksa\'s grand hip-and-gable roof'],
        shortDesc: 'Explore Gaeksa, the Joseon-era guesthouse for officials, and Gaekridan-gil, the surrounding lanes packed with stylish cafés and restaurants.',
        fullDesc: 'Jeonju Gaeksa housed a tablet symbolizing the king and lodged officials sent from the capital during the Joseon period; it is designated a National Treasure (Bomul). The "Pungpaejigwan" signboard on its main gate means "birthplace of the dynasty." The surrounding lanes, nicknamed "Gaekridan-gil" after Seoul\'s Gyeongridan-gil, are filled with cafés, restaurants and gift shops in renovated old buildings, popular with young travelers.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '59 Chunggyeong-ro, Wansan-gu, Jeonju, Jeonbuk (Jeonju Gaeksa)',
        tip: 'It\'s quieter than Hanok Village, great for a relaxed café tour. In the evening the alleys light up for an even nicer atmosphere.'
      },
      deokjin_park: {
        name: 'Deokjin Park',
        theme: 'Lake park / Lotus spot',
        tags: ['#Lotus', '#YeonhwaBridge', '#YeonhwajeongLibrary', '#SummerTrip'],
        imageCaptions: ['Yeonhwajeong, a hanok library on the lake', 'The hanok exterior of Yeonhwajeong Library', 'Hanok buildings on the shore of Deokjin Park'],
        shortDesc: 'Jeonju\'s signature park, famous for lotus flowers that fill a wide lake — stroll across the bridge and visit the hanok library on the water.',
        fullDesc: 'Deokjin Park is built around Deokjin Pond, said to date back to the Goryeo Dynasty. In summer, lotus flowers cover more than half of the lake in a spectacular display, and you can see them up close from Yeonhwa Bridge across the water. Yeonhwajeong, a hanok building on the lake, has been turned into a library where you can read while enjoying the lake view.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '390 Gwonsamdeuk-ro, Deokjin-gu, Jeonju, Jeonbuk',
        tip: 'Lotus flowers peak in July and August. Go early in the morning when the blossoms are fully open and the heat is milder.'
      },
      namcheongyo_cheongyeonru: {
        name: 'Namcheongyo Bridge, Cheongyeonru Pavilion & Jeonjucheon',
        theme: 'Hanok bridge / Stream walk',
        tags: ['#HanokPavilionBridge', '#JeonjucheonWalk', '#NightViewSpot', '#EdgeOfHanokVillage'],
        imageCaptions: ['Cheongyeonru, a hanok pavilion over Jeonjucheon', 'Jeonjucheon seen from the pavilion', 'Cheongyeonru stretching across Jeonjucheon'],
        shortDesc: 'A bridge over Jeonjucheon at the south end of Hanok Village, where you can sit in the hanok pavilion Cheongyeonru and enjoy the cool breeze.',
        fullDesc: 'Namcheongyo connects Jeonju Hanok Village with the other side of Jeonjucheon stream, and the hanok pavilion Cheongyeonru sits on top of it. Rest on the pavilion\'s wooden floor and gaze at the stream, the Hanok Village and the slopes of Namgosan in the distance — it\'s a favorite resting place for travelers. Walking paths run along the riverbanks, and after sunset lights on the pavilion and bridge create a soft night view.',
        timeRecommended: 'Time needed: about 40 minutes',
        address: 'Namcheongyo Bridge area, Gyo-dong, Wansan-gu, Jeonju, Jeonbuk',
        tip: 'You can take off your shoes and rest on Cheongyeonru\'s wooden floor. Stay from sunset until the lights come on to see both day and night views.'
      },
      hanok_village_lanes: {
        name: 'Jeonju Hanok Village Alley Walk',
        theme: 'Hanok alleys / Street food',
        tags: ['#HanokVillage', '#AlleyWalk', '#HanbokOuting', '#StreetSnacks'],
        imageCaptions: ['Hanok Village roofs seen from the hill', 'Hanok Village spread out below the mountains', 'A quiet path between hanok houses'],
        shortDesc: 'Korea\'s largest urban hanok village with about 700 traditional houses, where every alley is full of cafés, workshops and street snacks.',
        fullDesc: 'Jeonju Hanok Village grew from hanok houses built around the 1930s in Gyo-dong and Pungnam-dong and is now Jeonju\'s top attraction. Alleys branch off Taejo-ro and Eunhaeng-ro, with cafés, tea houses, craft workshops and souvenir shops in renovated hanok. Rent a hanbok to stroll the lanes or snack on street food as you go. After dark, soft lights in every alley create a completely different atmosphere.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: 'Gyo-dong & Pungnam-dong area, Wansan-gu, Jeonju, Jeonbuk',
        tip: 'It\'s very crowded during the day, so try walking the alleys in the evening. Continue to Namcheongyo\'s Cheongyeonru at the south end for a complete night walk.'
      }
    }
  },

  // ------------------------------------------------------ JEJU
  jeju: {
    name: 'Jeju',
    badge: 'Jeju',
    pageTitle: 'HARU TRIP Jeju | A Day Trip Guide to Jeju\'s Emerald Sea and Volcanic Island',
    metaDesc: 'Jeju day trip in 3 courses: Aewol coastal trail, Hyeopjae Beach, Seongsan Ilchulbong and Saeyeongyo at night.',
    heroPill: '🌴 Korea Day Trip Project #5 · Jeju, the mystical volcanic island',
    heroTitle: 'Emerald seas and a mystical volcanic island<br /><span class="highlight">The Perfect Jeju Day Trip</span>',
    heroSubtitle: 'From the clear waters of Aewol and Hyeopjae to Seongsan Ilchulbong, Seogwipo\'s waterfalls and night sea!<br />Enjoy Jeju\'s nature and romance in a single day with our A · B · C courses.',
    courses: {
      A: { title: 'Aewol & Hyeopjae Emerald Beach and Tea Field Course', subtitle: 'West Jeju\'s coastal trail, Hyeopjae\'s sea facing Biyangdo and vast green tea fields', highlight: 'Western Jeju, where clear emerald seas meet green tea fields', duration: 'About 6–7 hours', distance: 'About 40 km (by car)' },
      B: { title: 'Seongsan Ilchulbong & East Coast Drive Course', subtitle: 'UNESCO-listed Seongsan Ilchulbong, Seopjikoji jutting into the sea and Woljeong-ri\'s café beach', highlight: 'A volcanic crater rising from the sea and the blue eastern coast', duration: 'About 6–7 hours', distance: 'About 35 km (by car)' },
      C: { title: 'Seogwipo Waterfall & Art Walk Night Course', subtitle: 'Lee Jung-seop Street and Olle Market, Cheonjiyeon Falls in the forest and the night sea at Saeyeongyo', highlight: 'An artist\'s alley, a waterfall and Seogwipo Harbor lit up at night', duration: 'About 5–6 hours', distance: 'About 4.0 km' }
    },
    destinations: {
      handam_coastal_trail: {
        name: 'Aewol Handam Coastal Trail',
        theme: 'Coastal walk / Ocean-view cafés',
        tags: ['#Aewol', '#CoastalTrail', '#OceanViewCafe', '#SunsetSpot'],
        imageCaptions: ['The Handam trail along the black basalt coast', 'The clear blue sea off Aewol', 'The Aewol coast glowing red at sunset'],
        shortDesc: 'A trail along the black basalt coast from Aewol-ri to Gwakji Beach — clear water and ocean-view cafés make it a West Jeju favorite.',
        fullDesc: 'The Handam Coastal Trail runs about 1.2 km from Handam village in Aewol to Gwakji Beach. The path winds between rugged basalt rocks, bringing you very close to the sea, and the water is so clear you can see the bottom. Cafés and restaurants facing the sea cluster near the start of the trail, perfect for a leisurely break, and it\'s also famous for sunsets.',
        timeRecommended: 'Time needed: about 1–1.5 hours',
        address: 'Handam Coastal Trail area, Aewol-ri, Aewol-eup, Jeju-si, Jeju',
        tip: 'Start from the Gwakji Beach side and walk toward Handam so you can end with a café break. It\'s often windy, so bring a light jacket.'
      },
      hyeopjae_beach: {
        name: 'Hyeopjae Beach',
        theme: 'Beach / Emerald sea',
        tags: ['#BiyangdoView', '#EmeraldSea', '#WhiteSand', '#WestJeju'],
        imageCaptions: ['Biyangdo seen across the emerald sea', 'The emerald sea beyond the basalt rocks', 'Travelers playing in the shallow water'],
        shortDesc: 'West Jeju\'s signature beach, where white sand, emerald water and Biyangdo island just offshore create a picture-perfect scene.',
        fullDesc: 'Hyeopjae Beach is famous for its white sand mixed with crushed shells and its shallow, crystal-clear water. The small island of Biyangdo floats just offshore, so every photo looks like a postcard. The shallow water is great for families with kids, and the pine grove behind the beach offers shade. It connects to neighboring Geumneung Beach for a pleasant walk.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '329-10 Hallim-ro, Hallim-eup, Jeju-si, Jeju',
        tip: 'The sea looks its most vivid emerald on sunny afternoons. The sunset behind Biyangdo is beautiful too.'
      },
      osulloc_tea_museum: {
        name: 'O\'sulloc Tea Museum',
        theme: 'Green tea fields / Café / Exhibition',
        tags: ['#GreenTeaFields', '#GreenTeaIceCream', '#TeaMuseum', '#SeogwangTeaGarden'],
        imageCaptions: ['The endless Seogwang green tea fields', 'The Tea Museum next to the tea fields', 'The entrance of O\'sulloc Tea Museum'],
        shortDesc: 'A tea museum and café beside the vast Seogwang tea fields — enjoy green tea desserts and a walk through the green rows of tea.',
        fullDesc: 'O\'sulloc Tea Museum combines an exhibition on Korean tea culture with a café and gift shop. The wide Seogwang tea fields spread out right in front, so you can walk and take photos between the rows of tea bushes. Green tea ice cream and roll cake are especially popular, and the observation deck overlooks the entire tea field. Many travelers also visit the nearby Innisfree Jeju House.',
        timeRecommended: 'Time needed: about 1–1.5 hours',
        address: '15 Sinhwayeoksa-ro, Andeok-myeon, Seogwipo-si, Jeju',
        tip: 'It gets very crowded on weekend afternoons, so go early in the morning. The paths through the tea fields are dirt, so wear comfortable shoes.'
      },
      seongsan_ilchulbong: {
        name: 'Seongsan Ilchulbong Peak',
        theme: 'World Natural Heritage / Sunrise spot',
        tags: ['#UNESCOWorldHeritage', '#Sunrise', '#Crater', '#JejuMustSee'],
        imageCaptions: ['Seongsan Ilchulbong and its crater from above', 'Seongsan Ilchulbong in the blue evening beyond hydrangeas', 'Seongsan village at night from Ilchulbong'],
        shortDesc: 'A giant crater formed by an undersea volcanic eruption — a UNESCO World Natural Heritage site and Jeju\'s most famous sunrise spot.',
        fullDesc: 'Seongsan Ilchulbong is a tuff cone formed by a volcanic eruption in shallow sea about 5,000 years ago, and it was listed as a UNESCO World Natural Heritage site in 2007. At the summit is a huge crater about 600 m across, and its beautiful sunrises gave it the name "Sunrise Peak." A stepped trail takes 20–30 minutes to the top, where you can see the crater, Seongsan village and even Udo island.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '284-12 Ilchul-ro, Seongsan-eup, Seogwipo-si, Jeju',
        tip: 'To see the sunrise, arrive about an hour before dawn and start climbing. On some days you can watch a haenyeo (female diver) performance on the way down.'
      },
      seopjikoji: {
        name: 'Seopjikoji',
        theme: 'Coastal scenery / Walking',
        tags: ['#CoastalCliffs', '#WhiteLighthouse', '#CanolaFlowers', '#DramaLocation'],
        imageCaptions: ['The Seopjikoji coast stretching out to sea', 'Seopjikoji\'s rocks and hills reaching into the sea', 'A coastal view with Seongsan Ilchulbong in the distance'],
        shortDesc: 'A long cape reaching into the sea, where grassy hills, a white lighthouse and distant Seongsan Ilchulbong make a lovely East Jeju walk.',
        fullDesc: 'Seopjikoji combines "seopji," meaning "narrow land," and "koji," Jeju dialect for "cape," describing how it juts out into the sea. A path runs along gentle grassy hills, and from the white lighthouse at the end you get open views of the sea and Seongsan Ilchulbong. It\'s even prettier in spring when canola flowers bloom, and it has appeared in many dramas and films.',
        timeRecommended: 'Time needed: about 1 hour',
        address: 'Seopjikoji area, Goseong-ri, Seongsan-eup, Seogwipo-si, Jeju',
        tip: 'It\'s about 10 minutes by car from Seongsan Ilchulbong, so the two pair well. It\'s extremely windy — hold on to your hat.'
      },
      woljeongri_beach: {
        name: 'Woljeong-ri Beach',
        theme: 'Beach / Café street',
        tags: ['#Woljeongri', '#OceanViewCafe', '#WhiteSand', '#EastJeju'],
        imageCaptions: ['White sand and clear water at Woljeong-ri Beach', 'Cafés and buildings along the beach', 'Colorful chairs facing the sea'],
        shortDesc: 'A popular East Jeju beach with white sand, clear jade-colored water and stylish cafés lined up along the shore.',
        fullDesc: 'True to its name, "where the moon stays," Woljeong-ri Beach is loved for its beautiful sea. The shallow water glows jade green in the sunlight, and cafés and restaurants facing the sea line the beach, perfect for a relaxed end to the day. We also recommend driving the coastal road to nearby Gimnyeong or Sehwa beaches.',
        timeRecommended: 'Time needed: about 1–1.5 hours',
        address: 'Woljeong-ri Beach area, Gujwa-eup, Jeju-si, Jeju',
        tip: 'Window seats in the beachfront cafés fill up quickly, so go in the early afternoon rather than late. At low tide you can explore the tidal zone between the basalt rocks.'
      },
      lee_jungseop_street: {
        name: 'Seogwipo Maeil Olle Market & Lee Jung-seop Street',
        theme: 'Art street / Traditional market',
        tags: ['#LeeJungseopArtMuseum', '#ArtStreet', '#OlleMarket', '#MarketFood'],
        imageCaptions: ['The lively Seogwipo Maeil Olle Market', 'Market alleys full of Jeju food', '"Fantasy of Seogwipo" (1951), painted by Lee Jung-seop in Seogwipo'],
        shortDesc: 'Walk the street where painter Lee Jung-seop lived with his family as a Korean War refugee, then explore Seogwipo Maeil Olle Market full of Jeju food.',
        fullDesc: 'Lee Jung-seop Street commemorates the place where painter Lee Jung-seop stayed with his family in 1951 after fleeing the Korean War. His small thatched-roof house has been restored, and the Lee Jung-seop Art Museum just above it displays his works. Workshops, galleries and cafés line the street, and a flea market is sometimes held on weekends. At nearby Seogwipo Maeil Olle Market you can taste tangerines, raw fish, black pork skewers and other Jeju food.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: '27-3 Ijungseop-ro, Seogwipo-si, Jeju (Lee Jung-seop Art Museum)',
        tip: 'The view of the Seogwipo sea and Seopseom island from the hill behind his house resembles the scenery in his paintings. The museum may close on Mondays, so check ahead.'
      },
      cheonjiyeon_falls: {
        name: 'Cheonjiyeon Waterfall',
        theme: 'Waterfall / Forest walk',
        tags: ['#Waterfall', '#WarmTemperateForest', '#NightViewing', '#SeogwipoMustSee'],
        imageCaptions: ['Cheonjiyeon Falls plunging down the cliff', 'A stream running through lush warm-temperate forest', 'The clear blue pool below the falls'],
        shortDesc: 'A waterfall whose name means "pond where heaven and earth meet" — walk a lush forest path to find its refreshing cascade.',
        fullDesc: 'Cheonjiyeon is Seogwipo\'s signature waterfall, where water drops from a cliff about 22 m high into a deep pool. Dense warm-temperate forest lines the path from the entrance to the falls, and the valley is protected as a natural monument. It stays open late into the evening, so you can also enjoy the falls under lights.',
        timeRecommended: 'Time needed: about 40 minutes–1 hour',
        address: '2-15 Namseongjung-ro, Seogwipo-si, Jeju',
        tip: 'It\'s an easy, flat 10-minute walk from the entrance to the falls. Come after sunset to see the waterfall lit up.'
      },
      saeyeongyo_bridge: {
        name: 'Saeyeongyo Bridge & Saeseom Island',
        theme: 'Night view / Island walk',
        tags: ['#SaeyeongyoAtNight', '#SeogwipoHarbor', '#SaeseomWalk', '#NightSea'],
        imageCaptions: ['Saeyeongyo, shaped like a ship with a sail', 'Seogwipo Harbor with fishing boats and Saeyeongyo', 'The Saeyeongyo walkway leading to Saeseom'],
        shortDesc: 'A pedestrian bridge linking Seogwipo Harbor and the small island of Saeseom, shaped like a traditional Jeju raft and beautifully lit at night.',
        fullDesc: 'Saeyeongyo means "the bridge connecting to Saeseom," and it lets you walk from Seogwipo Harbor to the uninhabited island right in front of it. Its sail-shaped pylon is modeled on the "teu," a traditional Jeju raft, and after sunset the entire bridge lights up the Seogwipo night sea. Across the bridge, a walking path of just over 1 km circles Saeseom with sea views along the way.',
        timeRecommended: 'Time needed: about 1 hour',
        address: '707-4 Seohong-dong, Seogwipo-si, Jeju',
        tip: 'It\'s within walking distance of Cheonjiyeon Falls, so visit both in the evening. The Saeseom trail may be closed at night, so check before you go.'
      }
    }
  },

  // ------------------------------------------------------ YEOSU
  yeosu: {
    name: 'Yeosu',
    badge: 'Yeosu',
    pageTitle: 'HARU TRIP Yeosu | A Day Trip Guide to Yeosu\'s Camellia Island and Night Sea',
    metaDesc: 'Yeosu day trip in 3 courses: Odongdo, the marine cable car, Hyangiram, Jinnamgwan and the night sea with harbor-side food stalls.',
    heroPill: '🌉 Korea Day Trip Project #6 · Yeosu, city of the romantic night sea',
    heroTitle: 'Camellia islands and a glittering night sea<br /><span class="highlight">The Perfect Yeosu Day Trip</span>',
    heroSubtitle: 'From Odongdo\'s camellia forest and the marine cable car to sunrise at Hyangiram and the night sea!<br />Enjoy Yeosu\'s sea and romance in a single day with our A · B · C courses.',
    courses: {
      A: { title: 'Expo, Odongdo Camellia Island & Marine Cable Car Course', subtitle: 'The Big-O Show at the Expo site, Odongdo\'s camellia forest and a cable car ride over the sea', highlight: 'Yeosu\'s three signature sights, all within walking distance', duration: 'About 5–6 hours', distance: 'About 3.0 km' },
      B: { title: 'Hyangiram Sunrise, Dolsan Bridge & Jangdo Art Island Course', subtitle: 'A hermitage on a sea cliff, Dolsan Bridge from Dolsan Park and a walk across the sea to Jangdo', highlight: 'A drive along Dolsando\'s southern sea and a stroll around an art island', duration: 'About 6–7 hours', distance: 'About 45 km (by car)' },
      C: { title: 'Jinnamgwan History Walk & Yeosu Night Sea Course', subtitle: 'Admiral Yi Sun-sin\'s naval headquarters, the red Hamel Lighthouse and the night sea lit by food stalls', highlight: 'Start on a street full of history and end at the night sea from the famous song', duration: 'About 5–6 hours', distance: 'About 2.5 km' }
    },
    destinations: {
      yeosu_expo: {
        name: 'Yeosu Expo Park & Big-O Show',
        theme: 'Cultural complex / Night show',
        tags: ['#BigOShow', '#AquaPlanet', '#ExpoPark', '#SeasideWalk'],
        imageCaptions: ['The Big-O Show of water, light and fire', 'The International Pavilion entrance at the Expo site', 'Aqua Planet Yeosu inside the Expo site'],
        shortDesc: 'The seaside venue of the 2012 Yeosu World Expo, now home to Aqua Planet, the Sky Tower and the nightly Big-O Show.',
        fullDesc: 'Yeosu Expo Park turned the grounds of the 2012 Yeosu World Expo, held under the theme "The Living Ocean and Coast," into a public park. Wide promenades and plazas run along the sea, with the large Aqua Planet Yeosu aquarium and the Sky Tower observatory on site. After sunset, the giant ring-shaped "Big-O" structure on the water hosts a multimedia show of water, light and lasers that kicks off Yeosu\'s night.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: '1 Bangnamhoe-gil, Yeosu-si, Jeollanam-do',
        tip: 'Big-O Show times vary by season and day of the week, so check the official schedule before you go. It\'s a short walk from KTX Yeosu Expo Station.'
      },
      odongdo: {
        name: 'Odongdo Island',
        theme: 'Camellia island / Forest walk',
        tags: ['#Camellias', '#BreakwaterWalk', '#OdongdoLighthouse', '#CamelliaTrain'],
        imageCaptions: ['The breakwater path leading over the sea to Odongdo', 'Red camellias blooming on Odongdo', 'Odongdo Lighthouse rising above the forest and sea cliffs'],
        shortDesc: 'A small island linked to the mainland by a long breakwater — its camellia forest, lighthouse and cliffside trails make it Yeosu\'s symbol.',
        fullDesc: 'Odongdo got its name because it looks like a paulownia ("odong") leaf from afar, and you can walk there along a breakwater about 768 m long. Thousands of camellia trees and bamboo grow thickly across the island, earning it the nickname "Camellia Island," and in early spring red blossoms color the forest paths. Trails lead through the woods to Odongdo Lighthouse, the sea cave Yonggul and cliffside viewpoints.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: 'Odongdo area, Sujeong-dong, Yeosu-si, Jeollanam-do',
        tip: 'If the breakwater feels too long to walk, take the Camellia Train between the entrance and the island. Camellias usually bloom most in February and March.'
      },
      yeosu_cable_car: {
        name: 'Yeosu Maritime Cable Car',
        theme: 'Cable car / Sea views',
        tags: ['#MaritimeCableCar', '#CrystalCabin', '#BridgeView', '#YeosuHarbor'],
        imageCaptions: ['Cable cars crossing the sea with Geobukseon Bridge', 'The crystal cabin with the sea visible below your feet', 'The Yeosu Maritime Cable Car station'],
        shortDesc: 'A cable car crossing the sea between Jasan Park and Dolsan Park, with views over Yeosu Harbor, Geobukseon Bridge and Odongdo.',
        fullDesc: 'Opened in 2014, the Yeosu Maritime Cable Car was Korea\'s first cable car built to cross the sea. It links Jasan Park next to Odongdo with Dolsan Park across the water over about 1.5 km, giving sweeping views of Yeosu Harbor, Geobukseon Bridge, Odongdo and Dolsan Bridge in the distance. Ride a glass-floored crystal cabin to watch the sea and boats pass beneath your feet, or ride at sunset and after dark for Yeosu\'s city lights.',
        timeRecommended: 'Time needed: about 1 hour (round trip)',
        address: '3600-1 Dolsan-ro, Dolsan-eup, Yeosu-si, Jeollanam-do (Dolsan station)',
        tip: 'Board at the Jasan Park station near Odongdo for an easy route. Lines get long around sunset on weekends, so ride a little earlier.'
      },
      hyangiram: {
        name: 'Hyangiram Hermitage',
        theme: 'Temple / Sunrise spot',
        tags: ['#SunriseSpot', '#SeaCliff', '#GuanyinShrine', '#Dolsando'],
        imageCaptions: ['Wontongbojeon Hall beneath giant boulders at Hyangiram', 'The southern sea seen from Hyangiram', 'A colorful dragon carving under the eaves at Hyangiram'],
        shortDesc: 'A hermitage clinging to the rocky cliffs of Geumosan at the tip of Dolsando, famous for sunrise and wide views of the southern sea — true to its name, "facing the sun."',
        fullDesc: 'Hyangiram means "hermitage facing the sun," and it sits on the rocky cliffs of Geumosan at the southern tip of Dolsando. It is said that the Silla monk Wonhyo once meditated here, and it is counted among Korea\'s major shrines to the bodhisattva of compassion. The way up passes through narrow stone gates between boulders, and from the halls the endless southern sea opens up before you. On New Year\'s Day it is packed with people coming to see the first sunrise.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '60 Hyangiram-ro, Dolsan-eup, Yeosu-si, Jeollanam-do',
        tip: 'Steep stairs and slopes lead from the parking lot to the hermitage, so wear comfortable shoes. For sunrise, arrive at least an hour beforehand.'
      },
      dolsan_park: {
        name: 'Dolsan Park & Dolsan Bridge',
        theme: 'Viewpoint park / Night view',
        tags: ['#DolsanBridge', '#YeosuNightView', '#Viewpoint', '#CableCar'],
        imageCaptions: ['Dolsan Bridge and downtown Yeosu from Dolsan Park', 'The Dolsan Park plaza overlooking the sea and islands', 'Dolsan Bridge lit up at dusk'],
        shortDesc: 'A hilltop park right beside Dolsan Bridge, which links downtown Yeosu and Dolsando — the best spot to see the bridge and harbor at a glance.',
        fullDesc: 'Dolsan Park sits on a hill at the entrance to Dolsando, overlooking Dolsan Bridge just below, old downtown Yeosu across the water, Janggundo islet and Yeosu Harbor. Dolsan Bridge, a cable-stayed bridge that first connected the mainland to Dolsando, lights up its towers and cables at night to create Yeosu\'s signature night view. The park is also home to the Dolsan station of the Yeosu Maritime Cable Car, so it pairs well with a ride.',
        timeRecommended: 'Time needed: about 1 hour',
        address: 'Dolsan Park area, Udu-ri, Dolsan-eup, Yeosu-si, Jeollanam-do',
        tip: 'Arrive around sunset to catch both the sunset and the moment the bridge lights come on. The park\'s parking lot can be crowded with cable car visitors.'
      },
      jangdo_island: {
        name: 'Jangdo Art Island',
        theme: 'Island walk / Art space',
        tags: ['#ArtIsland', '#JinseomBridge', '#IslandWalk', '#Ungcheon'],
        imageCaptions: ['Jinseom Bridge leading across the sea to Jangdo', 'Jangdo floating on a calm sea', 'The Jangdo entrance lit up in the evening'],
        shortDesc: 'A small island off Ungcheon Beach turned into an art park — cross the low sea bridge to explore a gallery, sculptures and bamboo-lined trails.',
        fullDesc: 'Jangdo is a small island just off Ungcheon Beach in Yeosu, designed as an "art island" where a gallery, outdoor sculptures and gardens blend together. The island connects to the mainland by a low bridge called Jinseom Bridge, which disappears under water at high tide — making the crossing all the more special. A trail circles the island past bamboo groves and grassy hills, perfect for a slow walk by the sea.',
        timeRecommended: 'Time needed: about 1–1.5 hours',
        address: 'Jangdo area, Ungcheon-dong, Yeosu-si, Jeollanam-do',
        tip: 'Jinseom Bridge is closed when it\'s submerged at high tide, so be sure to check the tide times before you go. The beach at Ungcheon Waterfront Park next door is a nice place to rest and watch the sunset.'
      },
      jinnamgwan: {
        name: 'Jinnamgwan Hall & Yi Sun-sin Square',
        theme: 'Historic site / Plaza',
        tags: ['#NationalTreasure', '#NavalHeadquarters', '#AdmiralYiSunsin', '#TurtleShip'],
        imageCaptions: ['The front of Jinnamgwan with its 68 pillars', 'Jinnamgwan\'s long roofline seen from the side', 'Manghaeru, the gate pavilion of Jinnamgwan'],
        shortDesc: 'Visit Jinnamgwan, a huge wooden hall on the site of Admiral Yi Sun-sin\'s naval headquarters, and the seaside Yi Sun-sin Square with its turtle ship replica.',
        fullDesc: 'Jinnamgwan was built as a guesthouse on the site of the Jeolla Left Naval Headquarters, which Admiral Yi Sun-sin commanded during the Imjin War; its name means "to suppress the enemy in the south." Fifteen bays wide and five deep, supported by 68 pillars, it is the largest surviving single-story wooden building in Korea and a designated National Treasure. Down the hill by the sea, Yi Sun-sin Square has a statue of the admiral and a life-size turtle ship replica, with local restaurants and cafés nearby — a great starting point for your trip.',
        timeRecommended: 'Time needed: about 1.5 hours',
        address: '11 Dongmun-ro, Yeosu-si, Jeollanam-do (Jinnamgwan)',
        tip: 'Access to Jinnamgwan is sometimes limited due to restoration work, so check before visiting. The alleys around Yi Sun-sin Square are a good place to try local specialties like raw shrimp and mustard-leaf kimchi.'
      },
      hamel_lighthouse: {
        name: 'Hamel Lighthouse & Hamel Museum',
        theme: 'Lighthouse / Museum',
        tags: ['#RedLighthouse', '#HamelsJournal', '#PhotoSpot', '#SeasideWalk'],
        imageCaptions: ['Hamel Lighthouse glowing red at night', 'The Hamel Museum facing the sea', 'The Hamel statue and plaques in front of the museum'],
        shortDesc: 'A red lighthouse and museum honoring Hendrick Hamel, the Dutchman who first described Joseon in detail to the West — a popular photo spot on the night-sea walk.',
        fullDesc: 'Hendrick Hamel was a Dutch sailor who was shipwrecked on Jeju in 1653, spent 13 years in Joseon and finally escaped by boat from Yeosu. His account, known as "Hamel\'s Journal," is considered the first detailed description of Joseon written for the West. The Hamel Museum traces the crew\'s shipwreck and life in Joseon, and the red Hamel Lighthouse at the end of the breakwater out front lights up at night, becoming one of the Yeosu night sea\'s signature photo spots.',
        timeRecommended: 'Time needed: about 40 minutes–1 hour',
        address: 'Hamel Museum area, Jonghwa-dong, Yeosu-si, Jeollanam-do',
        tip: 'The museum is often closed on Mondays, so check ahead. The lighthouse looks best in photos after dark when its lights are on.'
      },
      yeosu_night_sea: {
        name: 'Yeosu Night Sea & Nangman Pocha Street',
        theme: 'Night view / Food stall street',
        tags: ['#YeosuNightSea', '#NangmanPocha', '#SeafoodSamhap', '#BridgeNightView'],
        imageCaptions: ['Downtown Yeosu\'s night sea glowing with lights', 'The old town\'s night lights reflected on the sea', 'Yeosu\'s night scenery along the coast'],
        shortDesc: 'A street of food stalls lighting up along Yeosu\'s famous night sea — the perfect place to end the day over a plate of seafood samhap.',
        fullDesc: 'When the sun sets along the waterfront around Jongpo Marine Park, the "Nangman Pocha" (romantic food stalls) switch on their lights one by one, and the glow of Dolsan Bridge and Geobukseon Bridge reflects on the water — the very "Yeosu night sea" sung about in the well-known song. The signature dish is seafood samhap, pork belly grilled with pen shell and mustard-leaf kimchi, and you can stroll along the seaside path all the way to Yi Sun-sin Square. It\'s the most Yeosu way to end your trip.',
        timeRecommended: 'Time needed: about 1.5–2 hours',
        address: 'Jongpo Marine Park area, Jonghwa-dong, Yeosu-si, Jeollanam-do',
        tip: 'The stalls usually open in the evening and fill up fast on weekends, so arrive early around sunset. The sea breeze gets chilly, so bring a light jacket.'
      }
    }
  }
};

// ---- 한국어 원본(CITIES_DATA)에 영어 번역 덮어쓰기
(function applyEnglish(data) {
  if (typeof CITIES_DATA === 'undefined') return;
  for (const [cityId, tr] of Object.entries(data)) {
    const city = CITIES_DATA[cityId];
    if (!city) continue;
    const { courses = {}, destinations = {}, ...cityFields } = tr;
    Object.assign(city, cityFields);
    city.courses.forEach(c => {
      c.badge = `Course ${c.id}`;
      Object.assign(c, courses[c.id] || {});
    });
    city.destinations.forEach(d => {
      const koName = d.name;
      Object.assign(d, destinations[d.id] || {});
      d.courseBadge = `Course ${d.courseId}`;
      // 영어 페이지에서는 부제 자리에 한국어 원래 이름을 보여 줌 (현지에서 찾기 쉽도록)
      if (destinations[d.id] && destinations[d.id].name) d.engName = koName;
    });
  }
})(HARU_DATA_EN);

// ---- 오픈 예정 도시 이름 (지도에 흐리게 표시되는 도시)
const HARU_UPCOMING_EN = {
};
(function applyUpcoming(names) {
  if (typeof UPCOMING_CITIES === 'undefined') return;
  UPCOMING_CITIES.forEach(c => { if (names[c.id]) c.name = names[c.id]; });
})(HARU_UPCOMING_EN);
