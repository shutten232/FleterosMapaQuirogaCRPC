const CACHE = 'arrived-html-v4';
const ASSET_CACHE = 'arrived-assets-v4';

const ASSETS = [
  './',
  './index.html',
  './fletero/index.html',
  './panel/index.html',
  './shared/ui.css?v=20260130a',
  './shared/firebase-config.js?v=20260130a',
  './shared/utils.global.js?v=20260130a',
  './shared/firebase.global.js?v=20260130a',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async ()=>{
    const cache = await caches.open(ASSET_CACHE);
    await Promise.all(ASSETS.map(async (p)=>{
      const url = new URL(p, self.registration.scope).toString();
      try{ await cache.add(url); }catch{}
    }));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async ()=>{
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE && k !== ASSET_CACHE) ? caches.delete(k) : Promise.resolve()));
    await self.clients.claim();
  })());
});

function isHtml(req){
  return req.mode === 'navigate' || (req.headers.get('accept')||'').includes('text/html');
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (isHtml(req)) {
    e.respondWith((async ()=>{
      try{
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone()).catch(()=>{});
        return fresh;
      }catch{
        const cached = await caches.match(req);
        if (cached) return cached;
        const fallback = await caches.match(new URL('./fletero/index.html', self.registration.scope).toString());
        return fallback || new Response('Offline', {status:503});
      }
    })());
    return;
  }

  e.respondWith((async ()=>{
    const cached = await caches.match(req);
    if (cached) return cached;
    const res = await fetch(req);
    const cache = await caches.open(ASSET_CACHE);
    cache.put(req, res.clone()).catch(()=>{});
    return res;
  })());
});
