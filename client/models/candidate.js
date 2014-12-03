'use strict';

var request = require('request');

/**
 * Get candidates from server
 * @param {Function} callback
 */
exports.get = function(api_url, callback) {
  request(api_url + '/candidates', function(err, response, body){
    callback(err, JSON.parse(body));
  });
};