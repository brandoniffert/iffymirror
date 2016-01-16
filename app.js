var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');

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

  // Fetch the weather every 10 mins
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
      var data = {
        "currentTemp": parseInt(result.currently.temperature),
        "apparentTemp": parseInt(result.currently.apparentTemperature),
        "summary": result.currently.summary,
        "icon": result.currently.icon.replace(/-/g, '_').toUpperCase()
      };

      io.sockets.emit('weatherUpdate', data);
    }
  });
}
