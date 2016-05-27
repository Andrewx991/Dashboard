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
var server = app.listen(80, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port);
});*/
