var fileSystem = require('fs');
var path = require('path');
var querystring = require('querystring');
var request = require('request');

module.exports = {
  getTrafficData: function(options, callback) {
    var apiKeyDirectory = path.join(__dirname, '..', '..', 'apikeys');
    var forecastApiKeyFullPath = path.join(apiKeyDirectory, 'mapquest');

    fileSystem.readFile(forecastApiKeyFullPath, {encoding: 'utf-8'}, function(err, apiKey){
      if (err) {
        callback('Error loading forecast API key: ' + err);
        return;
      }

      var escapedApiKey = querystring.escape(apiKey.trim());
      var escapedFrom = querystring.escape(options.from);
      var escapedTo = querystring.escape(options.to);

      var path = 'http://www.mapquestapi.com/directions/v2/route?key=' + escapedApiKey + '&from=' + escapedFrom + '&to=' + escapedTo;

      request(path, function(err, response, body){
        if (err) {
          callback('Error requesting traffic data: ' + err);
          return;
        }

        body = JSON.parse(body);

        callback(null, {
          timeInSeconds: body.route.realTime
        });
      });
    });
  }
};
