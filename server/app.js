'use strict';

var express = require('express');
var parser  = require('body-parser');
var votes   = require('./controllers/votes');
var app     = express();
var port    = 8080;

/**
 * Middleware to parse all requests to json
 */
app.use(parser.json());

/**
 * Saves votes and broadcast to subscribers
 */
app.post('/', votes.save, votes.send);

/**
 * Get votes
 */
app.get('/votes', votes.get);

app.listen(port, function(){
  console.log('Server is listening on port %d', port);
});
