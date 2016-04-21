var moment = require('moment');
var socket = io();

var $time = document.getElementById('time');
var $date = document.getElementById('date');

var skycons = new Skycons({ color: 'white' });

var setupConnection = function () {
  socket.on('refresh', function () {
    window.location.reload();
  });

  socket.on('weatherUpdate', function (data) {
    var $conditions = document.getElementById('currently-conditions');
    var $upcoming = document.getElementById('upcoming-conditions');
    var currently = data.currentTemp + '&deg;F ';

    if (data.apparentTemp) {
      currently += ' (' + data.apparentTemp + '&deg;F) ';
    }
    currently += data.summary;

    $conditions.innerHTML = currently;
    skycons.set('currently-skycon', Skycons[data.icon]);

    var upcomingHtml = '';

    data.next3Days.forEach(function (day, index) {
      var html = '<li><canvas id="upcoming-icon-' + index + '" width="30" height="30"></canvas>';
      html += day.day + ' ' + day.highTemp + '&deg;F/' + day.lowTemp + '&deg;F ' + day.summary;
      html += '</li>';

      upcomingHtml += html;
    });

    $upcoming.innerHTML = upcomingHtml;

    data.next3Days.forEach(function (day, index) {
      skycons.set('upcoming-icon-' + index, Skycons[day.icon]);
    });

    skycons.play();
  });

  socket.on('triviaFreeAnswer', function (data) {
    var $trivia = document.getElementById('trivia');

    if (data) {
      $trivia.style.display = 'block';
      $trivia.innerHTML = data;
    }
    else {
      $trivia.style.display = 'none';
    }
  });
};

var setDateTime = function () {
  $time.innerHTML = moment().format('HH:mm');
  $date.innerHTML = moment().format('ddd MMM D, YYYY');
};

var setIntervals = function () {
  setInterval(setDateTime, 500);
};

setupConnection();
setDateTime();
setIntervals();
