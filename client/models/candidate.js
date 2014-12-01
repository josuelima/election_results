'use strict';

var request = require('request');

/**
 * Get candidates from server
 * @param  {Function} callback
 */
exports.get = function(callback) {
  request('http://localhost:8080/candidates', function(err, response, body){
    callback(err, JSON.parse(body));
  });
};