function validateMessage() {
    let location = document.getElementById('location');
    location.setCustomValidity('This location does not have weather data.');
}

function clearMessage() {
  let location = document.getElementById('location');
  location.setCustomValidity('');
}

window.onload = function(){
    this.validateMessage();
}