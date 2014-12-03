'use strcit';

var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io').listen(server);
var port    = 3000;

var subSocket  = require('./lib/subscribe');
var votes      = require('./models/vote');
var candidates = require('./models/candidate');
var api_url    = 'http://localhost:8000';

server.listen(port, function(){
  console.log('Server is listening on port %d', port);
});

/**
 *  Allows third party clients to connect to the socket server
 */
app.use(function(request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/**
 * Define where to look for static files
 */
app.use(express.static('public'));

/**
 * For users watching
 */
app.get('/', function(req, res){
  res.locals = {admin: false, api_url: api_url};
  res.render('main.ejs');
});

/**
 * For admins (add votes and candidates)
 */
app.get('/dashboard', function(req, res){
  res.locals = {admin: true, api_url: api_url};
  res.render('main.ejs');
});

/**
 * Get initial candidates and votes
 */
io.sockets.on('connection', function(socket){
  candidates.get(api_url, function(err, data){
    if(err) return;
    data.forEach(function(candidate) {
      socket.emit('candidates', candidate);
    });
  });

  votes.get(api_url, function(err, data){
    if(err) return;
    socket.emit('votes', data);
  });
});

/**
 * Wait for new messages
 */
subSocket.on('message', function(channel, message){
  io.sockets.emit(channel, message);
});
