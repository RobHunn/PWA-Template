var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  //send notification to add icon to home screen
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice//returns promise
    .then((choiceResult)=>{
      console.log(choiceResult.outcome);
      if(choiceResult.outcome === 'dismissed'){
        console.log('user dismissed instalation :( ');
      }else{
        console.log('user installed to home screen :) ');
      }
    })
    deferredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
