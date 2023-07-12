// generate random number between 1 and 6 (6 faces on a die)
let randomNumber1 = Math.floor(Math.random() * 6) + 1;
let randomNumber2 = Math.floor(Math.random() * 6) + 1;

// display the correct die under 'Player 1' based on the random number generated above

// we need to 'grab' the element first..
// document.querySelector(".img1").setAttribute("src", "./images/dice3.png");

// now we need conditional looping to set the image based on the results of the die..

if (randomNumber1 === 1) {
  document.querySelector('.img1').setAttribute('src', './images/dice1.png');
}

else if (randomNumber1 === 2) {
  document.querySelector('.img1').setAttribute('src', './images/dice2.png');
}
else if (randomNumber1 === 3) {
  document.querySelector('.img1').setAttribute('src', './images/dice3.png');
}
else if (randomNumber1 === 4) {
  document.querySelector('.img1').setAttribute('src', './images/dice4.png');
}
else if (randomNumber1 === 5) {
  document.querySelector('.img1').setAttribute('src', './images/dice5.png');
}
else {
  document.querySelector('.img1').setAttribute('src', './images/dice6.png');
}

// repeat for the die on the right under Player 2..

if (randomNumber2 === 1) {
  document.querySelector('.img2').setAttribute('src', './images/dice1.png');
} else if (randomNumber2 === 2) {
  document.querySelector('.img2').setAttribute('src', './images/dice2.png');
} else if (randomNumber2 === 3) {
  document.querySelector('.img2').setAttribute('src', './images/dice3.png');
} else if (randomNumber2 === 4) {
  document.querySelector('.img2').setAttribute('src', './images/dice4.png');
} else if (randomNumber2 === 5) {
  document.querySelector('.img2').setAttribute('src', './images/dice5.png');
} else {
  document.querySelector('.img2').setAttribute('src', './images/dice6.png');
}

// replace text within H1 tag depending on results of die game

if (randomNumber1 > randomNumber2) {
  document.querySelector('h1').innerHTML = 'Player 1 Wins';
}
else if (randomNumber1 < randomNumber2) {
  document.querySelector('h1').innerHTML = 'Player 2 Wins';
}
else {
  document.querySelector('h1').innerHTML = 'Draw';
}
