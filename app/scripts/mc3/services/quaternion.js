'use strict';

angular.module('mctApp')
  .factory('Quaternion', function () {
    var Quaternion = function (x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    };

    Quaternion.prototype.toRotationMatrix = function (matrix) {
      var me = matrix.elements;

      var xx = this.x * this.x;
      var yy = this.y * this.y;
      var zz = this.z * this.z;
      var xy = this.x * this.y;
      var zw = this.z * this.w;
      var zx = this.z * this.x;
      var yw = this.y * this.w;
      var yz = this.y * this.z;
      var xw = this.x * this.w;

      me[0] = 1.0 - (2.0 * (yy + zz));
      me[1] = 2.0 * (xy + zw);
      me[2] = 2.0 * (zx - yw);
      me[3] = 0.0;
      me[4] = 2.0 * (xy - zw);
      me[5] = 1.0 - (2.0 * (zz + xx));
      me[6] = 2.0 * (yz + xw);
      me[7] = 0.0;
      me[8] = 2.0 * (zx + yw);
      me[9] = 2.0 * (yz -xw);
      me[10] = 1.0 - (2.0 * (yy + xx));
      me[11] = 0.0;
      me[12] = 0.0;
      me[13] = 0.0;
      me[14] = 0.0;
      me[15] = 1.0;

      return matrix;


    };


    Quaternion.RotationYawPitchRoll = function (yaw, pitch, roll) {
      var result = new Quaternion(0, 0, 0, 1);

      var halfRoll = roll * 0.5;
      var halfPitch = pitch * 0.5;
      var halfYaw = yaw * 0.5;

      var sinRoll = Math.sin(halfRoll);
      var cosRoll = Math.cos(halfRoll);
      var sinPitch = Math.sin(halfPitch);
      var cosPitch = Math.cos(halfPitch);
      var sinYaw = Math.sin(halfYaw);
      var cosYaw = Math.cos(halfYaw);

      result.x = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);
      result.y = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);
      result.z = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);
      result.w = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);
      return result;
    };
    return Quaternion;
  });
