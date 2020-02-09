
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

// Lifecycle hook browser
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Installing Service Worker ...', e);
    e.waitUntil(
      caches.open(CACHE_STATIC_NAME)
        .then( (cache) => {
          console.log('[Service Worker] Precaching App Shell');
          cache.addAll([
            '/',
            '/index.html',
            '/src/js/app.js',
            '/src/js/feed.js',
            '/src/js/promise.js',
            '/src/js/fetch.js',
            '/src/js/material.min.js',
            '/src/css/app.css',
            '/src/css/feed.css',
            '/src/images/main-image.jpg',
            'https://fonts.googleapis.com/css?family=Roboto:400,700',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
          ]);
        })
    )
  });

// Lifecycle hook browser
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
      caches.keys()
        .then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
              console.log('[Service Worker] Removing old cache.', key);
              return caches.delete(key);
            }
          }));
        })
    );
    return self.clients.claim();//must return this
  });

// triggered by app
// Intersept request made then check cache object if req matches send back cache version
// if not found then send back the request to carry on to network
self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request)
        .then( (res) => {
          if (res) {
            return res;
          } else {
            return fetch(e.request)
            .then((res)=>{
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then( (cache) => {
                    cache.put(e.request.url, res.clone());
                    return res;
                  })
              })
              .catch(function(err) {
  
              });
          }
        })
    );
  });