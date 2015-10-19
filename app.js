var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');

require('./env.js');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/refresh', function (req, res) {
  io.sockets.emit('refresh');
  res.send('Refreshed!');
});

server.listen(3000);

io.on('connect', function () {
  fetchWeather();

  // Fetch the weather every 15 mins
  setInterval(fetchWeather, 900000);
});

function fetchWeather () {
  var url = 'https://api.forecast.io/forecast/' + process.env['FORECASTIO_KEY'] + '/' + process.env['LAT_LONG'];
  request(url, function (error, resp, body) {
    if (!error && resp.statusCode === 200) {
      var result = JSON.parse(body);
      var data = {
        "currentTemp": parseInt(result.currently.temperature),
        "summary": result.currently.summary,
        "icon": result.currently.icon.replace(/-/g, '_').toUpperCase()
      };

      io.sockets.emit('weatherUpdate', data);
    }
  });
}
