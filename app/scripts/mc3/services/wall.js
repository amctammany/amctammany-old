'use strict';

angular.module('mctApp')
  .factory('Wall', function (Object3d, Vector3) {
    var Wall = function (center, normal, tangent, width, height, color) {
      this.center = new Vector3(center[0], center[1], center[2]);
      this.normal = new Vector3(normal[0], normal[1], normal[2]).normalize();
      this.tangent = new Vector3(tangent[0], tangent[1], tangent[2]).normalize();
      this.width = width;
      this.halfWidth = width / 2;
      this.height = height;
      this.halfHeight = height / 2;
      this.color = color;

      this.getVertices();
      Object3d.call(this);

    };

    Wall.prototype = Object.create(Object3d.prototype);

    Wall.prototype.getGLInfo = function () {
      var vertices = [];
      this.vertices.forEach(function (v) {
        vertices.push(v.x);
        vertices.push(v.y);
        vertices.push(v.z);
      });


      var colors = this.color.concat(this.color).concat(this.color).concat(this.color);

      var indices = [
        0, 1, 2,
        0, 2, 3
      ];
      var lineColors = [
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
      ];
      var lineIndices = [
        0, 1,
        1, 2,
        2, 3,
        3, 0
      ];
      return {
        vertices: vertices,
        colors: colors,
        indices: indices,
        lineColors: lineColors,
        lineIndices: lineIndices
      };

    };
    Wall.prototype.getVertices = function () {
      var planeY = this.normal.cross(this.tangent).normalize();
      var planeX = this.normal.cross(planeY).normalize();

      planeY.imul(this.halfHeight * -1);
      planeX.imul(this.halfWidth * - 1);

      var tl = this.center.sub(planeX).isub(planeY);
      var tr = this.center.add(planeX).isub(planeY);
      var br = this.center.add(planeX).iadd(planeY);
      var bl = this.center.sub(planeX).iadd(planeY);
      var vertices = [tl, tr, br, bl];


      this.vertices = vertices;

      return vertices;
    };

    return Wall;
  });
