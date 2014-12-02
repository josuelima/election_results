'use strict';

var request = require('request');

/**
 * Get votes from server
 * @param {Function} callback
 */
exports.get = function(callback) {
  request('http://localhost:8080/votes', function(err, response, body){
    callback(err, JSON.parse(body));
  });
};