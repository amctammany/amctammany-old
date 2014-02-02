'use strict';

angular.module('mctApp')
  .directive('graph', function () {
    return {
      templateUrl: 'templates/graph.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var width = element[0].clientWidth;
        // Hack to make square
        var height = element[0].clientWidth;

        var midX = width / 2;
        var midY = height / 2;

        var graphFunc = scope[attrs.func];
        var arrayParser = /\[(\-?\d+\.?\d*)\,\s*(\-?\d+\.?\d*)\]/;
        var matches = attrs.rangeX.match(arrayParser);
        var minX = parseFloat(matches[1]);
        var maxX = parseFloat(matches[2]);
        var xRange = maxX - minX;
        matches = attrs.rangeY.match(arrayParser);
        var minY = matches[1];
        var maxY = matches[2];
        var yRange = maxY - minY;

        var x = minX;
        var xArray = [];
        while (x <= maxX) {
          xArray.push(x);
          x += 1;
        }



        function cartesianToCanvas (pt) {
          return {
            x: ((pt.x - 0) / xRange) * width + midX,
            y: ((pt.y - 0) / yRange) * height + midY
          };
        }
        function getPoint (x) {
          return {
            x: x,
            y: graphFunc(x)
          };
        }

        var canvas = element[0].children[0];
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        var pt = getPoint(xArray[0]);
        var drawPt = cartesianToCanvas(pt);
        console.log(pt);
        console.log(drawPt);
        ctx.moveTo(drawPt.x, drawPt.y);
        for (var i = 1, l = xArray.length; i < l; i++) {
          pt = getPoint(xArray[i]);
          drawPt = cartesianToCanvas(pt);
          ctx.lineTo(drawPt.x, drawPt.y);
        }

        ctx.stroke();
        console.log(graphFunc);
      }
    };
  });
