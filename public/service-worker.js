// 🔹 Имя кеша с версией
const CACHE_NAME = 'movie-app-v1';

// 🔹 Ресурсы для кеширования
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json'];

// ═══════════════════════════════════════════════════
// 🔹 СОБЫТИЕ: Install — кешируем основные файлы
// ═══════════════════════════════════════════════════
self.addEventListener('install', (event) => {
  console.log('[SW] Install: кешируем статику');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ═══════════════════════════════════════════════════
// 🔹 СОБЫТИЕ: Activate — чистим старые кеши
// ═══════════════════════════════════════════════════
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate: чистим старые кеши');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => 
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ═══════════════════════════════════════════════════
// 🔹 СОБЫТИЕ: Fetch — стратегия "Cache First, затем Network"
// ═══════════════════════════════════════════════════
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 🔹 API-запросы — только сеть (не кешируем динамические данные)
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(request).catch(() => 
        new Response(JSON.stringify({ error: 'Нет соединения' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // 🔹 Статика: сначала кеш, потом сеть
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        if (cached) return cached;  // ✅ Есть в кеше — возвращаем
        
        // ❌ Нет в кеше — загружаем из сети
        return fetch(request)
          .then((res) => {
            if (res && res.ok) {
              const clone = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return res;
          })
          .catch(() => {
            // 🔹 Если офлайн и нет в кеше — возвращаем index.html для SPA
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});