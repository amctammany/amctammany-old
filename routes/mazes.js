'use strict';
var mongoose = require('mongoose');
    //_ = require('underscore');
module.exports = function (app) {
	var	Maze = mongoose.model('Maze');
// GET /mazes => Index
  app.get('/mazes', function (req, res) {
    Maze.find()
      .exec(function (err, mazes) {
        if (err) { console.log(err); }
        res.send(mazes);
      });
  });
// GET /mazes/name => Read
  app.get('/mazes/:name', function (req, res) {
    Maze.findOne({urlString: req.params.name})
    .exec(function (err, maze) {
      if (err) { console.log(err); }
      res.send(maze);
    });
  });
// maze /mazes/name => Update
  app.post('/mazes/:name', function (req, res) {
    console.log(req.body);
    Maze.findOne({urlString: req.params.name}, function (err, maze) {
      if (err) {console.log(err);}
      maze.name = req.body.name;
      maze.config = req.body.config;
      maze.save(function (err) {
        if (err ) { console.log(err); }
        res.send(maze);
      });
    });

  });

// DEL /mazes/name => Remove
  app.del('/mazes/:name', function (req, res) {
    Maze.findOneAndRemove({urlString: req.params.name}, function (err, maze) {
      if (err) {console.log(err);}
      res.send(maze);
    });
  });
// maze /mazes => Create
  app.post('/mazes', function (req, res) {
    var maze = new Maze(req.body);
    maze.save(function (err) {
      if (err) { console.log(err); }
      res.send(maze);
    });
  });
};

