'use strict';
var mongoose = require('mongoose');
    //_ = require('underscore');
module.exports = function (app) {
	var	Tag = mongoose.model('Tag');
  //var Tag = mongoose.model('Tag');
// GET /posts => Index
  app.get('/tags', function (req, res) {
    Tag.find()
      .populate('posts')
      .exec(function (err, tags) {
        if (err) { console.log(err); }
        res.send(tags);
      });
  });
};

