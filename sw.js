self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open('ironflow-cache-v2.0.2').then((cache) => cache.addAll([
      './',
      './index.html',
      './manifest.json',
      './icon.png'
    ]))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== 'ironflow-cache-v2.0.2') {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});