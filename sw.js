self.importScripts('js/cookie.js');
self.importScripts('js/ws.js');

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/brunch-pwa-dev/',
        '/brunch-pwa-dev/addons.html',
        '/brunch-pwa-dev/chromeos.html',
        '/brunch-pwa-dev/index.html',
        '/brunch-pwa-dev/settings.html',
        '/brunch-pwa-dev/css/style.css',
        '/brunch-pwa-dev/images/background/background.png',
        '/brunch-pwa-dev/images/icons/48.png',
        '/brunch-pwa-dev/images/icons/96.png',
        '/brunch-pwa-dev/images/icons/144.png',
        '/brunch-pwa-dev/images/icons/192.png',
        '/brunch-pwa-dev/images/icons/256.png',
        '/brunch-pwa-dev/images/icons/384.png',
        '/brunch-pwa-dev/images/icons/512.png',
        '/brunch-pwa-dev/js/addons.js',
        '/brunch-pwa-dev/js/chromeos.js',
        '/brunch-pwa-dev/js/cookie.js',
        '/brunch-pwa-dev/js/index.js',
        '/brunch-pwa-dev/js/settings.js',
        '/brunch-pwa-dev/js/ws.js'
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

	const TestPlan = async () => {
  		console.log('In periodicsync handler');
		ws_connect();
		setTimeout(() => { ws.send("latest-stable\nlatest-unstable\nlatest-chromeos"); }, 2000);
	};

self.addEventListener('periodicsync', event => {
 console.log('syncing started.');
   if (event.tag == 'get-latest-version') {
    event.waitUntil(TestPlan());
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
