let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;


$(document).keydown(function (event) {
    console.log("keydown")
    if (event.key === "a") {
        nextSequence();
    }
})

function nextSequence() {
    userClickedPattern = [];
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;

};

function handler() {
    $(".btn").click(function () {
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1)
    })
}



function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length)
            setTimeout(nextSequence, 1000)
    } else {
        console.log("wrong");
        let audioWrong = new Audio("./sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            200
        });

        $("h1").text("Game Over, Press A Key to Restart");

        startOver();
    }


};


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
        100
    })

}

function startOver() {
    level = 0;
    gamePattern = [];
}




handler();