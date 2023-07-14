let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function nextSequence() {

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  console.log("randomChosenColor", randomChosenColor); //development only

  gamePattern.push(randomChosenColor);
  console.log("gamePattern array", gamePattern); //development only

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  let buttonSound = new Audio("./sounds/" + randomChosenColor + ".mp3");

  buttonSound.play();

}

nextSequence();

$(".btn").on("click", function (event) {
  let userChosenColor = event.target.id;
  console.log("userChosenColor: ", userChosenColor) //development only
  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern array: ", userClickedPattern);
});
