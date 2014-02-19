'use strict';

angular.module('mctApp')
  .factory('Mesh', function (Object3d) {
    var Mesh = function (name, verticesCount) {
      this.name = name;
      this.vertices = new Array(verticesCount);
      this.lines = [];
      Object3d.call(this);
    };

    Mesh.prototype = Object.create(Object3d.prototype);

    Mesh.prototype.connectVertices = function (i1, i2) {
      var v1 = this.vertices[i1];
      var v2 = this.vertices[i2];
      this.lines.push({
        start: v1,
        end: v2,
      });
    };

    return Mesh;
  });
