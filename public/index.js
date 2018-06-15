/*---------------------------Handle Post-----------------------------*/
function handlePost(){
  /*add post*/
  let postTitle = document.getElementById('post-title-input').value;
  let postAuthor = document.getElementById('post-auth-input').value.trim();
  let postText = document.getElementById('post-text-input').value.trim();

  if(!postAuthor){                                                                                  /*Set username if unspecified*/
    postAuthor = "Anonymous";
  }

  if(!postTitle || !postText){                                                                      /*Alert for required text fields*/
    alert("You have not filled in all required fields!");
  }else{
    let request = new XMLHttpRequest();
    let postURL = '/addPost';

    request.open("POST", postURL);                                                                  /*Open post api*/
    let requestPostBody = JSON.stringify({
      postTitle: postTitle,
      postAuthor: postAuthor,
      postText: postText,
      responses: []
    });
    request.setRequestHeader('Content-Type','application/json');

    request.addEventListener('load', function(event){                                               /*Create a new post if correct event is triggered*/
      if(event.target.status === 200){
        var id = event.target.response;
        let newPostContext = {
          postID: id,
          postTitle: postTitle,
          postAuthor: postAuthor,
          postText: postText
        };
        var newPostHTML = Handlebars.templates.postTemplate(newPostContext);                        /*Generate HTML based off of post template*/
        let postContainer = document.querySelector('.post-container');
        postContainer.insertAdjacentHTML('afterbegin', newPostHTML);                                /*Insert new HTML to post container*/
      }else{
        alert("Error creating post");
      }
    });

    request.send(requestPostBody);                                                                  /*send content to server and hide*/

    hidePostModal();

  }
}

function showPostModal(){
  let modal = document.getElementById('post-modal');                                                /*Show post modal and hide post page content*/
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

function clearPostModal(){                                                                          /*Clear post modal text fields*/
  let inputElements = document.getElementsByClassname('post-input-element');
  for(let i = 0; i < inputElements.length; i++){
    let inputs = inputElements[i].querySelector('input, textarea');
    inputs.value = '';
  }
}

function hidePostModal(){
  let modal = document.getElementById('post-modal');                                                /*Hides modal and shows hidden post page content*/
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

  if(!responseAuthor){                                                                              /*Checking/Setting reply text fields*/
    responseAuthor = "Anonymous";
  }
  if(!responseText){
    alert("You have not filled in all required fields!");
  }
  else{
    let request = new XMLHttpRequest();
    let replyURL = location.pathname + "/addResponse";

    request.open("POST", replyURL);                                                                 /*Open reply post api*/
    let requestReplyBody = JSON.stringify({
      responseText: responseText,
      responseAuthor: responseAuthor
    });
    request.setRequestHeader('Content-Type','application/json');

    request.addEventListener('load', function (event){                                              /*Create content to be templated */
      if (event.target.status === 200) {
        var id = event.target.response;
        let newReplyContent = {
          responseID : id,
          responseAuthor: responseAuthor,
          responseText: responseText
        };
        var newReplyHTML = Handlebars.templates.response(newReplyContent);                          /*Create HTML*/
        let replyContainer = document.querySelector('.post-responses');
        replyContainer.insertAdjacentHTML('afterbegin', newReplyHTML);                              /*Add reply html to reply container*/
      }else{
        alert("There was an error creating your reply");
      }
    });

    request.send(requestReplyBody);                                                                 /*Send reply html to server*/
    hideReplyModal();
  }
}

function showReplyModal(){                                                                          /*Show reply modal content*/
  let replyModal = document.getElementById('reply-modal');
  let replyModalBackdrop = document.getElementById('reply-modal-backdrop');

  replyModal.classList.remove('hidden');
  replyModalBackdrop.classList.remove('hidden');
}

function clearReplyModal(){                                                                         /*Clear modal text fields*/
  let replyInputElements = document.querySelectorAll('#reply-modal input')
  for(let i = 0; i < replyInputElements.length; i++){
    replyInputElements[i].value = '';
  }
}

function hideReplyModal(){                                                                          /*Hide modal and clear text fields*/
  let replyModal = document.getElementById('reply-modal');
  let replyModalBackdrop = document.getElementById('reply-modal-backdrop');

  replyModal.classList.add('hidden');
  replyModalBackdrop.classList.add('hidden');

  clearReplyModal();
}

window.addEventListener('DOMContentLoaded', function(){
  if(window.location.href.includes('posts') === false){                                             /*Create post variables and handle post events*/
    let addPostButton = document.getElementsByClassName('create-post-b');
    addPostButton[0].addEventListener('click', showPostModal);

    let postModalAccept = document.getElementById('post-modal-accept');
    postModalAccept.addEventListener('click', handlePost);

    let postModalHideButtons = document.getElementsByClassName('post-modal-hide');                  /*Select buttons to hide modal when click event triggered*/
    for(let i = 0; i < postModalHideButtons.length; i++){
      postModalHideButtons[i].addEventListener('click', hidePostModal);
    }
  }

  if(window.location.href.includes('posts')){                                                       /*Create reply variables and handle reply events*/
    let replyPostButton = document.getElementsByClassName('create-reply-b');
    replyPostButton[0].addEventListener('click', showReplyModal);

    let replyModalAccept = document.getElementById('reply-modal-accept');
    replyModalAccept.addEventListener('click', handleReply);

    let replyModalHideButtons = document.getElementsByClassName('reply-modal-hide');                /*Select buttons to hide reply modal when click event triggered*/
    for(let i = 0; i < replyModalHideButtons.length; i++){
      replyModalHideButtons[i].addEventListener('click', hideReplyModal);
    }
  }
});

window.addEventListener('click', function (event) { //handle delete button functionality
    if (event.target.className === "del-post-b") { //check if event is the post button
        var target_id = event.target.id; //get target id from event
        let request = new XMLHttpRequest(); //create request
        let delReplyURL = location.pathname; //build url

        request.open("DELETE", delReplyURL); //open request
        let requestReplyBody = JSON.stringify({ //make json body
            deleteID: target_id
        });
        request.setRequestHeader('Content-Type', 'application/json');

        request.addEventListener('load', function (event) { //add success listener
            if (event.target.status === 200) {
                console.log("post successfully deleted"); //log response
            } else {
                alert("There was an error creating your reply");
            }
        });
        request.send(requestReplyBody); //send request
        event.stopPropagation(); //stop propegation
        var delPost = document.getElementById(target_id);
        delPost.remove(); //remove post
    }else if (event.target.className === "del-reply-b") {
        var target_id = event.target.id; //get target id
        let request = new XMLHttpRequest(); //create request
        let delReplyURL = location.pathname + "/" + target_id; //create url

        request.open("DELETE", delReplyURL); //open request
        let requestReplyBody = JSON.stringify({ //create request body
            deleteID: target_id
        });
        request.setRequestHeader('Content-Type', 'application/json');

        request.addEventListener('load', function (event) { //add success listener
            if (event.target.status === 200) {
                console.log("reply successfully deleted"); //log response
            } else {
                alert("There was an error creating your reply");
            }
        });

        request.send(requestReplyBody); //send request
        event.stopPropagation(); //stop propegation
        var delResponse = document.getElementById(target_id);
        delResponse.remove(); //remove response
    }
});
