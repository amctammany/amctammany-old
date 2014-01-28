'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MoleculeSchema = new Schema({
	name: String,
  urlString: String,
  molFile: String,
  normalizedMolFile: String
});
MoleculeSchema.pre('save', function (next) {
  if(this.name) { this.urlString = this.name.toLocaleLowerCase().replace(/\s+/g, '-'); }
  next();
});

mongoose.model('Molecule', MoleculeSchema);

