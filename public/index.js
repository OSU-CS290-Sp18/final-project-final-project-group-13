/*---------------------------Handle Post-----------------------------*/
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
        var id = event.target.response;
        let newPostContext = {
          postID: id,
          postTitle: postTitle,
          postAuthor: postAuthor,
          postText: postText
        };
        var newPostHTML = Handlebars.templates.postTemplate(newPostContext);
        let postContainer = document.querySelector('.post-container');
        postContainer.insertAdjacentHTML('afterbegin', newPostHTML);
      }else{
        alert("Error creating post");
      }
    });

    request.send(requestPostBody);

    hidePostModal();

  }
}

function handlePostDelete(){

}
function showPostModal(){
  let modal = document.getElementById('post-modal');
  let modalBackdrop = document.getElementById('post-modal-backdrop');

  let buttonHide = document.querySelector('button');
  let headerHide = document.querySelector('header');
  let mainHide = document.querySelector('main');

  modal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

  buttonHide.classList.add('hidden');
  headerHide.classList.add('hidden');
  mainHide.classList.add('hidden');
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

  let buttonHide = document.querySelector('button');
  let headerHide = document.querySelector('header');
  let mainHide = document.querySelector('main');


  modal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  buttonHide.classList.remove('hidden');
  headerHide.classList.remove('hidden');
  mainHide.classList.remove('hidden');

  clearPostModal();
}
/*------------------------- Handle Reply ----------------------------*/
function handleReply(){
  /*add reply*/
  let responseAuthor = document.getElementById('reply-auth-input').value;
  let responseText = document.getElementById('reply-text-input').value;

  if(!responseAuthor){
    responseAuthor = "Anonymous";
  }
  if(!responseText){
    alert("You have not filled in all required fields!");
  }
  else{
    let request = new XMLHttpRequest();
    let replyURL = location.pathname + "/addResponse";

    request.open("POST", replyURL);
    let requestReplyBody = JSON.stringify({
      responseText: responseText,
      responseAuthor: responseAuthor
    });
    request.setRequestHeader('Content-Type','application/json');

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        var id = event.target.response;
        let newReplyContent = {
          responseID : id,
          responseAuthor: responseAuthor,
          responseText: responseText
        };
        var newReplyHTML = Handlebars.templates.response(newReplyContent);
        let replyContainer = document.querySelector('.post-responses');
        replyContainer.insertAdjacentHTML('afterbegin', newReplyHTML);
      }else{
        alert("There was an error creating your reply");
      }
    });

    request.send(requestReplyBody);
    hideReplyModal();
  }
}

function handleReplyDelete(){

}
function showReplyModal(){
  let replyModal = document.getElementById('reply-modal');
  let replyModalBackdrop = document.getElementById('reply-modal-backdrop');

  replyModal.classList.remove('hidden');
  replyModalBackdrop.classList.remove('hidden');
}

function clearReplyModal(){
  let replyInputElements = document.querySelectorAll('#reply-modal input')
  for(let i = 0; i < replyInputElements.length; i++){
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
  if(window.location.href.includes('posts') === false){
    let addPostButton = document.getElementsByClassName('create-post-b');
    addPostButton[0].addEventListener('click', showPostModal);

    let postModalAccept = document.getElementById('post-modal-accept');
    postModalAccept.addEventListener('click', handlePost);

    let postModalHideButtons = document.getElementsByClassName('post-modal-hide');
    for(let i = 0; i < postModalHideButtons.length; i++){
      postModalHideButtons[i].addEventListener('click', hidePostModal);
    }
  }

  if(window.location.href.includes('posts')){
    let replyPostButton = document.getElementsByClassName('create-reply-b');
    replyPostButton[0].addEventListener('click', showReplyModal);

    let replyModalAccept = document.getElementById('reply-modal-accept');
    replyModalAccept.addEventListener('click', handleReply);

    let replyModalHideButtons = document.getElementsByClassName('reply-modal-hide');
    for(let i = 0; i < replyModalHideButtons.length; i++){
      replyModalHideButtons[i].addEventListener('click', hideReplyModal);
    }
  }
});

window.addEventListener('click', function (event) {
    if (event.target.className === "del-post-b") {
        var target_id = event.target.id;
        let request = new XMLHttpRequest();
        let delReplyURL = location.pathname;
       
        request.open("DELETE", delReplyURL);
        let requestReplyBody = JSON.stringify({
            deleteID: target_id
        });
        request.setRequestHeader('Content-Type', 'application/json');

        request.addEventListener('load', function (event) {
            if (event.target.status === 200) {
                console.log("post successfully deleted");
            } else {
                alert("There was an error creating your reply");
            }
        });
        request.send(requestReplyBody);
        event.stopPropagation();
        var delPost = document.getElementById(target_id);
        delPost.remove();
    }else if (event.target.className === "del-reply-b") {
        var target_id = event.target.id;
        let request = new XMLHttpRequest();
        let delReplyURL = location.pathname + "/" + target_id;

        request.open("DELETE", delReplyURL);
        let requestReplyBody = JSON.stringify({
            deleteID: target_id
        });
        request.setRequestHeader('Content-Type', 'application/json');

        request.addEventListener('load', function (event) {
            if (event.target.status === 200) {
                console.log("reply successfully deleted");
            } else {
                alert("There was an error creating your reply");
            }
        });

        request.send(requestReplyBody);
        event.stopPropagation();
        var delResponse = document.getElementById(target_id);
        delResponse.remove();
    }
});
