'use strict';

module.exports = function (app) {
  require('./posts')(app);
  require('./tags')(app);
  app.get('/', function (req, res) {
    console.log('foo');
    res.render('index', {
      title: 'Express'
    });
  });
};
