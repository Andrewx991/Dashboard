var fileSystem = require('fs');
var path = require('path');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

module.exports = {
  getNextTenEvents: function(callback) {
    var apiKeyDirectory = path.join(__dirname, '..', '..', 'apikeys');
    var googleApiKeyFullPath = path.join(apiKeyDirectory, 'google-calendar');

    fileSystem.readFile(googleApiKeyFullPath, {encoding: 'utf-8'}, function(err, data){
      if (err) {
        console.log('Error loading google calendar API key: ' + err);
        return;
      }

      authorize(JSON.parse(data), makeCallbackFunc(callback));
    });
  }
}

function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fileSystem.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token) {
 try {
   fileSystem.mkdirSync(TOKEN_DIR);
 } catch (err) {
   if (err.code != 'EEXIST') {
     throw err;
   }
 }
 fileSystem.writeFile(TOKEN_PATH, JSON.stringify(token));
 console.log('Token stored to ' + TOKEN_PATH);
}

function makeCallbackFunc(callback) {
  return function(auth) {
    var calendar = google.calendar('v3');
    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var events = response.items;
      callback(events);

    });
  };
}
