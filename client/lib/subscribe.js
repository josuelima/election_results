'use strict';

var axon   = require('axon');
var socket = axon.socket('sub');

socket.connect(8081);

socket.on('error', function(err){
  throw err;
});

socket.on('message', function(msg){
  console.log(msg.toString());
});

module.exports = socket;
