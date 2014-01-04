'use strict';

module.exports = function (app) {
  app.get('/', function (req, res) {
    console.log('foo');
    res.render('index', {
      title: 'Express'
    });
  });
};
