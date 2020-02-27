
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


myContainer = $('.container');

// myTitle = $("<div class='row'><div class='col-lg-12'>");
myTitle = $("<div class='row'>");
myTitle.addClass("col-lg-12");
myContainer.append(myTitle);