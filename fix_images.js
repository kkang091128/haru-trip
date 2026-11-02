const fs = require('fs');
const https = require('https');
const path = require('path');

const fixes = [
  {
    name: 'gohado_trail_2.jpg',
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80&fit=crop' // 해안 절벽 및 바다 풍경
  },
  {
    name: 'peace_square_2.jpg',
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=1200&q=80&fit=crop' // 광장 바다 야경 및 조명
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(__dirname, 'img', item.name);
    const file = fs.createWriteStream(dest);

    function doReq(url) {
      https.get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          doReq(response.headers.location);
        } else {
          response.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              console.log(`Downloaded ${item.name} (${fs.statSync(dest).size} bytes)`);
              resolve();
            });
          });
        }
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    doReq(item.url);
  });
}

async function run() {
  for (const item of fixes) {
    await download(item);
  }
}
run();
