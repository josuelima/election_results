'use strict';

$(function(){

  var socket = io.connect();

  socket.on('vote', function(vote){
    console.log(vote.candidate);
  });

});