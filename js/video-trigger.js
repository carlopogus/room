$(document).ready(function(){
  var tv = $('.tv--1');
  var video = $('video');
  var tvPlaying = false;
  var tvTimer = 0;
  var tvTimerWait = 2;

  var wh = $(window).height();
  var ww = $(window).width();

  setInterval(testing, 1000);


  function testing() {
    var x = $(window).width() / 2;
    var y = $(window).height() / 2;
    var tvPos = tv[0].getBoundingClientRect();

    var alignedX = (tvPos.left < x && tvPos.right > x);
    var alignedY = (tvPos.top < y && tvPos.bottom > y);

    if (alignedX && alignedY) {
      if (tvTimer >= tvTimerWait && !tvPlaying) {
        tvTimer = 0;
        tvPlaying = true;
        tv.removeClass('tv__static');
        tv.removeClass('tv__off');
        tv.addClass('tv__playing');
        video.get(0).play();
      }
      else if (tvTimer < tvTimerWait && !tvPlaying) {
        tv.addClass('tv__static');
        tvTimer++;
      }
    }
    else {
      if (!video.get(0).paused) {
        video.get(0).pause();
        tv.addClass('tv__static');
        tv.addClass('tv__off');
        tv.removeClass('tv__playing');
      }
      else if (tvTimer < tvTimerWait && tvPlaying) {
        tvTimer++;
      }
      else {
        tvPlaying = false;
        tvTimer = 0;
        tv.removeClass('tv__static');
      }
    }

  }
});