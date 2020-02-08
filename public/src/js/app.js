//Check to see if serviceWorker is a property of the browser object. If it is then load our worker...

if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('/servWorker.js')//returns a promise
    .then(res => {console.log('ServiceWorker is Registered!')
    .catch( err => console.log(`There has been an error ${err}`) );
});
};