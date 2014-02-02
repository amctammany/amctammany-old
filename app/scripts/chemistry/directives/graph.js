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
        if (attrs.rangeY) {
          matches = attrs.rangeY.match(arrayParser);
          var minY = matches[1];
          var maxY = matches[2];
        } else {
          var minY = 10000;
          var maxY = -10000;

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






        function cartesianToCanvas (pt) {
          return {
            x: ((pt.x) / xRange) * width + midX,
            y: ((pt.y) / yRange) * height + midY
          };
        }
        function getPoint (x) {
          return {
            x: x,
            y: graphFunc(x)
          };
        }
        var cartesian = points.map(function (pt) {
          return cartesianToCanvas(pt);
        });
        console.log(cartesian);

        var canvas = element[0].children[0];
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.moveTo(cartesian[0].x, cartesian[0].y);
        for (var i = 1, l = cartesian.length; i < l; i++) {
          var pt = cartesian[i];
          ctx.lineTo(pt.x, pt.y);
        }
        //var pt = getPoint(xArray[0]);
        //var drawPt = cartesianToCanvas(pt);
        //ctx.moveTo(drawPt.x, drawPt.y);
        //for (var i = 1, l = xArray.length; i < l; i++) {
          //pt = getPoint(xArray[i]);
          //drawPt = cartesianToCanvas(pt);
          //ctx.lineTo(drawPt.x, drawPt.y);
        //}

        ctx.stroke();
      }
    };
  });
