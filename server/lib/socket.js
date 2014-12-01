'use strict';

var axon   = require('axon');
var socket = axon.socket('pub');

socket.bind(8081);

/**
 * Send a message to the subscribers
 * @param {String} channel message topic
 * @param {Object} message message to be sent
 */
exports.send = function(channel, message) {
  socket.send(channel, message);
}
