'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: {type: String, required: true},
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

mongoose.model('Tag', TagSchema);
