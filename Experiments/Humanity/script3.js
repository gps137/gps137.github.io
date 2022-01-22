function updateBlackDisplay(text1) {
  document.getElementById("cardFirst").innerText = text1;
} 

function updateWhiteDisplay(i, text1) {
  document.getElementsByClassName("nextCard")[i].innerText = text1;
} 

function whiteCard(i, myCallback) {
  var number = Math.floor(Math.random() * 706)
  let request = new XMLHttpRequest();
  request.open("GET", "https://cold-mode-fce8.gps137.workers.dev/?" + number);
  request.send();request.onload = () => {console.log(request);
  if (request.status === 200) {
        const obj = JSON.parse(request.response);
	console.log(JSON.parse(request.response));
        myCallback(i, obj.entry);
	return;
   } 
	else if (request.status === 404) {
             console.log("Entry not found!");
        } 
	else {
             console.log(`error ${request.status} ${request.statusText}`)
        }
  }
}



function blackCard(myCallback) {
  var number = Math.floor(Math.random() * 167)

  
  let request = new XMLHttpRequest();
  request.open("GET", "https://red-morning-4dac.gps137.workers.dev/?" + number);
  request.send();request.onload = () => {console.log(request);
  if (request.status === 200) {
        const obj = JSON.parse(request.response);
	console.log(JSON.parse(request.response));
        myCallback(obj.entry);
	return;
   } 
	else if (request.status === 404) {
             console.log("Entry not found!");
        } 
	else {
             console.log(`error ${request.status} ${request.statusText}`)
        }
  }
}

blackCard(updateBlackDisplay);
for (var i = 0; i<4; i++) {
  whiteCard(i, updateWhiteDisplay);
}