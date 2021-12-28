const cacheName = "cache-v1";
const staticAssets = [
    './images/',
    './index.html',
    './favicon.ico',
    './manifest.webmanifest'
]

var self = this;

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', event => {
    self.clients.claim();
});

self.addEventListener('fetch', async event => {

    const req = event.request;

    const url = new URL(req.url);

    if (event.request.destination === 'image') {
        event.respondWith(networkAndCache(req));
    }
    // if (url.origin === this.location.origin) {
    //     event.respondWith(networkAndCache(req));
    // }
    // else {
    //     // event.respondWith(cacheFirst(req));
    //     event.respondWith(networkAndCache(req));
    // }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        return cached;
    }
}
