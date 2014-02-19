'use strict';

angular.module('mctApp')
  .factory('Plane', function () {
    var Plane = function (vertices, colors, indices) {
      this.vertices = vertices;
      this.colors = colors;
      this.indices = indices;

    };

    return Plane;
  });
