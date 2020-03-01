var game = {
    cI: 0,         // current index in question array
    timeLeft: 20,  // 20 seconds to guess
    timer: 0,      // timer placeholder
    correct: 0,    // num of correct answers
    incorrect: 0,  // num of incorrect answers
    unanswered: 0, // num of timed out answers
    themeSong: new Audio("./assets/audio/mariotheme.mp3"),
    gameOver: new Audio("./assets/audio/mario-gameover.wav"),
    wrongAnswer: new Audio("./assets/audio/mario-scream.wav"),
    rightAnswer: new Audio("./assets/audio/mario-yippee.wav"),
    timeoutAnswer: new Audio("./assets/audio/mario-yawn.wav"),
    ceremony: new Audio("./assets/audio/ceremony.mp3"),
    questions: [
    {
        question: "Which console was the first to allow for online gaming via a broadband connection, using its integrated ethernet port?",
        answers: ["Microsoft Xbox", "Nintendo64", "Playstation3", "GameCube"], correctAnswer: "Microsoft Xbox", img: "assets/images/microsoftxboxbgrresize.png"
    },
    {
        question: "The Vive is a VR headset developed by Valve Corporation and which electronics manufacturer, known primarily for making Android smartphones?",
        answers: ["Sony", "Samsung", "Mitsubishi", "HTC"], correctAnswer: "HTC", img: "assets/images/htcvivebgr.png"
    },
    {
        question: "Which company purchased Oculus Rift in 2014 for $2 billion?",
        answers: ["Sony", "Facebook", "Dave&Busters", "Disney"], correctAnswer: "Facebook", img: "assets/images/oculusrift.gif"
    },
    {
        question: "What is the name of the service on the Nintendo Wii, Wii U and 3DS that allows the player to download classic Nintendo video games?",
        answers: ["Virtual Console", "Classics Shop", "App Store", "Nintendo Virtuals"], correctAnswer: "Virtual Console", img: "assets/images/virtualconsolebgrresize.png"
    },
    {
        question: "In what year did the Nintendo Wii launch?",
        answers: ["1999", "2001", "2006", "2012"], correctAnswer: "2006", img: "assets/images/nintendowiibgr.png"
    },
    {
        question: "Which console was sold using the advertising slogan \"Jump In\"?",
        answers: ["Game Boy Color", "Xbox 360", "ATARI 2600", "Nintendo Switch"], correctAnswer: "Xbox 360", img: "assets/images/xbox.gif"
    },
    {
        question: "What code name did Nintendo use for the GameCube before the true name’s reveal in August 2000?",
        answers: ["Palm Tree", "Shark", "Brown Box", "Dolphin"], correctAnswer: "Dolphin", img: "assets/images/gamecubebgr.png"
    },
    {
        question: "Which (usually blue) face button symbol is shared by PlayStation, Xbox and most Nintendo controllers, though in a different location on each?",
        answers: ["Menu", "A", "X", "Y"], correctAnswer: "X", img: "assets/images/xbuttonresize.jpg"
    },
    {
        question: "Before its release, by what code name was the Xbox One X called?",
        answers: ["Saga", "Dragon Fly Lake", "Yosemite", "Project Scorpio"], correctAnswer: "Project Scorpio", img: "assets/images/projectscorpiobgr.png"
    },
    {
        question: "On which handheld console did the Pokemon games first appear?",
        answers: ["Game Boy", "PSP", "Mattel", "Game Boy Advanced"], correctAnswer: "Game Boy", img: "assets/images/pokemon.gif"
    },
    {
        question: "With over 155 million units sold, what is the best selling home console of all time?",
        answers: ["PlayStation2", "Xbox 230", "Nintendo64", "Saga Genesis"], correctAnswer: "PlayStation2", img: "assets/images/ps2bgr.png"
    },
    {
        question: "Which is not a character of the three playable characters from Grand Theft Auto V?",
        answers: ["Michael De Santa", "David Wessels", "Franklin Clinton", "Trevor Philips"], correctAnswer: "David Wessels", img: "assets/images/gtav.gif"
    },
    {
        question: "In online gaming, what does the acronym \"MOBA\" mean?",
        answers: ["Mobil Online Betting Assembly", "Masters Of Battle Arcades", "Multiplayer Online Battle Area", "Maximum Onlinle Betting Allowance"], correctAnswer: "Multiplayer Online Battle Area", img: "assets/images/lol.jpg"
    },
    {
        question: "In which video game did Yoshi make his first appearance?",
        answers: ["Mario Kart", "Yoshi's Woolly World", "Super Mario World", "Super Smash Brothers"], correctAnswer: "Super Mario World", img: "assets/images/yoshi.gif"
    },
    {
        question: "Introduced in the Mario Kart 64 and a staple of the series since, which controversial projectile targets the race leader?",
        answers: ["The blue spiny shell", "Banana peel", "Mushrooms", "Bowser"], correctAnswer: "The blue spiny shell", img: "assets/images/blueshell.gif"
    },
    {
        question: "Which is not one of the five colors used on the fret buttons of Guitar Hero controllers?",
        answers: ["Green", "Yellow", "Purple", "Orange"], correctAnswer: "Purple", img: "assets/images/guitarherobgr.png"
    },
    {
        question: "Debuting in 2009, which mobile video game franchise is developed by Rovio entertainment?",
        answers: ["Turkey Hunt", "Balloons Tower Defense", "Words with Friends", "Angry Birds"], correctAnswer: "Angry Birds", img: "assets/images/angrybirds.gif"
    },
    ],

    startTrivia: function () {
        // stop music in case its still playing from last game
        this.ceremony.pause();
        this.ceremony.currentTime = 0;
        var mainContent = $('.maincontent');
        var startScreen = $('<h2>').text("Click here to start!").hide();
        startScreen.addClass("start rowCSS");
        mainContent.append(startScreen);
        // randomize our questions array
        this.questions.sort(() => Math.random() - 0.5); 

        $('.start').fadeIn(1000);
        // 'this' is no longer in the scope
        $(document).on("click", ".start", function(){
            game.themeSong.play();
            game.setupQ();
        });
    },
    setupQ: function () {
        // !! this function no longer refers to this object but rather the .start object - so use 'game' instead of 'this' !! TA - is this ok or bad practice?? //

        // clear interval before each question
        clearInterval(game.timer);
        // check if we are out of questions
        if (game.cI === game.questions.length) {
            // go right to results screen because checkAnswer and Timer will display correct answer screen automatically
            game.resultsScreen();
            return;
        }

        // randomize our answers array
        game.questions[game.cI].answers.sort(() => Math.random() - 0.5);
        cA = game.questions[game.cI].correctAnswer;
        // log for TA's to know the answer
        game.log(cA);

        var mainContent = $('.maincontent');
        // empty out maincontent div and place the current question and available answers
        mainContent.empty();
        mainContent.append($('<h2>').text("Time remaining: 20 seconds!").hide().addClass("rowCSS timer"));
        mainContent.append($('<h4>').text(game.questions[game.cI].question).hide().addClass("rowCSS question"));
        for (var j = 0; j < game.questions[game.cI].answers.length; j++) {
            // function chain hell
            mainContent.append($('<h5>').text(game.questions[game.cI].answers[j]).hide().addClass("rowCSS answer").attr("value", game.questions[game.cI].answers[j]));
        }
        $('.rowCSS').fadeIn(1000);

        // listen for user to click an answer
        $('.answer').on("click", function () {
            // back to using 'this' becuase we are looking at answer object
            uC = $(this).attr("value").trim();
            // check if the user was right
            game.checkAnswer(uC, cA);
        });

        // start the timer at 20sec at 1s interval
        game.timer = setInterval(game.timerFunc, 1000);
    },

    timerFunc: function () {
        // if timeleft hits 0, display that time is up, increment to next question and show correct answer screen
        if (!game.timeLeft) {
            clearInterval(game.timer);
            game.answerScreen(game.questions[game.cI].correctAnswer, 2);
            game.cI++;
            game.unanswered++;
            game.timeLeft = 20;
            game.timeoutAnswer.play();
            setTimeout(game.setupQ, 4000);
            return;
        }
        // if not 0, keep counting and upate timer on page
        game.timeLeft--;
        $('.timer').text("Time remaining: " + game.timeLeft + " seconds!");
    },

    checkAnswer: function (uC, cA) {
        clearInterval(game.timer);
        // check if user choice (uC) equals correct answer (cA) and show answer screen
        if (uC === cA) {
            game.answerScreen(cA, 0)
            game.correct++;
            game.rightAnswer.play();
        }
        else {
            game.answerScreen(cA, 1)
            game.incorrect++;
            game.wrongAnswer.play();
        }
        game.cI++;
        game.timeLeft = 20;
        setTimeout(game.setupQ, 4000);
    },
    answerScreen: function (result, dispAnswer) {
        // depending if dispAnswer is 0,1,2 display different results correct,incorrect,or times up and attached image/gif
        var mainContent = $('.maincontent');  // so we dont have to keep querying for .maincontent

        $('.answer, .question').remove();
        if (dispAnswer === 0) {
            mainContent.append($('<h2>').text("Correct!"));
        }
        else if (dispAnswer === 1 ) {
            mainContent.append($('<h2>').text("Incorrect!"));
        }
        else if (dispAnswer === 2) {
            mainContent.append($('<h2>').text("Time is up!"));
        }
        mainContent.append($('<h2>').html("The answer is: " + game.questions[game.cI].correctAnswer + "<br><br>"));
        mainContent.append($('<img>').attr("src", game.questions[game.cI].img));
    },
    resultsScreen: function () {
        // display final score screen
        var mainContent = $('.maincontent');
        mainContent.empty();
        var percentCorrect = Math.round((game.correct/game.questions.length)*100);
        this.log(percentCorrect);
        mainContent.append($('<div>').html("<h1>Results:</h1>"));
        mainContent.append($('<div>').html("<h2>Correct: " + game.correct + "</h2>"));
        mainContent.append($('<div>').html("<h2>Incorrect: " + game.incorrect + "</h2>"));
        mainContent.append($('<div>').html("<h2>Unanswered: " + game.unanswered + "</h2><br>"));
        mainContent.append($('<div>').html("<h2>You scored " + percentCorrect + "% correct!!<br><br><br>"));
        mainContent.append($("<div class='restart rowCSS'>").html("<h2>Click to retry!</h2>"));

        game.themeSong.pause();
        game.themeSong.currentTime = 0;
        game.gameOver.play();
        game.ceremony.play();

        $('.restart').on("click", function() {
            // restart the game
            game.cI = 0;
            game.timeLeft = 20;
            game.correct = 0;
            game.incorrect = 0;
            game.unanswered = 0;
            mainContent.empty();
            game.startTrivia();
        });
    },

    // laziness
    log: function (text) {
        console.log(text);
    },
};


$(function () {
    // start the game
    game.startTrivia();
})