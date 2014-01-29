'use strict';
var mongoose = require('mongoose');
    //_ = require('underscore');
module.exports = function (app) {
	var	Molecule = mongoose.model('Molecule');
// GET /molecules => Index
  app.get('/molecules', function (req, res) {
    Molecule.find()
      .exec(function (err, molecules) {
        if (err) { console.log(err); }
        res.send(molecules);
      });
  });
// GET /molecules/name => Read
  app.get('/molecules/:name', function (req, res) {
    Molecule.findOne({urlString: req.params.name})
      .populate('tags')
      .exec(function (err, molecule) {
      if (err) { console.log(err); }
            // console.log(molecule)
      res.send(molecule);
    });
  });
// molecule /molecules/name => Update
  app.post('/molecules/:name', function (req, res) {
    console.log(req.body);
    Molecule.findOne({urlString: req.params.name}, function (err, molecule) {
      if (err) {console.log(err);}
      molecule.name = req.body.name;
      molecule.molFile = req.body.molFile;
      molecule.normalizedMolFile = req.body.normalizedMolFile;
      molecule.save(function (err) {
        if (err ) { console.log(err); }
        res.send(molecule);
      });
    });

  });

// DEL /molecules/name => Remove
  app.del('/molecules/:name', function (req, res) {
    Molecule.findOneAndRemove({urlString: req.params.name}, function (err, molecule) {
      if (err) {console.log(err);}
      res.send(molecule);
    });
  });
// molecule /molecules => Create
  app.post('/molecules', function (req, res) {
    var molecule = new Molecule(req.body);
    molecule.save(function (err) {
      if (err) { console.log(err); }
      res.send(molecule);
    });
  });
};

