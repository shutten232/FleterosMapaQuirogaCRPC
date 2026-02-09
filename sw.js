const CACHE='fleteros-pwa-v3';
const ASSETS=['./','./index.html','./panel/index.html','./fletero/index.html','./shared/ui.css','./shared/utils.global.js','./shared/firebase-config.js','./shared/firebase.global.js','./assets/icon-192.png','./assets/icon-512.png','./assets/maskable-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.hostname.includes('firebase')||u.hostname.includes('googleapis')||u.hostname.includes('gstatic')||u.hostname.includes('openstreetmap')||u.hostname.includes('tile')) return;
  e.respondWith((async()=>{
    const c=await caches.open(CACHE);
    const m=await c.match(r); if(m) return m;
    try{const res=await fetch(r); if(res&&res.status===200) c.put(r,res.clone()); return res;}
    catch{ return m || new Response('Offline',{status:200,headers:{'Content-Type':'text/plain'}}); }
  })());
});