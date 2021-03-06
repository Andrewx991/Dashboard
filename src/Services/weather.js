var fileSystem = require('fs');
var path = require('path');
var request = require('request');

module.exports = {
  getWeatherForLocation: function(latitude, longitude, callback) {
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

        callback({
          currentSummary: currentWeather.currently.summary,
          nextDaySummary: currentWeather.hourly.summary,
          nextWeekSummary: currentWeather.daily.summary,
          temperature: currentWeather.currently.temperature,
          windSpeedMph: currentWeather.currently.windSpeed
        });
      });
    });
  }
};
