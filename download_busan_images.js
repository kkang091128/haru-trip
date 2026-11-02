const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, 'img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const images = [
  // 부산 히어로 배경
  {
    name: 'busan_hero_bg.jpg',
    url: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=1920&q=85&fit=crop' // 부산 광안대교 & 해안 전경
  },

  // --- Course A: 블루라인 오션 & 해운대 낭만 코스 ---
  // 1. 해운대 블루라인파크 & 스카이캡슐
  {
    name: 'haeundae_blueline_1.jpg',
    url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80&fit=crop' // 해안 철길과 알록달록 스카이캡슐
  },
  {
    name: 'haeundae_blueline_2.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&fit=crop' // 푸른 동해바다와 절벽 해안 레일
  },
  {
    name: 'haeundae_blueline_3.jpg',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80&fit=crop' // 낭만적인 해변 열차와 여행자들
  },

  // 2. 청사포 다릿돌전망대 & 해안가
  {
    name: 'cheongsapo_skywalk_1.jpg',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=80&fit=crop' // 바다 위로 뻗은 전망대
  },
  {
    name: 'cheongsapo_skywalk_2.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&fit=crop' // 청사포 맑은 바다와 등대
  },
  {
    name: 'cheongsapo_skywalk_3.jpg',
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80&fit=crop' // 포구와 조개구이 해안 감성
  },

  // 3. 해운대 해수욕장 & 동백섬
  {
    name: 'haeundae_beach_1.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&fit=crop' // 해운대 백사장과 푸른 파도
  },
  {
    name: 'haeundae_beach_2.jpg',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&fit=crop' // 동백섬 누리마루와 울창한 해안 산책로
  },
  {
    name: 'haeundae_beach_3.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&fit=crop' // 해운대 마린시티 마천루와 해변
  },

  // --- Course B: 원도심 레트로 & 영도 흰여울 감성 코스 ---
  // 4. 영도 흰여울문화마을 & 해안터널
  {
    name: 'huinnyeoul_culture_village_1.jpg',
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80&fit=crop' // 절벽 위 흰색 바다마을 산토리니 감성
  },
  {
    name: 'huinnyeoul_culture_village_2.jpg',
    url: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200&q=80&fit=crop' // 해안 절벽 계단길과 골목길
  },
  {
    name: 'huinnyeoul_culture_village_3.jpg',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=1200&q=80&fit=crop' // 절영해안산책로와 해안터널 포토존
  },

  // 5. 자갈치시장 & BIFF 광장
  {
    name: 'jagalchi_biff_1.jpg',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&fit=crop' // 활기찬 전통 수산시장
  },
  {
    name: 'jagalchi_biff_2.jpg',
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&q=80&fit=crop' // 싱싱한 해산물과 생선구이 백반
  },
  {
    name: 'jagalchi_biff_3.jpg',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&fit=crop' // BIFF 광장 거리음식 씨앗호떡과 야시장
  },

  // 6. 감천문화마을
  {
    name: 'gamcheon_culture_village_1.jpg',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80&fit=crop' // 알록달록 계단식 파스텔 마을 전경
  },
  {
    name: 'gamcheon_culture_village_2.jpg',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80&fit=crop' // 어린왕자와 사막여우 포토존 & 벽화
  },
  {
    name: 'gamcheon_culture_village_3.jpg',
    url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&q=80&fit=crop' // 좁은 골목길과 아기자기한 공방
  },

  // --- Course C: 트렌디 오션라이프 & 광안대교 다이아몬드 야경 코스 ---
  // 7. 광안리 해수욕장 & 테라스 카페거리
  {
    name: 'gwangalli_beach_1.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&fit=crop' // 광안리 백사장과 정면의 광안대교 뷰
  },
  {
    name: 'gwangalli_beach_2.jpg',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&fit=crop' // 해변가 테라스 오션뷰 카페
  },
  {
    name: 'gwangalli_beach_3.jpg',
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80&fit=crop' // 황금빛으로 물드는 광안리 노을
  },

  // 8. 밀락더마켓 (복합문화공간)
  {
    name: 'millac_the_market_1.jpg',
    url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&q=80&fit=crop' // 통창 너머 바다가 보이는 감성 복합문화공간
  },
  {
    name: 'millac_the_market_2.jpg',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&fit=crop' // 트렌디한 F&B 매장과 팝업스토어
  },
  {
    name: 'millac_the_market_3.jpg',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80&fit=crop' // 버스킹 공연과 자유로운 스탠드 좌석
  },

  // 9. 광안대교 다이아몬드 야경 & 드론쇼
  {
    name: 'gwangandaegyo_night_1.jpg',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80&fit=crop' // 화려한 LED 조명의 대형 해상교량 야경
  },
  {
    name: 'gwangandaegyo_night_2.jpg',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80&fit=crop' // 밤하늘을 수놓는 환상적인 라이트 & 드론쇼
  },
  {
    name: 'gwangandaegyo_night_3.jpg',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=1200&q=80&fit=crop' // 광안리 밤바다와 버스킹, 낭만적인 밤
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(imgDir, item.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[SKIP] Already exists: ${item.name}`);
      return resolve();
    }

    const file = fs.createWriteStream(dest);
    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              console.log(`[OK] Downloaded: ${item.name}`);
              resolve();
            });
          });
        }).on('error', (err) => {
          fs.unlink(dest, () => {});
          console.error(`[ERR] ${item.name}: ${err.message}`);
          resolve();
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`[OK] Downloaded: ${item.name}`);
            resolve();
          });
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`[ERR] ${item.name}: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  console.log(`Starting download of ${images.length} Busan images...`);
  for (const img of images) {
    await download(img);
  }
  console.log('All Busan images download finished!');
}

run();
