'use strict';

var _    = require('underscore');
var vote = require('../models/vote');

/**
 * Uses model to save votes
 */
exports.save = function(req, res, next) {
  var votesList = _.clone(req.body);
  vote.save(votesList, function(err){
    if(err) return res.json(503, { error: true });
    next();
  })
};

/**
 * Send votes to subscribers
 */
exports.send = function(req, res, next) {
  var votesList = _.clone(req.body);
  vote.send(votesList);
  res.status(200).send('success');
};

/**
 * Get votes from model
 */
exports.get = function(req, res) {
  vote.get(function(err, data) {
    if(err) return res.json(503, { error: true });
    res.status(200).send(data);
  });
};
