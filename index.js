var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
level=0
var started = false;
$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){

    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    $("#level-title").text("level"+" " +level);
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    //1 second

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if (started == false){
        nextSequence();
        started = true;
    }});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("succes");
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
    }, 1000);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
        
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

    


