'use strict';

angular.module('mctApp')
  .factory('Vector3', function () {
    var Vector3 = function (x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    };

    // mul => Multiply vector by scalar => New Vector
    Vector3.prototype.mul = function (s) {
      var x = this.x * s,
          y = this.y * s,
          z = this.z * s;
      return new Vector3(x, y, z);
    };

    // imul => Multiply vector by scalar => Same Vector
    Vector3.prototype.imul = function (s) {
      this.x *= s;
      this.y *= s;
      this.z *= s;

      return this;
    };
    // div => Divide vector by scalar => New Vector
    Vector3.prototype.div = function (s) {
      var x = this.x / s,
          y = this.y / s,
          z = this.z / s;
      return new Vector3(x, y, z);
    };
    // idiv => Divide vector by scalar => Same Vector
    Vector3.prototype.idiv = function (s) {
      this.x /= s;
      this.y /= s;
      this.z /= s;

      return this;
    };
    // add => Add vector to vector => new Vector
    Vector3.prototype.add = function (v) {
      var x = this.x + v.x,
          y = this.y + v.y,
          z = this.z + v.z;
      return new Vector3(x, y, z);
    };
    // iadd => Add vector to vector => Same Vector
    Vector3.prototype.iadd = function (v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    };
    // addVectors => Add two vectors and set to self
    Vector3.prototype.addVectors = function (a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
    };
    // sub => Subtract vector from vector => new Vector
    Vector3.prototype.sub = function (v) {
      var x = this.x - v.x,
          y = this.y - v.y,
          z = this.z - v.z;
      return new Vector3(x, y, z);
    };
    // iadd => Add vector to vector => Same Vector
    Vector3.prototype.isub = function (v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    };

    // subVectors => Subtract two vectors and set to self
    Vector3.prototype.subVectors = function (a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
    };
    // dot => Vector dot product Vector => Scalar
    Vector3.prototype.dot = function (v) {
      var sum = this.x * v.x + this.y * v.y + this.z * v.z;
      return sum;
    };

    // cross => Vector cross product Vector => Vector
    Vector3.prototype.cross = function (v) {
      var x = this.y * v.z - this.z * v.y;
      var y = this.z * v.x - this.x * v.z;
      var z = this.x * v.y - this.y * v.x;
      return new Vector3(x, y, z);
    };

    // crossVectors => Set self to cross product of a and b
    Vector3.prototype.crossVectors = function (a, b) {
      var ax = a.x, ay = a.y, az = a.z;
      var bx = b.x, by = b.y, bz = b.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;

      return this;
    }


    // length => Scalar
    Vector3.prototype.length = function () {
      var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      return length;
    };

    // squaredLength => Scalar
    Vector3.prototype.squaredLength = function () {
      var length = (this.x * this.x + this.y * this.y + this.z * this.z);
      return length;
    };

    // normalize => Vector (w/ length = 1)
    Vector3.prototype.normalize = function () {
      var d = this.length();
      return new Vector3(this.x / d, this.y / d, this.z / d);
    };
    Vector3.prototype.zero = function () {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      return this;
    };

    Vector3.Zero = function () {
      return new Vector3(0, 0, 0);
    };
    Vector3.TransformCoordinates = function (v, matrix) {
      var result = Vector3.Zero()
      var me = matrix.elements;
      var x = (v.x * me[0]) + (v.y * me[4]) + (v.z * me[8]) + me[12];
      var y = (v.x * me[1]) + (v.y * me[5]) + (v.z * me[9]) + me[13];
      var z = (v.x * me[2]) + (v.y * me[6]) + (v.z * me[10]) + me[14];
      var w = (v.x * me[3]) + (v.y * me[7]) + (v.z * me[11]) + me[15];
      result.x = x / w;
      result.y = y / w;
      result.z = z / w;

      return result;

    };

    return Vector3;
  });

