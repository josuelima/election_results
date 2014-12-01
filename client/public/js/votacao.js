'use strict';

$(function(){

  var socket = io.connect();

  socket.on('candidates', function(candidate){
    console.log(candidate);
  });

});