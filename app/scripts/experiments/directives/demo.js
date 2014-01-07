'use strict';

angular.module('mctApp')
  .directive('demo', function ($window) {
    return {
      templateUrl: 'templates/demo.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element) {

        function resizeCanvas() {
          var width = element[0].clientWidth;
          var height = element[0].clientHeight;
          canvas = element[0].children[0];
          canvas.width = width;
          canvas.height = height;
          scope.initDemo(canvas);
        }

        var canvas;
        resizeCanvas();
        $window.onresize = resizeCanvas;
      }
    };
  });
