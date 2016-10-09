(function() {

// make audio work!

  //initialize variables
  var startButton = $("#start");
  var seconds = $("#seconds");
  var minutes = $("#minutes");
  var breakButton = $('#break');
  var longButton = $('#long');
  var isOnBreak = false;
  var isOnLong = false;
  var timerInterval;
  var stopButton = $("#stop");
  var resetButton = $('#reset');
  var body = $('body');
  var spaceBar = true;
  var count = 0;
  var audioFile = new Audio ('');

  //main functionality
  startButton.on("click", startTimer);
  breakButton.on('click', startBreak);
  stopButton.on('click', stopTimer);
  resetButton.on('click', resetTimer);
  longButton.on('click', startLong);
  body.on('keyup', keyboardStop);

  //function definition
function startBreak (){
  //set that we are on a break
  isOnBreak = true;
  //set the minutes to 5 minutes
  minutes.text('00');
  //set the seconds to 0 seconds
  seconds.text('03');
  //hide the break button
  breakButton.hide();
  longButton.hide();
  //start the timer
  startTimer();
  // to count amt click
  counter=count+1;
  count=counter;
  }

function startLong () {
  isOnLong = true;
  //set the minutes to 15 mint
  minutes.text('00');
  //set the seconds to 0 seconds
  seconds.text('03');
  //hide the long break button
  longButton.hide();
  breakButton.hide();
  //start the timer
  startTimer();
  count =0;
  counter=0;
}

function keyboardStop(e) {
  if (!spaceBar) {
    e.keyCode = 32;
    console.log('stuff');
    e.preventDefault();
    stopTimer();
    spaceBar=true;
} else {
    e.keyCode = 32;
    console.log('otherstuff');
    e.preventDefault();
    startTimer();
    spaceBar=false;
}

}
  function startTimer (){
    console.log(timerInterval);
    if(!timerInterval){
      timerInterval = setInterval(countdown, 1000);
    }
  }

  function stopTimer(){
    clearInterval(timerInterval);
    timerInterval = null;
    }

  function resetTimer(){
    //reset timer
    console.log(timerInterval);
    if(isOnBreak){
      //empty timer cup
      clearInterval(timerInterval);
      timerInterval = null;
      //add 5 minutes to cup
      minutes.text('00');
      seconds.text('03');
      //reenable start button
      startButton.attr('disabled', false);
      //unhide the break button
      breakButton.hide();
    }

    if (isOnLong){
      clearInterval(timerInterval);
      timerInterval=null;
      //add 15 minutes to cup
      minutes.text('00');
      seconds.text('15');
      //reenable start button
      startButton.attr('disabled', false);
      //unhide the break button
      longButton.hide();
    }

    else {
      //reset to 25 minutes and empty timer cup
      clearInterval(timerInterval);
      timerInterval=null;
      minutes.text('00');
      seconds.text('03');
      //disable start button
      startButton.attr('disabled', false);
      //hide break button
      breakButton.hide();
      isOnBreak=false;
      longButton.hide();
      isOnLong=false;
    }
}

//keep track of how many times we've clicked shortbreak
//after 3times disable showrtbreak and enable longbreak
//then after a long break disable longbreak and enable shortbreak again

  function countdown(){
    var secondsText = seconds.text ();
    var secondsTextAsNumber = parseInt(secondsText);
    var minutesText = minutes.text();
    var minutesTextAsNumber = parseInt(minutesText);
    //console.log(typeof secondsText);
    //console.log(typeof secondsTextAsNumber);

    if (minutesTextAsNumber === 0 && secondsTextAsNumber === 0){
      //stop!
      clearInterval(timerInterval);
      timerInterval = null;
      audioFile.play();

      if (!isOnBreak) {
        //disable the start button
        startButton.attr('disabled' , true);
        //unhide the break button
        breakButton.show();
        //to count after each break

      if (!isOnLong && counter==2) {
        startButton.attr('disabled' , true);
        longButton.show();
        breakButton.hide();

        }


    } else {
      minutes.text('00');
      seconds.text('03');
      startButton.attr('disabled', false);
      isOnBreak = false;
      isOnlong = false;
    }
      return;
    }
    if (secondsTextAsNumber === 0) {
      if (minutesTextAsNumber !== 0){
      var decreaseMinutesAsNumberByOne = minutesTextAsNumber -1;
      var padminutesTextAsNumber = pad(decreaseMinutesAsNumberByOne);
      minutes.text(padminutesTextAsNumber);
    }
    seconds.text ("59");
      //then change seconds text to 59
  } else {
    var decreasedSecondsAsNumberByOne = secondsTextAsNumber - 1;
    var padSecondsTextAsNumber = pad(decreasedSecondsAsNumberByOne);
    seconds.text(padSecondsTextAsNumber);
  }

    // var secondsValue = parseInt(seconds.text());
    // console.log(secondsValue);
    // seconds.text(pad(secondsValue - 1));
    //transforms letter to text
  }

    function pad (num){
        if(num < 10){
          //spit out number with a leading 0
          return "0" + num;

      } else {
        //spit out the original number
        return num;
      }
    }
}());
