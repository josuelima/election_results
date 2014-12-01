'use strcit';

var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var port    = 3000;

var subSocket = require('./lib/subscribe');
var votes     = require('./models/vote');

server.listen(port, function(){
  console.log('Server is listening on port %d', port);
});

/**
 * define where to look for static files
 */
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

io.sockets.on('connection', function(socket){
  votes.get(function(err, data){
    if(err) return;
    data.forEach(function(vote) {
      socket.emit('vote', vote);
    });
  });
});

subSocket.on('message', function(message){
  io.sockets.emit('vote', message);
});

