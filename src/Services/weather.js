var fileSystem = require('fs');
var path = require('path');
var request = require('request');

module.exports = {
  weather: {
    getWeather: function() {
      var apiKeyDirectory = path.resolve(__dirname, '../../', 'apikeys');
      var forecastApiKeyFullPath = apiKeyDirectory + '\\forecast';
      console.log(forecastApiKeyFullPath);
      var cities = [
        { name: 'Blue Bell, PA', coordinates: [40.144722, -75.268889] }
      ];

      fileSystem.readFile(forecastApiKeyFullPath, {encoding: 'utf-8'}, function(err, data){
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
    }
  }
};
