'use strict';

angular.module('mctApp')
  .factory('Vector4', function () {
    var Vector4 = function (x, y, z, w) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = (w !== undefined) ? w : 1;
    };

    Vector4.prototype.set = function (x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    };

    Vector4.prototype.copy = function (v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      this.w = (v.w !== undefined) ? v.w : 1;
      return this;
    };

    Vector4.prototype.applyMatrix4 = function (m) {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      //var w = this.w;

      var e = m.elements;
      this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
      this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
      this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
      this.w = e[3] * x + e[7] * y + e[11] * z + e[15];

      return this;
    };


    return Vector4;
  });
