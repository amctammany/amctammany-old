'use strict';

angular.module('mctApp')
  .directive('threeDemo', function () {
    return {
      template: '<div class="three"></div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.initDemo(element[0]);
        console.log('foo')
      }
    };
  });
