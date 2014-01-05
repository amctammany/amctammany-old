'use strict';
var mongoose = require('mongoose');

module.exports = function (app) {
  var Post = mongoose.model('Post');
  var Tag = mongoose.model('Tag');

  function cullTags () {
    Tag.find()
      .populate('posts')
      .exec(function (err, tags) {
        tags.forEach(function (tag) {
          if (tag.posts.length === 0) {
            console.log('Tag: ' + tag + ' has no posts ');
            tag.remove(function (err, removedTag) {
              console.log(removedTag);
            });
          }
        });
      });
  }
// GET /posts => Index
  app.get('/posts', function (req, res) {
    Post.find()
      .populate('tags')
      .exec(function (err, posts) {
        if (err) { console.log(err); }
        res.send(posts);
      });
  });
// GET /posts/name => Read
  app.get('/posts/:name', function (req, res) {
    Post.findOne({urlString: req.params.name})
      .populate('tags')
      .exec(function (err, post) {
      if (err) { console.log(err); }
            // console.log(post)
      res.send(post);
    });
  });
// POST /posts/name => Update
  app.post('/posts/:name', function (req, res) {
    console.log(req.body);
    Post.findOne({urlString: req.params.name}, function (err, post) {
      if (err) {console.log(err);}
      post.title = req.body.title;
      post.tagNames = req.body.tagNames;
      post.content = req.body.content;
      post.save(function (err) {
        if (err ) { console.log(err); }
        res.send(post);
      });
    });

  });

// DEL /posts/name => Remove
  app.del('/posts/:name', function (req, res) {
    Post.findOneAndRemove({urlString: req.params.name}, function (err, post) {
      if (err) {console.log(err);}
      res.send(post);
    });
    cullTags();
  });
// POST /posts => Create
  app.post('/posts', function (req, res) {
    var post = new Post(req.body);
    post.save(function (err) {
      if (err) { console.log(err); }
      res.send(post);
    });
  });
};

