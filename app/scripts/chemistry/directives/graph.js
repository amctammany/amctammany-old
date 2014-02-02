'use strict';

angular.module('mctApp')
  .directive('graph', function ($window) {
    return {
      templateUrl: 'templates/graph.html',
      restrict: 'E',
      replace: true,
      transclude: true,
      link: function postLink(scope, element, attrs) {
        var width = element[0].clientWidth;
        // Hack to make square
        var height = element[0].clientHeight;

        var midX = width / 2;
        var midY = height / 2;
        var canvas = element[0].children[1];
        var ctx = canvas.getContext('2d');
        var graphFunc = scope[attrs.func];
        var arrayParser = /\[(\-?\d+\.?\d*)\,\s*(\-?\d+\.?\d*)\]/;
        var matches = attrs.rangeX.match(arrayParser);
        var minX = parseFloat(matches[1]);
        var maxX = parseFloat(matches[2]);
        var xRange = maxX - minX;
        var minY, maxY;
        if (attrs.rangeY) {
          matches = attrs.rangeY.match(arrayParser);
          minY = matches[1];
          maxY = matches[2];
        } else {
          minY = 10000;
          maxY = -10000;

        }

        var x = minX;
        var xArray = [];
        var increment = parseFloat(attrs.increment);
        while (x <= maxX) {
          xArray.push(x);
          x += increment;
        }
        var points = [];
        xArray.forEach(function (x) {
          var y = graphFunc(x);
          if (y < minY) {
            minY = y;
          }
          if (y > maxY) {
            maxY = y;
          }
          points.push({x: x, y: y});
        });
        var yRange = (maxY - minY) * 3;

        function resizeCanvas () {
          width = element[0].clientWidth;
          console.log(element[0].clientHeight);
          height = width * 0.67;
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');
          midX = width / 2;
          midY = height / 2;
          draw();
        }
        function cartesianToCanvas (pt) {
          return {
            x: ((pt.x) / xRange) * width + midX,
            y: ((pt.y) / yRange) * height + midY
          };
        }
        function draw () {
          var cartesian = points.map(cartesianToCanvas);
          ctx.moveTo(cartesian[0].x, cartesian[0].y);
          for (var i = 1, l = cartesian.length; i < l; i++) {
            var pt = cartesian[i];
            ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
        }

        resizeCanvas();
        $window.onresize = resizeCanvas;
      }
    };
  });
