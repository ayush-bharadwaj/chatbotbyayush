var $messages = $('#messages-content');
var serverResponse = "QWERTY";

function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
  document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  setTimeout(function() {
    serverMessage("Say something to initialize me!");
  }, 100);
});

function updatescroll(){
  var element = document.getElementById('message-content');
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

function insertMessage() {
  msg = $('.form-control').val();
  console.log(msg);
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="row"><div class="col d-flex justify-content-end mb-3"><div class="card text-white bg-primary" style="max-height: 4rem; max-width: 20rem;"><div class="card-body" style="padding-left: 0.5rem;padding-top: 0.3rem;padding-right: 0.4rem;padding-bottom: 0.4rem;">' + msg + '</div></div></div></div>').appendTo($('#message-content')).addClass('new');
  fetchmsg() 
  updatescroll();
  $('.form-control').val(null);
}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
  updatescroll();
}

function serverMessage(response2) {
  console.log(response2);
  if ($('.form-control').val() != '') {
    return false;
  }
  setTimeout(function() {
    $('<div class="row align-middle"><div class="col d-flex"><div class="card border-dark mb-3" style="max-height: 4rem; max-width: 20rem;background-color: #ffcb05;color: darkslategrey;"><div class="card-body" style="padding-left: 0.5rem;padding-top: 0.3rem;padding-right: 0.4rem;padding-bottom: 0.4rem;">' + response2 + '</div></div></div></div>').appendTo($('#message-content')).addClass('new');
    updatescroll();
  }, 100 + (Math.random() * 20) * 100);
}

function fetchmsg(){
  var url = '/send-msg';
  const data = new URLSearchParams();
  for (const pair of new FormData(document.getElementById("mymsg"))) {
    data.append(pair[0], pair[1]);
    console.log(pair)
  }
  console.log("abc",data)
  fetch(url, {
    method: 'POST',
    body:data
  }).then(res => res.json())
  .then(response => {
    console.log(response);
    serverMessage(response.Reply);
  })
  .catch(error => console.error('Error h:', error));
}