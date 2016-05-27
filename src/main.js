var fileSystem = require('fs');
var path = require('path');
var express = require('express');
var request = require('request');

var app = express();

app.get('/', function(request, response){
  response.sendFile(__dirname + "/Pages/Home/home.html");
});
app.get('/home.js', function(request, response){
  response.sendFile(__dirname + "/Pages/Home/home.js");
});

// Weather Forecast via Forecast.io
var apiKeyDirectory = path.resolve(__dirname, '..', 'apikeys');
var forecastApiKeyFullPath = path.join(apiKeyDirectory, 'forecast');
var cities = [
  { name: 'Blue Bell, PA', coordinates: [40.144722, -75.268889] }
];
var forecastApiKey = fileSystem.readFile(forecastApiKeyFullPath, {encoding: 'utf-8'}, function(err, data){
  if (err) {
    console.log('Error loading forecast API key: ' + err);
    process.exit(1);
    return;
  }
  
  var path = 'https://api.forecast.io/forecast/' + data.slice(0, data.length-1) + '/' + cities[0].coordinates[0] + ',' + cities[0].coordinates[1];
  request(path, function(err, response, body){
    if (err) console.log(err);
    else {
      var currentWeather = JSON.parse(body);
      console.log('Currently: ' + currentWeather.currently.summary);
      console.log('Temperature: ' + currentWeather.currently.temperature);
      console.log('Wind Speed: ' + currentWeather.currently.windSpeed + 'mph');
      console.log('Hourly Forecast: ' + currentWeather.hourly.summary);
      console.log('Daily Forecast: ' + currentWeather.daily.summary);
    }
  });
});

var port = process.env['PORT'] || 80;

var server = app.listen(port, function() {
  var host = server.address().address;

  console.log('Listening at http://%s:%s', host, port);
});
