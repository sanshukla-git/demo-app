const compression = require('compression')
const express = require('express');
const path = require('path');
const app = express();

app.use(compression());
// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname + '/dist')));
// Start the app by listening on the default
// Heroku port
app.listen((process && process.env && process.env.PORT) || 8080);

console.log('server running and listening on: ' + ((process && process.env && process.env.PORT) || 8080));
