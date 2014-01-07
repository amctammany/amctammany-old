'use strict';

angular.module('mctApp')
  .factory('MazeStore', function ($resource) {
    return $resource('mazes/:name', {name: '@urlString'});
  });
