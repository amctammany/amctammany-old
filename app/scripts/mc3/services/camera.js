'use strict';

angular.module('mctApp')
  .factory('Camera', function (Vector3, Object3d) {
    var Camera = function () {
      Object3d.call(this);

      this.target = new Vector3(0, 0, 1);
      this.up = new Vector3(0, 1, 0);

    };

    Camera.prototype = Object.create(Object3d.prototype);
    return Camera;
  });
