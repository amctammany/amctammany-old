'use strict';

module.exports = function (app) {
  require('./posts')(app);
  require('./tags')(app);
  require('./mazes')(app);
  require('./molecules')(app);
  app.get('/', function (req, res) {
    res.render('index', {
      title: 'Express'
    });
  });
  app.get('/matrix4.js', function (req, res) {
    res.sendfile('app/scripts/mc3/services/matrix4.js');
  });
};
