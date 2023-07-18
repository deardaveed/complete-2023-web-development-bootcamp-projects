let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStart = false;

function nextSequence() {

  level++;

  if (level === 0) {
    $("#level-title").text("Level 0");
  } else {
    $("#level-title").text("Level " + level);
  }

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  console.log("randomChosenColor", randomChosenColor); //development only

  gamePattern.push(randomChosenColor);
  console.log("gamePattern array", gamePattern); //development only

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  // animatePress(randomChosenColor);

}

$(".btn").on("click", function (event) {
  let userChosenColor = event.target.id;
  console.log("userChosenColor: ", userChosenColor) //development only
  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern array: ", userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  lastAnswer = userClickedPattern.length - 1;

  checkAnswer(lastAnswer);
});

function playSound(name) {

  let buttonSound = new Audio("./sounds/" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed")

  // this was tricky...I lost much time trying to solve this using .delay(). via chatGPT: .delay() is a method provided by jQuery and is primarily used for queuing animations and effects. It only works with the animation queue of the selected element(s) and may not produce the desired delay effect when used with other operations.

  // and if I had clearly read the jQuery docs on .delay(), I would have saved a lot of time and anguish: "The .delay() method is best for delaying between queued jQuery effects. Because it is limited—it doesn't, for example, offer a way to cancel the delay—.delay() is not a replacement for JavaScript's native setTimeout function, which may be more appropriate for certain use cases.""
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100)

}

$(document).on("keydown", function () {

  if (!gameStart) nextSequence();
  gameStart = true;

})

function checkAnswer(currentLevel) {
  console.log("currentLevel: ", currentLevel);
  // for (let i = 0; i <= gamePattern.length; i++) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("SUCCESS");
      if (gamePattern.length - 1 === currentLevel) {
        setTimeout(nextSequence, 1000);
        userClickedPattern = [];
      }
      } else {
      console.log("WRONG");
      let buttonSound = new Audio("./sounds/wrong.mp3");
      buttonSound.play();

      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass('game-over')
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
      }
  // }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStart = false;
}
