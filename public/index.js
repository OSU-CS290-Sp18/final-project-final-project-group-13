function getPostID(){

}

function handlePost(){
  /*add post*/
  let postTitle = document.getElementById('post-title-input').value;
  let postAuthor = document.getElementById('post-auth-input').value.trim();
  let postText = document.getElementById('post-text-input').value.trim();

  if(!postAuthor){
    postAuthor = "Anonymous";
  }

  if(!postTitle || !postText){
    alert("You have not filled in all required fields!");
  }else{
    let request = new XMLHttpRequest();
    //let postID = getPostID();
    let postURL = '/addPost';

    request.open("POST", postURL);
    let requestPostBody = JSON.stringify({
      postTitle: postTitle,
      postAuthor: postAuthor,
      postText: postText,
      responses: []
    });
    request.setRequestHeader('Content-Type','application/json');

    request.addEventListener('load', function(event){
      if(event.target.status === 200){
        let newPostContext = {
          postTitle: postTitle,
          postAuthor: postAuthor,
          postText: postText,
          responses: [],
          postID: ""
        };
        var newPostHTML = Handlebars.templates.postTemplate(newPostContext);
        let postContainer = document.querySelector('.post-container');
        postContainer.insertAdjacentHTML('beforeend', newPostHTML);
      }else{
        alert("Error creating post.");
      }
    });

    request.send(requestPostBody);

    hidePostModal();

  }
}

function handleReply(){
  /*add reply*/
  let replyAuthor = document.getElementById('reply-auth-input');
  let replyText = document.getElementById('reply-text-input');

  if(!replyAuthor){
    replyAuthor = "Anonymous";
  }

  if(!replyText){
    alert("You have not filled in all required fields!");
  }
  else{

  }

}


function storePostDB(postID, postTitle, postAuthor, postText){

}

function storeReplyDB(responseText, responseAuthor){

}


/*------------------------- Post Modal ---------------------------*/
function showPostModal(){
  let modal = document.getElementById('post-modal');
  let modalBackdrop = document.getElementById('post-modal-backdrop');
  console.log("reero");
  modal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');
}

function clearPostModal(){
  let inputElements = document.querySelectorAll('#post-modal input');
  for(let i = 0; i < inputElements.length; i++){
    inputElements[i].value = '';
  }
}

function hidePostModal(){
  let modal = document.getElementById('post-modal');
  let modalBackdrop = document.getElementById('post-modal-backdrop');

  console.log("reerrrrrooooo");

  modal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearPostModal();
}
/*------------------------ Reply Modal ---------------------------*/
function showReplyModal(){
  let replyModal = document.getElementById('reply-modal');
  let replyModalBackdrop = document.getElementById('reply-modal-backdrop');

  replyModal.classList.remove('hidden');
  replyModalBackdrop.classList.remove('hidden');
}

function clearReplyModal(){
  let replyInputElements = document.querySelectorAll('#reply-modal input')
  for(let i = 0; i < inputElements.length; i++){
    replyInputElements[i].value = '';
  }
}

function hideReplyModal(){
  let replyModal = document.getElementById('reply-modal');
  let replyModalBackdrop = document.getElementById('reply-modal-backdrop');

  replyModal.classList.add('hidden');
  replyModalBackdrop.classList.add('hidden');

  clearReplyModal();
}

window.addEventListener('DOMContentLoaded', function(){
  let addPostButton = document.getElementsByClassName('create-post-b');
  addPostButton[0].addEventListener('click', showPostModal);

  let postModalAccept = document.getElementById('post-modal-accept');
  postModalAccept.addEventListener('click', handlePost);

  let postModalHideButtons = document.getElementsByClassName('post-modal-hide');
  for(let i = 0; i < postModalHideButtons.length; i++){
    postModalHideButtons[i].addEventListener('click', hidePostModal);
  }

  if(location.pathname.includes("posts")){
    let replyPostButton = document.getElementsByClassName('create-post-b');
    replyPostButton[0].addEventListener('click', showReplyModal);

    let replyModalAccept = document.getElementById('reply-modal-accept');
    replyModalAccept.addEventListener('click', handleReply);

    let replyModalHideButtons = document.getElementsByClassName('reply-modal-hide');
    for(let i = 0; i < replyModalHideButtons.length; i++){
      replyModalHideButtons[i].addEventListener('click', hideReplyModal);
    }
  }
});
