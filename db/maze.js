'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MazeSchema = new Schema({
	name: {type: String, required: true},
  urlString: String,
  config: String
});
MazeSchema.pre('save', function (next) {
  if (this.name) { this.urlString = this.name.toLocaleLowerCase().replace(/\s+/g, '-'); }
  next();
});

mongoose.model('Maze', MazeSchema);
