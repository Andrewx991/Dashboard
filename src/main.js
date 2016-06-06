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

var lat = configuration.weather.cities[0].latitude;
var long = configuration.weather.cities[0].longitude;
weather.getWeatherForLocation(lat, long, function(weather) {
  console.log(weather.currentSummary);
  console.log(weather.nextDaySummary);
  console.log(weather.nextWeekSummary);
  console.log(weather.temperature);
  console.log(weather.windSpeedMph);
});
schedule.getNextTenEvents(function(events){
  if (events.length == 0) {
    console.log('No upcoming events found.');
  } else {
    console.log('Upcoming 10 events:');
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var start = event.start.dateTime || event.start.date;
      console.log('%s - %s', start, event.summary);
    }
  }
});
/*
var port = process.env['PORT'] || 80;

var server = app.listen(80, function() {
  var host = server.address().address

  console.log('Listening at http://%s:%s', host, port);
});*/
