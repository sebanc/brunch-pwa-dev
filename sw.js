self.importScripts('js/cookie.js');
self.importScripts('js/ws.js');

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll([
				'/brunch-pwa-dev/',
				'/brunch-pwa-dev/index.html',
				'/brunch-pwa-dev/css/style.css',
				'/brunch-pwa-dev/html/addons.html',
				'/brunch-pwa-dev/html/brunch.html',
				'/brunch-pwa-dev/html/chromeos.html',
				'/brunch-pwa-dev/html/settings.html',
				'/brunch-pwa-dev/images/background/background.png',
				'/brunch-pwa-dev/images/icons/48.png',
				'/brunch-pwa-dev/images/icons/96.png',
				'/brunch-pwa-dev/images/icons/144.png',
				'/brunch-pwa-dev/images/icons/192.png',
				'/brunch-pwa-dev/images/icons/256.png',
				'/brunch-pwa-dev/images/icons/384.png',
				'/brunch-pwa-dev/images/icons/512.png',
				'/brunch-pwa-dev/js/addons.js',
				'/brunch-pwa-dev/js/brunch.js',
				'/brunch-pwa-dev/js/chromeos.js',
				'/brunch-pwa-dev/js/cookie.js',
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

const GetVersion = async () => {
	console.log('In periodicsync handler');
	ws_connect();
	setTimeout(() => { ws.send("latest-stable\nlatest-unstable\nlatest-chromeos"); }, 2000);
};

self.addEventListener('periodicsync', event => {
	console.log('syncing started.');
	if (event.tag == 'get-latest-version') {
		event.waitUntil(GetVersion());
	}
});

self.addEventListener('notificationclick', function (event)
{
    console.log(event.notification.data.tab);
    const rootUrl = new URL('/brunch-pwa-dev/', location).href;
    const targetUrl = new URL('/brunch-pwa-dev/html/' + event.notification.data.tab + '.html', location).href;
    event.notification.close();
    event.waitUntil(
        clients.matchAll().then(matchedClients =>
        {
            for (let client of matchedClients)
            {
                if (client.url.indexOf(rootUrl) >= 0)
                {
	            location = targetUrl;
                    return client.focus();
                }
            }

            return clients.openWindow(targetUrl).then(function (client) { client.focus(); });
        })
    );
});
