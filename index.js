var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animateColor(randomChosenColour);
  level++;
  $("#level-title").text("Level "+ level);
}

$(".btn").click(function() {
  var userChosenColor = ($(this).attr("id"));
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animateColor(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animateColor(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
      $("." + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
