'use strict';

angular.module('mctApp')
  .factory('MoleculeStore', function ($resource) {
    return $resource('molecules/:name', {name: '@urlString'});
  });
