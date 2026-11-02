const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  // Course A: 근대역사 & 레트로 감성
  {
    name: 'modern_history_hall_1.jpg',
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80&fit=crop' // 근대 붉은 벽돌 유럽풍 건축양식
  },
  {
    name: 'modern_history_hall_2.jpg',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80&fit=crop' // 고풍스러운 인테리어 & 역사 유물관
  },
  {
    name: 'modern_history_hall_3.jpg',
    url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1200&q=80&fit=crop' // 근대 박물관 전시 & 엔틱 분위기
  },
  {
    name: 'seosandong_mural_1.jpg',
    url: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200&q=80&fit=crop' // 골목길 & 레트로 마을 전경
  },
  {
    name: 'seosandong_mural_2.jpg',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80&fit=crop' // 감성 벽화와 꽃길
  },
  {
    name: 'seosandong_mural_3.jpg',
    url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&q=80&fit=crop' // 레트로 상점/슈퍼마켓 감성
  },
  {
    name: 'yudalsan_mountain_1.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&fit=crop' // 웅장한 바위산과 파노라마 뷰
  },
  {
    name: 'yudalsan_mountain_2.jpg',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&fit=crop' // 유달산 정상에서 내려다보는 풍경
  },
  {
    name: 'yudalsan_mountain_3.jpg',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&fit=crop' // 산과 조각공원/전망대
  },

  // Course B: 해양 힐링 & 케이블카
  {
    name: 'marine_cable_car_1.jpg',
    url: 'https://images.unsplash.com/photo-1574691250077-03a929faece5?w=1200&q=80&fit=crop' // 바다 위를 가로지르는 케이블카
  },
  {
    name: 'marine_cable_car_2.jpg',
    url: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80&fit=crop' // 케이블카 안에서 본 바다 조망
  },
  {
    name: 'marine_cable_car_3.jpg',
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80&fit=crop' // 석양 무렵 해상 케이블카 풍경
  },
  {
    name: 'gohado_trail_1.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&fit=crop' // 해안 데크 산책로와 푸른 바다
  },
  {
    name: 'gohado_trail_2.jpg',
    url: 'https://images.unsplash.com/photo-1471922694855-fa59ac7f79bc?w=1200&q=80&fit=crop' // 기암절벽과 해안 트레킹
  },
  {
    name: 'gohado_trail_3.jpg',
    url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80&fit=crop' // 독특한 목조 전망대와 오션뷰
  },
  {
    name: 'peace_square_1.jpg',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80&fit=crop' // 화려한 분수와 조명 쇼
  },
  {
    name: 'peace_square_2.jpg',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=1200&q=80&fit=crop' // 바닷가 광장 산책로
  },
  {
    name: 'peace_square_3.jpg',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80&fit=crop' // 밤의 빛의 축제와 음악분수 레이저
  },

  // Course C: 미식 & 노을/낭만 야경
  {
    name: 'gourmet_market_1.jpg',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&fit=crop' // 한국적인 활기찬 미식 시장/음식점
  },
  {
    name: 'gourmet_market_2.jpg',
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&q=80&fit=crop' // 싱싱한 해산물/낙지 요리 한상
  },
  {
    name: 'gourmet_market_3.jpg',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&fit=crop' // 정갈하고 푸짐한 남도 미식 상차림
  },
  {
    name: 'skywalk_1.jpg',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=80&fit=crop' // 바다 위로 뻗은 스카이워크
  },
  {
    name: 'skywalk_2.jpg',
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&fit=crop' // 투명 바닥 아래로 펼쳐진 파도
  },
  {
    name: 'skywalk_3.jpg',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80&fit=crop' // 일몰 시각의 스카이워크 전경
  },
  {
    name: 'mokpodaegyo_night_1.jpg',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80&fit=crop' // 붉게 물드는 목포대교 석양
  },
  {
    name: 'mokpodaegyo_night_2.jpg',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80&fit=crop' // 목포대교 사장교 화려한 야경 불빛
  },
  {
    name: 'mokpodaegyo_night_3.jpg',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80&fit=crop' // 대반동 해변 카페거리의 야경
  },
  // 히어로 배경
  {
    name: 'hero_bg.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=85&fit=crop'
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(__dirname, 'img', item.name);
    const file = fs.createWriteStream(dest);

    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              console.log(`Downloaded ${item.name}`);
              resolve();
            });
          });
        }).on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`Downloaded ${item.name}`);
            resolve();
          });
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${images.length} images...`);
  for (const item of images) {
    try {
      await download(item);
    } catch (e) {
      console.error(`Failed ${item.name}: ${e.message}`);
    }
  }
  console.log('All downloads completed!');
}

run();
