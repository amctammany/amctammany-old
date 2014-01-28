'use strict';

angular.module('mctApp')
  .filter('groupBy', function () {
    return function (items, size) {
      var groups = [],
          inner;
      for(var i = 0; i < items.length; i++) {
        if (i % size === 0) {
          inner = [];
          groups.push(inner);
        }
        inner.push(items[i]);
      }
      return groups;
    };
  });
