var express = require('express');
var weather = require('./services/weather.js');
var app = express();

app.get('/', function(request, response){
  response.sendFile(__dirname + "/Pages/Home/home.html");
});
app.get('/home.js', function(request, response){
  response.sendFile(__dirname + "/Pages/Home/home.js");
});

weather.weather.getWeather();

/*
var port = process.env['PORT'] || 80;

var server = app.listen(80, function() {
  var host = server.address().address

  console.log('Listening at http://%s:%s', host, port);
});*/
