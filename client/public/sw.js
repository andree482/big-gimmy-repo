const CACHE_NAME = 'images-v1';
const MAX_CACHE_ENTRIES = 500;

// Pattern URL delle immagini da cachare
const IMAGE_PATTERNS = [
  /\/images\//,
  /\/attached_assets\//,
];

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Solo richieste GET
  if (request.method !== 'GET') return;

  const url = request.url;
  const isImage = IMAGE_PATTERNS.some(pattern => pattern.test(url));

  if (!isImage) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;

      try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
          // Gestisce il limite massimo di entry in cache (FIFO)
          const keys = await cache.keys();
          if (keys.length >= MAX_CACHE_ENTRIES) {
            await cache.delete(keys[0]);
          }
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch {
        return new Response('', { status: 503, statusText: 'Offline' });
      }
    })
  );
});
