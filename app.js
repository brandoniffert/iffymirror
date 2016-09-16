var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');
var fs = require('fs');

require('./env.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

var opts = {
  root: path.join(__dirname, 'public'),
  lastModified: false
};

var connected = false;

app.get('/', function (req, res) {
  res.sendFile('index.html', opts);
});

app.get('/refresh', function (req, res) {
  io.sockets.emit('refresh');
  res.send('Refreshed!');
});

server.listen(3000);

io.on('connect', function () {
  fetchWeather();

  // Fetch every 10 mins
  if (!connected) {
    setInterval(fetchWeather, 600000);
    connected = true;
  }
});

function fetchWeather () {
  var url = 'https://api.forecast.io/forecast/' + process.env['FORECASTIO_KEY'] + '/' + process.env['LAT_LONG'];
  request(url, function (error, resp, body) {
    if (!error && resp.statusCode === 200) {
      var result = JSON.parse(body);
      var next3Days = [];

      var currentTemp = parseInt(result.currently.temperature);
      var apparentTemp = parseInt(result.currently.apparentTemperature);

      if (currentTemp === apparentTemp) {
        apparentTemp = false;
      }

      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      for (var i = 1; i < 4; i++) {
        var dayData = result.daily.data[i];
        var date = new Date();
        date.setTime(dayData.time * 1000);

        next3Days.push({
          "day": days[date.getDay()],
          "highTemp": parseInt(dayData.temperatureMax),
          "lowTemp": parseInt(dayData.temperatureMin),
          "icon": dayData.icon.replace(/-/g, '_').toUpperCase(),
          "summary": dayData.summary.replace(/\./g, '')
        });
      }

      var data = {
        "currentTemp": currentTemp,
        "apparentTemp": apparentTemp,
        "summary": result.currently.summary,
        "icon": result.currently.icon.replace(/-/g, '_').toUpperCase(),
        "next3Days": next3Days
      };

      io.sockets.emit('weatherUpdate', data);
    }
  });
}
