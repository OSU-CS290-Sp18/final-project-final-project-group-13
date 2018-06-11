function showModal(){
  var modal =
  var modalBackdrop =

  modal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');
}

function clearModal(){
  var inputElements =
  for(var i = 0; i < inputElements.length; i++){
    inputElements[i].value = '';
  }
}

function hideModal(){
  var modal =
  var modalBackdrop =

  modal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearModal();
}
