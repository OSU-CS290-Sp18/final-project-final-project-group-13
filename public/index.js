

function getPostID(){

}

function handlePost(){
  /*add post*/
  let postTitle = document.getElementById('post-title-input').value;
  let postAuthor = document.getElementById('post-auth-inpuit').value;
  let postText = document.getElementById('post-text-input').value;

  if(!postAuthor){
    postAuthor = "Anonymous";
  }

  if(!postTitle || !postText){
    alert("You have not filled in all required fields!");
  }else{
    let request = new XMLHttpRequest();
    let postID = getPostID();
    let url // maybe not this

    request.open("POST", /*something*/)
    let requestPostBody = JSON.stringify({
      postTitle: postTitle,
      postAuthor: postAuthor,
      postText: postText
    });

    request.addEventListener('load', function(event){
      if(event.target.status === 200){
        let postTemplate = Handlebars.templates.post;
        let newPostHTML = postTemplate({
          postTitle: postTitle,
          postAuthor: postAuthor,
          postText: postText
        });

        let postContainer = document.querySelector('.post-container');
        postContainer.insertAdjacentHTML('beforeend', newPostHTML);
      }
      else{
        alert("Error creating post.");
      }
    });

    request.setRequestHeader('Content-Type','application/json');
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
  var addPostButton = document.getElementsByClassName('create-post-b');
  addPostButton[0].addEventListener('click', showPostModal);

  var postModalAccept = document.getElementById('post-modal-accept');
  modalAccept.addEventListener('click', handlePost);

  var postModalHideButtons = document.getElementsByClassName('post-modal-hide');
  for(let i = 0; i < postModalHideButtons.length; i++){
    postModalHideButtons[i].addEventListener('click', hidePostModal);
  }
});
