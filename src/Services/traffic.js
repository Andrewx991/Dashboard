var querystring = require('querystring');
var request = require('request');

module.exports = {
  getTrafficData: function(options, callback) {
    var escapedApiKey = querystring.escape(options.apiKey);
    var escapedFrom = querystring.escape(options.from);
    var escapedTo = querystring.escape(options.to);

    var path = 'http://www.mapquestapi.com/directions/v2/route?key=' + escapedApiKey + '&from=' + escapedFrom + '&to=' + escapedTo;

    request(path, function(err, response, body){
      if (err) {
        callback(err);
        return;
      }

      body = JSON.parse(body);

      callback(null, {
        timeInSeconds: body.route.realTime
      });
    });
  }
};
