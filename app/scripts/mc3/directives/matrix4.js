'use strict';

angular.module('mctApp')
  .directive('matrix4', function () {
    return {
      templateUrl: 'templates/matrix4.html',
      restrict: 'E',
      transclude: true,
      scope: {
        matrix: '=data'
      },
    };
  });
