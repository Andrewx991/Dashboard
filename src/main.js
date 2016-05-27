var express = require('express');
var weather = require('./Services/weather.js');
var schedule = require('./Services/schedule.js');
var app = express();

app.get('/', function(request, response){
  response.sendFile(__dirname + "/Pages/Home/home.html");
});
app.get('/home.js', function(request, response){
  response.sendFile(__dirname + "/Pages/Home/home.js");
});

var configuration = {
  weather: {
    cities: [
      {name: 'Blue Bell, PA', latitude: 40.144722, longitude: -75.268889},
      {name: 'Radnor, PA', latitude: 40.036389, longitude: -75.3725}
    ]
  }
}

//weather.weather.getWeather(configuration.weather.cities[0].latitude, configuration.weather.cities[0].longitude);
schedule.schedule.get();
/*
var port = process.env['PORT'] || 80;

var server = app.listen(80, function() {
  var host = server.address().address

  console.log('Listening at http://%s:%s', host, port);
});*/
