var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');
var fs = require('fs');
var spawn = require('child_process').spawn;

require('./env.js');

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

var opts = {
  root: path.join(__dirname),
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

server.listen(3001);

io.on('connect', function () {
  fetchWeather();
  fetchUrbanWord();

  // Fetch weather every 5 mins, word every 1 hour
  if (!connected) {
    setInterval(fetchWeather, 1000 * 60 * 5);
    setInterval(fetchUrbanWord, 1000 * 60 * 60);
    connected = true;
  }
});

function fetchWeather() {
  var url = 'https://api.forecast.io/forecast/' + process.env['FORECASTIO_KEY'] + '/' + process.env['LAT_LONG'];
  request(url, function (error, resp, body) {
    if (!error && resp.statusCode === 200) {
      var result = JSON.parse(body);
      var nextDays = [];

      var currentTemp = parseInt(result.currently.temperature);

      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      for (var i = 1; i < 4; i++) {
        var dayData = result.daily.data[i];
        var date = new Date();
        date.setTime(dayData.time * 1000);

        nextDays.push({
          dayName: days[date.getDay()],
          highTemp: parseInt(dayData.temperatureMax),
          lowTemp: parseInt(dayData.temperatureMin),
          summary: dayData.summary.replace(/\./g, '')
        });
      }

      var data = {
        todayTemp: currentTemp,
        todayShortSummary: result.currently.summary.replace(/\./g, ''),
        todaySummary: result.daily.data[0].summary.replace(/\./g, ''),
        todayIcon: result.currently.icon.replace(/-/g, '_').toUpperCase(),
        todayHigh: parseInt(result.daily.data[0].temperatureMax),
        todayLow: parseInt(result.daily.data[0].temperatureMin),
        nextDays: nextDays
      };

      io.sockets.emit('weatherUpdate', data);
    }
  });
}

function fetchUrbanWord() {
  var script = spawn('python', ['urban-dictionary-word.py']);

  script.stdout.on('data', function (data) {
    io.sockets.emit('urbanWordUpdate', JSON.parse(data.toString()));
  });
}
