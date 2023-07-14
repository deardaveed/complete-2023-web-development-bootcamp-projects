let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor); //development only

  gamePattern.push(randomChosenColor);
  console.log(gamePattern); //development only

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).on("click", function () {
    let buttonSound = new Audio("./sounds/" + randomChosenColor + ".mp3");
    buttonSound.play();
  });
}

nextSequence();

$(".btn").on("click", function (event) {

});
