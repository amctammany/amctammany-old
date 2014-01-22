'use strict';

angular.module('mctApp')
  .factory('Projector', function (Matrix4) {
    var Projector = function () {

      this.viewMatrix = new Matrix4();
      this.viewProjectionMatrix = new Matrix4();

      this.modelViewProjectionMatrix = new Matrix4();

    };

    Projector.prototype.projectWorld = function (world, camera) {
      if (world.autoUpdate === true) { world.updateMatrixWorld();}
      if (camera.parent === undefined) { camera.updateMatrixWorld();}

      this.viewMatrix.copy(camera.matrixWorldInverse.getInverse(camera.matrixWorld));
      this.viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, this.viewMatrix);

    };

    return Projector;
  });
