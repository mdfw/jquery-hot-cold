
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
  	
  	$("#userGuess").focus(function() {
  		$(this).attr("placeholder", "");
  	});
  	$("#userGuess").blur(function() {
  		$(this).attr("placeholder","Enter your Guess");
  	});
  	$(".new").click(function() {
  		newGame();
  	});
  	
	newGame();
});

var myNum = 0;
var numGuesses = 0;

function newGame () {
	myNum = randomIntFromInterval(1,100);
	numGuesses = 0;
	console.log("new game: " + myNum);
	$("#guessList").html("").hide();
	$(".game > p").hide();
}


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
    /* http://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript*/
}