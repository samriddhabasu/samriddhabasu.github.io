self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('samriddhabasu.github.io').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?launcher=true',
        '/blog/index.html',
        '/projects/index.html',
        '/about/index.html',
        '/css/main.css',
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});