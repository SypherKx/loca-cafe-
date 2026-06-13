const CACHE_NAME = 'luca-cafe-cache-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/logo.png',
  '/frames_webp/frame_00000.webp'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching critical assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Focus caching on same-origin requests (assets inside public/ or generated bundles)
  if (url.origin === self.location.origin) {
    // For images, specifically the webp scroll frames, use Cache First strategy
    if (url.pathname.includes('/frames_webp/') || url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)$/i)) {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const cacheCopy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, cacheCopy);
              });
            }
            return networkResponse;
          });
        })
      );
      return;
    }

    // For other assets (js, css, etc.), use Stale-While-Revalidate strategy
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, cacheCopy);
            });
          }
          return networkResponse;
        }).catch(() => {
          return null;
        });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
