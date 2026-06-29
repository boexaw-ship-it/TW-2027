const CACHE_NAME = 'twfpl-safe-v1';

// 🛠️ လမ်းကြောင်းဟောင်းများကို ဖယ်ရှားပြီး အစက်မဲ့စနစ် Blank Path ဖြင့် တည့်မတ်
const ASSETS = [
  'index.html',
  'public/manifest.json',
  'public/icons/icon-192x192.png',
  'public/icons/icon-512x512.png'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // ဖိုင်တစ်ခုချင်းစီကို အန္တရာယ်ကင်းကင်း Cache ဖမ်းခြင်း
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.log('Asset cache skip:', url));
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (🛑 Firebase Limit မစားရန် အကြွင်းမဲ့ ကာကွယ်ထားသော စနစ်)
self.addEventListener('fetch', (e) => {
  // 💡 FIREBASE သို့မဟုတ် GOOGLE API တောင်းဆိုမှုများဖြစ်ပါက Cache လုံးဝမလုပ်ဘဲ ကျော်သွားစေရန် တားဆီးခြင်း
  if (
    e.request.url.includes('firebase') || 
    e.request.url.includes('firestore') || 
    e.request.url.includes('google')
  ) {
    return; // Loop မပတ်စေရန် ဒီနေရာတင် အပြီးအပြတ် ရပ်တန့်လိုက်ပါသည်
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // မူရင်းအကုဒ်အတိုင်း ရေးထုံးအမှား စာလုံးပေါင်း (cachedResult) ကို တည့်မတ်ပြီး သုံးထားပါသည်
      return cachedResponse || fetch(e.request);
    }).catch(() => {
      return fetch(e.request);
    })
  );
});
