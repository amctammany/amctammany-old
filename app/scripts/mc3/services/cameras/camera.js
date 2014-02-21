'use strict';

angular.module('mctApp')
  .factory('Camera', function (Vector3, Object3d, Matrix4) {
    var Camera = function (fov, aspect, near, far) {
      Object3d.call(this);

      this.fov = fov !== undefined ? fov : 50;
      this.aspect = aspect !== undefined ? aspect : 1;
      this.near = near !== undefined ? near : 0.1;
      this.far = far !== undefined ? far : 2000;

      this.matrixWorldInverse = new Matrix4();
      this.projectionMatrix = new Matrix4();

      this.updateProjectionMatrix();
    };


    Camera.prototype = Object.create(Object3d.prototype);

    Camera.prototype.move = function () {
      Object3d.prototype.move.apply(this, arguments);
      console.log(this.findVisible());
      console.log('move camera');
    };
    Camera.prototype.findVisible = function () {

      this.visibleObjects = [];
      var x = new Vector3(-1, 0, 0);
      console.log(this.world);
      var l = this.position.add(x);
      console.log(this.visibleObjects);
      console.log(l);
      return this.visibleObjects;

    };
    Camera.prototype.updateProjectionMatrix = function () {
      if (this.fullWidth) {
        var aspect = this.fullWidth / this.fullHeight;
        var top = Math.tan((this.fov * 0.5 * Math.PI / 180)) * this.near;
        var bottom = -top;
        var left = aspect * bottom;
        var right = aspect * top;
        var width = Math.abs(right - left);
        var height = Math.abs(top - bottom);

        this.projectionMatrix.makeFrustum(
          left + this.x * width / this.fullWidth,
          left + (this.x + this.width) * width / this.fullWidth,
          top - (this.y + this.height) * height / this.fullHeight,
          top - this.y * height / this.fullHeight,
          this.near,
          this.far
        );
      } else {
        this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far);
      }
    };
    return Camera;
  });
