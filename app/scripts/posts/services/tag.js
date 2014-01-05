'use strict';

angular.module('mctApp')
  .factory('Tag', function ($resource) {
    return $resource('tags/:name', {name: '@urlString'}, {
    });
  });

