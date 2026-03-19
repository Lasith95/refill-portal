const CACHE_NAME = 'staff-portal-cache-v14';
// cache කරන්න ඕනෙ ප්‍රධාන දේවල් මෙතන තියෙන්න ඕනේ
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

// Service Worker එක Install වෙද්දී files cache කරගැනීම
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Offline වෙලාවකදී cache එකෙන් data ලබාදීම
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});