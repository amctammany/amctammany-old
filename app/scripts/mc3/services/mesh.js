'use strict';

angular.module('mctApp')
  .factory('Mesh', function (Object3d) {
    var Mesh = function (name, verticesCount) {
      this.name = name;
      this.vertices = new Array(verticesCount);
      Object3d.call(this);
    };

    Mesh.prototype = Object.create(Object3d.prototype);

    return Mesh;
  });
