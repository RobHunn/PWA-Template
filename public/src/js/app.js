//polly fill
if(!window.Promise){
    window.Promise = Promise
}
var deferredPrompt;

//Check to see if serviceWorker is a property of the browser object. If it is then load our worker...
if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('/servWorker.js')//returns a promise
    .then(res => console.log('ServiceWorker is Registered!'))
    .catch( err => console.log(`There has been an error ${err}`) );
};

/*
  *****code to unregister service worker*****
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
   registration.unregister()
 } })
*/

window.addEventListener('beforeinstallprompt', (e) => {
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    return false;
  });
  
window.addEventListener('appinstalled', (e) => {
      console.log('PWA-Template app installed');
    });