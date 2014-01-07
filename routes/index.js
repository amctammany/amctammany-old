'use strict';

module.exports = function (app) {
  require('./posts')(app);
  require('./tags')(app);
  require('./mazes')(app);
  app.get('/', function (req, res) {
  });
};
