'use strict';

angular.module('mctApp')
  .directive('matrix', function () {
    return {
      templateUrl: 'templates/matrix.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the matrix directive');
      }
    };
  });
