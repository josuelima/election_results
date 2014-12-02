'use strict';

var db     = require('../lib/db');
var socket = require('../lib/socket');
var _      = require('underscore');

/**
 * Save votes to database
 * @param {Array} votes
 */
exports.save = function(vote, callback) {
  db.lpush('votes', JSON.stringify(vote), function(err){
    if(err) return callback(err, null);
    callback(null, null);
  });
};

/**
 * Send votes to subscribers
 * @param {Array} votes
 */
exports.send = function(callback) {
  var votes = exports.get(function(err, data) {
    if(err) return callback(err, null);

    socket.send('votes', JSON.stringify(data));
  });
};

/**
 * Get votes from db
 * @return {JSON}
 */
exports.get = function(callback) {
  db.lrange('votes', 0, -1, function(err, data){
    if(err) return callback(err, null);

    /**
     * Sum candidates votes
     */
    var totals = _.countBy(data.map(JSON.parse), function(vote){
      return vote.candidate_tag;
    });

    callback(null, totals);
  });
};
