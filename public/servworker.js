self.addEventListener('install',(payload) => {
    console.log(`ServiceWorker is loading ... ${payload}`)
});

self.addEventListener('activate',(payload) => {
    console.log(`ServiceWorker is being activated ... ${payload}`);
    //must return here
    return self.clients.claim();
});

self.addEventListener('fetch',(payload) => {
    console.log(`ServiceWorker fetching data ... ${payload}`);
    //check see if we are online or off and respond with cashed or data from liveserver...
    event.resondwith(fetch(event.request))
});