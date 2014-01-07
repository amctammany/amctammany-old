'use strict';

angular.module('mctApp')
  .factory('Object3d', function (Vector3) {
    var Object3d = function () {
      this.position = new Vector3(0, 0, 0);

    };
    return Object3d;
  });
