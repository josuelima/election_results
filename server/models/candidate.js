'use strict';

var db     = require('../lib/db');
var socket = require('../lib/socket');

/**
 * Save cadidate to database
 * @param {Array} votes
 */
exports.save = function(candidate, callback) {
  db.lpush('votes', JSON.stringify(candidate), function(err){
    if(err) return callback(err, null);
    callback(null, null)
  });
};

/**
 * Send votes to socket
 * @param {Array} votes
 */
exports.send = function(votes, callback) {
  votes.forEach(socket.send);
};

/**
 * Get votes from db
 * @return {JSON}
 */
exports.get = function(callback) {
  db.lrange('votes', 0, -1, function(err, data){
    if(err) return callback(err, null);
    callback(null, data.map(JSON.parse));
  });
};
