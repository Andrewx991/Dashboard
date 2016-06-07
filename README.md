# Dashboard
Playing around with node...

## Set Up:

1. Make an 'apikeys' folder, next to src folder
2. Add apikeys for each integration, see below
3. `node main.js`

## Forecast.io Access

Apikeys file name: forecast

Instructions:

1. Make account at Forecast.io
2. Paste API key in file

## Google Calendar Access

Apikeys file name: google-calendar

Instructions:

1. See https://developers.google.com/google-apps/calendar/quickstart/nodejs#prerequisites
2. Follow the Turn on the Google Calendar API steps, use the resulting json as file content.
3. You will need to follow the console instructions the first time you run the app.

It will store credentials locally and you should be ok from then on.

## MapQuest Access

Apikeys file name: mapquest

1. Make account at developer.mapquest.com
2. Create or select your Application
3. Paste the Consumer Key into file

