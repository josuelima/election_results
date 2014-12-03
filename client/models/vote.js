'use strict';

var request = require('request');

/**
 * Get votes from server
 * @param {Function} callback
 */
exports.get = function(api_url, callback) {
  request(api_url + '/votes', function(err, response, body){
    callback(err, JSON.parse(body));
  });
};