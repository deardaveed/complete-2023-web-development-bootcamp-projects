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

  playSound(randomChosenColor);
  // animatePress(randomChosenColor);

}

nextSequence();

$(".btn").on("click", function (event) {
  let userChosenColor = event.target.id;
  console.log("userChosenColor: ", userChosenColor) //development only
  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern array: ", userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);
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
