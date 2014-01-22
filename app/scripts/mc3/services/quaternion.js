'use strict';

angular.module('mctApp')
  .factory('Quaternion', function () {
    var Quaternion = function (x, y, z, w) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = (w !== undefined) ? w : 1;
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


    Quaternion.prototype.multiply = function (q) {
      return this.multiplyQuaternions(this, q);
    };
    Quaternion.prototype.multiplyQuaternions = function (a, b) {
      var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
      var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

      this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
      return this;
    }
    Quaternion.prototype.setFromAxisAngle = function (axis, angle) {
      var halfAngle = angle / 2, s = Math.sin(halfAngle);

      this.x = axis.x * s;
      this.y = axis.y * s;
      this.z = axis.z * s;
      this.w = Math.cos(halfAngle);
      return this;
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
