'use strict';

var express    = require('express');
var parser     = require('body-parser');
var votes      = require('./controllers/votes');
var candidates = require('./controllers/candidates');
var app        = express();
var port       = process.env.PORT || 8000;

/**
 * Middleware to parse all requests to json
 */
app.use(parser.json());

/**
 *  Allows third party clients to connect to the socket server
 */
app.use(function(request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/**
 * Saves votes and broadcast to subscribers
 */
app.post('/votes', votes.save, votes.send);

/**
 * Get votes
 */
app.get('/votes', votes.get);

/**
 * Saves candidate
 */
app.post('/candidates', candidates.save, candidates.send);

/**
 * Get candidates
 */
app.get('/candidates', candidates.get);

app.listen(port, function(){
  console.log('Server is listening on port %d', port);
});
