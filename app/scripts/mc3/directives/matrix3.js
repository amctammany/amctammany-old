'use strict';

angular.module('mctApp')
  .directive('matrix3', function () {
    return {
      templateUrl: 'templates/matrix3.html',
      restrict: 'E',
      transclude: true,
      scope: {
        elements: '=data'
      }
    };
  });
