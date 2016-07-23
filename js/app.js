
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
  	$("form").submit(function(event) {
  		processGuess();
  		event.preventDefault();
  	});
	newGame();
});

var myNum = 0;
var numGuesses = 0;
var lastGuess = 0;

function newGame () {
	myNum = randomIntFromInterval(1,100);
	numGuesses = 0;
	lastGuess = 0;
	$("#guessList").html("").hide();
	$(".game > p").hide();
	$('h2').css('background-color', '').text("Make your Guess!");
	$("#userGuess").val("");
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
    /* http://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript*/
}

function processGuess () {
	var guessFromForm = $("#userGuess").val();
	var validatedGuess = validateGuess(guessFromForm);
	if (validatedGuess) {
		if (validatedGuess == myNum) {
			displayResponse("You got it!", null);
			$('h2').css('background-color', 'green');
		} else {
			var baseResponse = baseResponseFromGuess(validatedGuess);
			var relativeResponse = relativeResponseFromGuess(validatedGuess);
			displayResponse(baseResponse, relativeResponse);
		}
		displayGuessInList(validatedGuess);
		lastGuess = validatedGuess;
		updateAndDisplayGuessNumber();
	}
	
}

function validateGuess (guess) {
	if (!guess) {
		alertOnError("Please enter a guess.");
		return null;
	}
	var parsedGuess = parseInt(guess);
	if (isNaN(parsedGuess)) {
		alertOnError("Guess should be a number.");
		return null;
	} else if (parsedGuess < 1 || parsedGuess > 100) {
		alertOnError("Guess should be between 1 and 100.");
		return null;
	}
	
	return parsedGuess;
}

function alertOnError (error) {
	alert(error);
}
/* Returns Very cold, cold, hot and very hot */
function baseResponseFromGuess (guess) {
	var distance = Math.abs(myNum - guess);
	if (distance > 50) {
	 	return "Ice cold";
	} else if (distance > 30) {
		return "Cold";
	} else if (distance > 20) {
		return "Warm";
	} else if (distance > 10) {
		return "Hot";
	} else {
		return "Super hot";
	}
	return "Hrm...";
}

/* Returns "hotter than X" or "colder than x" */
function relativeResponseFromGuess (guess) {
	if (!lastGuess || lastGuess == 0) {
		return null;
	}
	var currentDistance = Math.abs(myNum - guess);
	var previousDistance = Math.abs(myNum - lastGuess);
	if (currentDistance > previousDistance) {
		return "cooler than "+ lastGuess;
	} else {
		return "warmer than " + lastGuess;
	}
	return null;
}

function displayResponse (base, relative) {
	var responseText = base;
	if (relative) {
		responseText = responseText + ", " + relative;
	}
	$("#feedback").html(responseText);
}

function displayGuessInList (guess) {
	$("#guessList").show();
	$("#guessList").append("<li>" + guess + "</li>");
}

function updateAndDisplayGuessNumber () {
	numGuesses = numGuesses + 1;
	$(".game > p").show();
	$("#count").text(numGuesses);
}