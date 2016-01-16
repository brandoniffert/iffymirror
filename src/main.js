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
    var currently = data.currentTemp + '&deg;F ' + ' (' + data.apparentTemp + '&deg;F) ' + data.summary;
    $conditions.innerHTML = currently;
    skycons.set('currently-skycon', Skycons[data.icon]);
    skycons.play();
  });
};

var setDateTime = function () {
  $time.innerHTML = moment().format('HH:mm');
  $date.innerHTML = moment().format('ddd MMM Do, YYYY');
};

var setIntervals = function () {
  setInterval(setDateTime, 500);
};

setupConnection();
setDateTime();
setIntervals();
