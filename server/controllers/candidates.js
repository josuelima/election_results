'use strict';

var _         = require('underscore');
var candidate = require('../models/candidate');

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
