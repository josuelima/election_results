'use strcit';

var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io').listen(server);
var port    = 3000;

var subSocket  = require('./lib/subscribe');
var votes      = require('./models/vote');
var candidates = require('./models/candidate');

server.listen(port, function(){
  console.log('Server is listening on port %d', port);
});

/**
 * Define where to look for static files
 */
app.use(express.static('public'));

/**
 * Main page
 */
app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

/**
 * Get initial candidates and votes
 */
io.sockets.on('connection', function(socket){
  candidates.get(function(err, data){
    if(err) return;
    data.forEach(function(candidate) {
      socket.emit('candidates', candidate);
    });
  });
});

/**
 * Wait for new messages
 */
subSocket.on('message', function(channel, message){
  io.sockets.emit(channel, message);
});
