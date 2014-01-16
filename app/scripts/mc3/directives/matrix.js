'use strict';

angular.module('mctApp')
  .directive('matrix', function () {
    return {
      templateUrl: 'templates/matrix.html',
      restrict: 'E',
      transclude: true,
      scope: {
        matrix: '=data'
      },
    };
  });
