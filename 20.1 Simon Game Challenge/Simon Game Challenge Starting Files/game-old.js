let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

// alert("working!")
function nextSequence() {
  // generates a number between 0-3, inclusively
  let randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);

  let randomChosenColor = buttonColors[randomNumber];
  // console.log(randomChosenColor);

  gamePattern.push(randomChosenColor);
  // console.log(gamePattern);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  return randomChosenColor;
}

let chosenColor = nextSequence();
console.log(chosenColor, "chosenColor, line 20");

$(".btn").on("click", function (event) {
  let userChosenColor = event.target.id; // should return string
  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern", userClickedPattern);

  playSound(userChosenColor);
  // animatePress(userChosenColor);
})

function playSound(userChosenColor) {

    $("#" + userChosenColor)
      .fadeOut(100)
      .fadeIn(100)
      .on("click", function () {
        let buttonSound = new Audio("./sounds/" + userChosenColor + ".mp3");
        buttonSound.play();
      });
}

function animatePress(currentColor) {
  $(".btn").on("click", function (event) {
    let userClickedButton = event.target.id;
  })

  $("." + userClickedButton).addClass("pressed");
}
