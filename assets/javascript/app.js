var questions = [{ question: "What's my dogs name?", answers: ["Charlie", "Ruffio", "Jax", "Blackjack"], correctAnswer: "Ruffio", img: "put image here"},
{ question: "what's my horses name?", answers: ["Diamond", "Nickel", "Penny"], correctAnswer: "Nickel" },
]

var timeLeft = 5;
var timer2;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var total = 20;
var userChoice = "";
var currentAnswer = "";
var cI = 0;
var currentAnswer;

$(function () {
    var mainContent = $('.maincontent');
    var startScreen = $('<h2>').text("Press to Start").hide();
    startScreen.addClass("start rowCSS");
    mainContent.append(startScreen);

    $('.start').slideDown(1000).promise().done(function () {
        $(document).on("click", ".start", setupQ);
    });


})


function setupQ() {
    if (cI == questions.length) {
        resultsScreen();
        return;
    }

    var mainContent = $('.maincontent');
    timeLeft = 15;


    mainContent.empty();
    mainContent.append($('<h2>').text("Time remaining: 15 seconds!").hide().addClass("rowCSS timer"));
    mainContent.append($('<h2>').text(questions[cI].question).hide().addClass("rowCSS question"));
    for (var j = 0; j < questions[cI].answers.length; j++) {
        mainContent.append($('<h3>').text(questions[cI].answers[j]).hide().addClass("rowCSS answer").attr("value", questions[cI].answers[j]));
    }
    $('.rowCSS').fadeIn(1000);
    // $('.answer').each(function(index) {
    //     $(this).fadeIn(2000);
    // })
    

    currentAnswer = questions[cI].correctAnswer;

    $('.answer').on("click", function () {
        userChoice = $(this).attr("value").trim();
        clearInterval(timer2);
        clockRunning = false;
        checkAnswer(userChoice, currentAnswer);
    });

    timer2 = setInterval(timer, 1000);
    clockRunning = true;
}

function resultsScreen() {
    alert("out of questions");
    $('.maincontent').empty();
    $('.maincontent').append($('<div>').text("Correct: " + correct));
    $('.maincontent').append($('<div>').text("Incorrect: " + incorrect));
    $('.maincontent').append($('<div>').text("Unanswered: " + unanswered));

}

function checkAnswer(uC, cA) {
    if (uC === cA) {
        alert("That is correct! " + uC + " " + cA);
        $('.answer, .question').remove();
        $('.maincontent').append($('<h2>').text("correct"));
        $('.maincontent').append($('<img>').attr("src", "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg?w=1155&h=1541"));
        cI++;
        correct++;
        setTimeout(setupQ, 5000);
    }
    else {
        

        alert("Nope! " + uC + " " + cA);
        $('.answer, .question').remove();
        $('.maincontent').append($('<h2>').text("Incorrect"));
        $('.maincontent').append($('<h2>').text("The corret answer was: " + cA));
        $('.maincontent').append($('<img>').attr("src", "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg?w=1155&h=1541"));
        cI++;
        incorrect++;
        setTimeout(setupQ, 5000);
    }
}

function timer() {
    if (!timeLeft) {
        clearInterval(timer2);
        alert("Time's up!!");
        $('.answer, .question').remove();
        $('.maincontent').append($('<h2>').text("Time is up!"));
        $('.maincontent').append($('<h2>').text("The corret answer was: " + currentAnswer));
        $('.maincontent').append($('<img>').attr("src", "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg?w=1155&h=1541"));
        cI++;
        unanswered++;
        setupQ();
        return;
    }
    timeLeft--;
    log(timeLeft);
    $('.timer').text("Time remaining: " + timeLeft + " seconds!");
}

function log(text) {
    console.log(text);
}

// function startgame() {
//     $('.row1').removeClass('start');

//     $('.row1').text(questions[0].question);
//     var row2 = $('.row1').eq(1).text(questions[0].answers[0]).hide();
//     var row3 = $('.row3').text(questions[0].answers[1]).hide();
//     var row4 = $('.row4').text(questions[0].answers[2]).hide();
//     var row5 = $('.row5').text(questions[0].answers[3]).hide();


//     row2.slideDown(1000);
//     row3.delay(1000).slideDown(1000);
//     row4.delay(2000).slideDown(1000);
//     row5.delay(3000).slideDown(1000);

//     row2.on('click', function() { alert("row2 selected")});
//     row3.click(function() { alert("row3 selected")});
//     row4.click(function() { alert("row4 selected")});
//     row5.click(function() { alert("row5 selected")});
// }
// var x = 5;
// var timer = setInterval(countdown, 1000);

// function countdown() {
//     if (!x) {
//         clearInterval(timer);
//         console.log("stopping timer");
//     }

//     console.log(x);
//     $('#timer').text(x);
//     x--;


// }

// startGame();


// function startGame() {

// }


// myContainer = $('.container');

// // myTitle = $("<div class='row'><div class='col-lg-12'>");
// myTitle = $("<div class='row'>");
// myTitle.addClass("col-lg-12");
// myContainer.append(myTitle);