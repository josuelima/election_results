'use strict';

var db     = require('../lib/db');
var socket = require('../lib/socket');

/**
 * Save votes to database
 * @param {Array} votes
 */
exports.save = function(votes, callback) {
  if(votes.length == 0) return callback(null, null);
  var vote = votes.pop();

  db.lpush('votes', JSON.stringify(vote), function(err){
    if(err) return callback(err, null);
    exports.save(votes, callback);
  });
};

/**
 * Send votes to subscribers
 * @param {Array} votes
 */
exports.send = function(votes, callback) {
  votes.forEach(function(vote) {
    socket.send('votes', vote);
  });
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
