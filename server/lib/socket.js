'use strict';

var axon   = require('axon');
var socket = axon.socket('pub');

socket.bind('8081');

/**
 * Send a vote to the subscribers
 * @param  {Vote} vote
 */
exports.send = function(vote) {
  socket.send(vote);
}
