'use strict';

var candidate = require('../models/candidate');

/**
 * Uses model to save candidate
 */
exports.save = function(req, res, next) {
  candidate.save(req.body, function(err){
    if(err) return res.json(503, { error: true });
    next();
  })
};

/**
 * Send candidate to subscribers
 */
exports.send = function(req, res, next) {
  candidate.send(req.body);
  res.status(200).send('success');
};

/**
 * Get candidates from model
 */
exports.get = function(req, res) {
  candidate.get(function(err, data) {
    if(err) return res.json(503, { error: true });
    res.status(200).send(data);
  });
};
