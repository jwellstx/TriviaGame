var questions = [ {question: "hello1", answers: ["answer1", "answer2", "answer3", "answer4"] },
                  {question: "hello2", answers: ["answer11", "answer22", "answer33"] },
]

window.onload = function() {

    // var mainContent = $('.maincontent').append($('<div>').addClass('row').append($('<div>').addClass('col-lg-12 start')));
    var start = $('.start');
    start.css({
        'font-size': '30px',
        'text-align': 'center',
    });
    start.hover(function() {
        $(this).css("background-color", "green"); 
    }, function() {
        $(this).css("background-color", "red");
    });
    start.text("Click here to start!!");
    start.click(startgame);

    var timer = $('<div>')

    // var start = $('<div>').addClass("col-lg-12");

    // mainContent.append(start);

}

function startgame() {
    alert("starting game");
    $('.start').empty();

    $('.row1').text(questions[0].question);
    var row2 = $('.row2').text(questions[0].answers[0]);
    var row3 = $('.row3').text(questions[0].answers[1]);
    var row4 = $('.row4').text(questions[0].answers[2]);
    var row5 = $('.row5').text(questions[0].answers[3]);
    $('.row2, .row3, .row4, .row5').hover(function() {
        $(this).css("background-color", "green"); 
    }, function() {
        $(this).css("background-color", "red");
    });
}
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