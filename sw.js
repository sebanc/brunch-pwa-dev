self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/brunch-pwa/',
        '/brunch-pwa/addons.html',
        '/brunch-pwa/chromeos.html',
        '/brunch-pwa/index.html',
        '/brunch-pwa/settings.html',
        '/brunch-pwa/css/style.css',
        '/brunch-pwa/images/background/background.png',
        '/brunch-pwa/images/icons/48.png',
        '/brunch-pwa/images/icons/96.png',
        '/brunch-pwa/images/icons/144.png',
        '/brunch-pwa/images/icons/192.png',
        '/brunch-pwa/images/icons/256.png',
        '/brunch-pwa/images/icons/384.png',
        '/brunch-pwa/images/icons/512.png',
        '/brunch-pwa/js/addons.js',
        '/brunch-pwa/js/chromeos.js',
        '/brunch-pwa/js/index.js',
        '/brunch-pwa/js/settings.js',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('notificationclick', event => {
    const rootUrl = new URL('/', location).href;
    event.notification.close();
    // Enumerate windows, and call window.focus(), or open a new one.
    event.waitUntil(
      clients.matchAll().then(matchedClients => {
        for (let client of matchedClients) {
          if (client.url === rootUrl) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      })
    );
});
