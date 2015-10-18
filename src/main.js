var moment = require('moment');
var socket = io();

var $time = document.getElementById('time');
var $date = document.getElementById('date');

var setupConnection = function () {
  socket.on('refresh', function () {
    window.location.reload();
  });

  socket.on('weatherUpdate', function (data) {
    var currently = data.currentTemp + '&deg;F ' + data.summary;
    document.getElementById('currently').innerHTML = currently;
  });
};

var setDateTime = function () {
  $time.innerHTML = moment().format('HH:mm');
  $date.innerHTML = moment().format('MMM Do, YYYY');
};

var setIntervals = function () {
  setInterval(setDateTime, 500);
};

setupConnection();
setDateTime();
setIntervals();
