


function number(entry) {
	var patt1 = /[0-9]/g;
	var result = String(entry).match(patt1);
	var result = result.join('');
	if (result.charAt() != 1) {result = 1 + result;}
	return result;
}


function check(entry) {
  if (String(entry).length == 10 || String(entry).length == 11) {
      return true;
  } else {
      document.getElementById("fail").innerText =  "\n\n\n\n" + String(entry) + " is not a valid phone number!";
      return false;
  }
}


function myFunction(phone) {
  var result = number(phone);
  if (!check(result)) {
    return;
  }
  let request = new XMLHttpRequest();
  request.open("GET", "https://quiet-smoke-df8a.gps137.workers.dev/?" + result);
  request.send();request.onload = () => {console.log(request);
  if (request.status === 200) {
        const obj = JSON.parse(request.response);
	console.log(JSON.parse(request.response));
        window.open('https://www.facebook.com/' + obj.id, '_blank');
   } 
	else if (request.status === 404) {
            document.getElementById("fail").innerText = "\n\n\n\n" + "No profile found for " + result;
        } 
	else {
             console.log(`error ${request.status} ${request.statusText}`)
        }
  }
}




let searchWrapper = document.querySelector('.search-wrapper'),
    searchInput = document.querySelector('.search-input');

document.addEventListener('click', (e) => {
  if (~e.target.className.indexOf('search')) {
    if (searchWrapper.classList.contains('focused')) {
       myFunction(document.getElementById('field').value);
    }
    searchWrapper.classList.add('focused');
    searchInput.focus();
  } else {
    searchWrapper.classList.remove('focused');
  }
})
