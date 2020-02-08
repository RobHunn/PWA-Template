let deferredPrompt;
//lifecycle hook browser
self.addEventListener('install',(payload) => {
    console.log(`ServiceWorker is loading ... ${payload}`)
});
//lifecycle hook browser
self.addEventListener('activate',(payload) => {
    console.log(`ServiceWorker is being activated ... ${payload}`);
    //must return here
    return self.clients.claim();
});
//triggered by app
self.addEventListener('fetch',(payload) => {
    console.log(`ServiceWorker fetching data ... ${payload}`);
    //check see if we are online or off and respond with cashed data or data from network...
    payload.respondWith(fetch(payload.request))
});
