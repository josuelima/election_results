'use strict';
var parameterize = require('parameterize')
var db           = require('../lib/db');
var socket       = require('../lib/socket');

/**
 * Save cadidate to database
 * @param {JSON} candidate
 */
exports.save = function(candidate, callback) {
  console.log(candidate);
  // create candidate tag
  candidate['tag'] = parameterize(candidate.name);

  db.lpush('candidates', JSON.stringify(candidate), function(err){
    if(err) return callback(err, null);
    callback(null, null)
  });
};

/**
 * Send candidate to subscribers
 * @param {JSON} candidate
 */
exports.send = function(candidate, callback) {
  socket.send('candidates', candidate);
};

/**
 * Get votes from db
 * @return {JSON}
 */
exports.get = function(callback) {
  db.lrange('candidates', 0, -1, function(err, data){
    if(err) return callback(err, null);
    callback(null, data.map(JSON.parse));
  });
};
