var fileSystem = require('fs');
var path = require('path');
var request = require('request');

module.exports = {
  getWeatherForLocation: function(latitude, longitude) {
    var apiKeyDirectory = path.join(__dirname, '..', '..', 'apikeys');
    var forecastApiKeyFullPath = path.join(apiKeyDirectory, 'forecast');

    fileSystem.readFile(forecastApiKeyFullPath, {encoding: 'utf-8'}, function(err, data){
      if (err) {
        console.log('Error loading forecast API key: ' + err);
        return;
      }

      var apiKey = data.trim();
      var path = 'https://api.forecast.io/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?units=us';

      request(path, function(err, response, body){
        if (err) {
          console.log('Error requesting weather data: ' + err);
          return;
        }

        var currentWeather = JSON.parse(body);
        console.log('Currently: ' + currentWeather.currently.summary);
        console.log('Temperature: ' + currentWeather.currently.temperature);
        console.log('Wind Speed: ' + currentWeather.currently.windSpeed + 'mph');
        console.log('Next few hours: ' + currentWeather.hourly.summary);
        console.log('Next few days: ' + currentWeather.daily.summary);
      });
    });
  }
};
