
cardsDealt = new Array();
colorPattern = new Array();
playerPattern = new Array();
cpuPattern = new Array();
let playerscore = 0;
let cpuscore = 0;
let victorycondition = 0;

function deckBuilder() {
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
  const cards = [];
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      const value = values[v];
      const suit = suits[s];
      cards.push({ value, suit });
    }
  }
  return cards;
}

function deal() {
  if (playerPattern.length != 3 || victorycondition == 1) {
      return
  }
  function randomCard(cards) {
    random = Math.floor(Math.random() * 51);
    while (cardsDealt.indexOf(random) !== -1) {
      random = Math.floor(Math.random() * 51);
    }
    const cardValue = cards[random].value;
    const cardSuit = cards[random].suit;
    (cardSuit=="Diamonds"||cardSuit=="Hearts") ? colorPattern.unshift("red") : colorPattern.unshift("black");
    cardsDealt.push(random);
    let entity;
    cardSuit === "Diamonds"
       ? (entity = "&diams;")
        : (entity = "&" + cardSuit.toLowerCase() + ";");
    const card = document.createElement("div");
    card.classList.add("card", cardSuit.toLowerCase());
    card.innerHTML = '<span class="card-value-suit top block">' + cardValue + entity + "</span>" + '<span class="card-suit">' + entity + "</span>" + '<span class="card-value-suit bot">' + cardValue + entity + "</span>";
    playerhand = document.getElementById("playerhand");

    playerhand.appendChild(card);
    }
  const cards = deckBuilder();
  randomCard(cards);
  if (cardsDealt.length >2) {
     check();
  }
}



function check() {
  if (colorPattern[2] == playerPattern[0] && colorPattern[1] == playerPattern[1] && colorPattern[0] == playerPattern[2]) {
    victorycondition = 1;
    score("player");
  }
  if (colorPattern[2] == cpuPattern[0] && colorPattern[1] == cpuPattern[1] && colorPattern[0] == cpuPattern[2]) {
    victorycondition = 1;
    score("cpu");
  }
}


function score(player) {
  if (player == "cpu") {
     cpuscore++;
     document.getElementById("cpuscore").innerHTML = "CPU Score: " + cpuscore;
  } else if (player == "player") {
     playerscore++;
     document.getElementById("playerscore").innerHTML ="Player Score: " + playerscore;
  }
  circle(player);
}


function circle(player) {

     var x = document.getElementsByClassName("card")[cardsDealt.length-3];
	x.style.backgroundColor = "lightsteelblue";
     var y = document.getElementsByClassName("card")[cardsDealt.length-2];
	y.style.backgroundColor = "lightsteelblue";
     var z = document.getElementsByClassName("card")[cardsDealt.length-1];
	z.style.backgroundColor = "lightsteelblue";
}





function removeAllChildNodes() {
  playerhand = document.getElementById("playerhand");
  while (playerhand.firstChild) {
      playerhand.removeChild(playerhand.firstChild);
  }

  cardsDealt.length = 0;
  colorPattern.length = 0; 
  playerPattern.length = 0;
  cpuPattern.length = 0;
  victorycondition = 0;
  document.getElementById("cpuPattern").innerHTML = cpuPattern.toString();
  document.getElementById("playerPattern").innerHTML = playerPattern.toString();
}


function setPlayerPattern(color) {
  if (playerPattern.length == 3) {
    return;
  }
  playerPattern.push(color);
  let playertext = "Player's Choice: \t";
  for (let i = 0; i<playerPattern.length; i++) {
    if (playerPattern[i] == "black") {
        playertext += "&#11044 ";
    } else if (playerPattern[i] == "red") {
        playertext += "&#11093 ";
    }
  }
  document.getElementById("playerPattern").innerHTML = playertext;
  if (playerPattern.length == 3) {
    setCPUPattern(playerPattern);
  }
}

function setCPUPattern(playerPattern) {
  playerPattern[1] == "black" ? cpuPattern.push("red") : cpuPattern.push("black");
  cpuPattern.push(playerPattern[0]);
  cpuPattern.push(playerPattern[1]);
  let entity = "&#11093";
  let text = "<br><br><br>Computer's Choice: \t";
  for (let i = 0; i<3; i++) {
    if (cpuPattern[i] == "black") {
        text += "&#11044 ";
    } else {
        text += "&#11093 ";
    }
  }
  document.getElementById("cpuPattern").innerHTML = text;
}