'use strict';

angular.module('mctApp')
  .factory('Post', function ($resource) {
    return $resource('posts/:name', {name: '@urlString'}, {
    });
  });
