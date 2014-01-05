'use strict';
var mongoose = require('mongoose'),
  _ = require('underscore'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  tagNames: String,
  urlString: String,
  createdAt: {type: Date, default: Date.now}
});
PostSchema.pre('save', function (next) {
  if(this.title) { this.urlString = this.title.toLocaleLowerCase().replace(/\s+/g, '-'); }
  this.parseTags(next);
});
PostSchema.methods.parseTags = function (cb) {
  var tagArray = this.tagNames.split(' ');
  this.tags = [];
  var self = this;
  var findOrCreateTag = function (name) {
    mongoose.model('Tag').findOneAndUpdate({name: name}, {name: name}, {upsert: true}, function (err, tag) {
      if (err) {console.log(err);}
      if (!_.contains(tag.posts, self._id)) {
        console.log('pushing post to tag');
        tag.posts.push(self);
        tag.save();
      }
      self.tags.push(tag);
      if (self.tags.length === tagArray.length) {
        cb();
      }
    });
  };
  tagArray.map(findOrCreateTag);

};

mongoose.model('Post', PostSchema);

