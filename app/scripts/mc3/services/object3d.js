'use strict';

angular.module('mctApp')
  .factory('Object3d', function (Vector3, Matrix4) {
    var Object3d = function () {
      this.position = new Vector3(0, 0, 0);
      this.rotation = new Vector3(0, 0, 0);

      this.matrix = new Matrix4();
      this.matrixWorld = new Matrix4();

    };
    return Object3d;
  });
