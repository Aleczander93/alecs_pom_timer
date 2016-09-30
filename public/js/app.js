(function() {

  //initialize variables
  var startButton = $("#start");
  var seconds = $("#seconds");
  var minutes = $("#minutes");
  var breakButton = $('#break');
  var isOnBreak = false;
  var timerInterval;
  var stopButton = $("#stop");
  var resetButton = $('#reset');
  var body = $('body');

  //main functionality
  startButton.on("click", startTimer);
  breakButton.on('click', startBreak);
  stopButton.on('click', stopTimer);
  resetButton.on('click', resetTimer);
  body.onkey('click', stopTimer);

  //function definition
function startBreak (){
  //set that we are on a break
  isOnBreak = true;
  //set the minutes to 5 minutes
  minutes.text('00');
  //set the seconds to 0 seconds
  seconds.text('05');
  //hide the break button
  breakButton.hide();
  //start the timer
  startTimer();
  }

  document.body.onkeyup = function(e) {
    console.log(timerInterval);
    if (e.keycode ==32) {
      e.preventDefault();
      stopTimer();
    }
  };


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
      timerInterval=null;
      //add 5 minutes to cup
      minutes.text('00');
      seconds.text('08');
      //reenable start button
      startButton.attr('disabled', false);
      //unhide the break button
      breakButton.hide();
    }
    else {
      //reset to 25 minutes and empty timer cup
      clearInterval(timerInterval);
      timerInterval=null;
      minutes.text('00');
      seconds.text('10');
      //disable start button
      startButton.attr('disabled', false);
      //hide break button
      breakButton.hide();
      isOnBreak=false;
    }
}




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

      if (!isOnBreak) {
        //disable the start button
        startButton.attr('disabled' , true);
        //unhide the break button
        breakButton.show();

    } else {

      minutes.text('25');
      seconds.text('00');
      startButton.attr('disabled', false);
      isOnBreak = false;
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
