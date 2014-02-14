'use strict';

angular.module('mctApp')
  .factory('Matrix3', function () {
    var Matrix3 = function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      this.elements = new Float32Array(9);

      this.set(
        (n11 !== undefined) ? n11 : 1, n12 || 0, n13 || 0,
        n21 || 0, (n22 !== undefined) ? n22 : 1, n23 || 0,
        n31 || 0, n32 || 0, (n33 !== undefined) ? n33 : 1
      );


    };

    Matrix3.prototype.set = function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      var te = this.elements;

      te[0] = n11; te[3] = n12; te[6] = n13;
      te[1] = n21; te[4] = n22; te[7] = n23;
      te[2] = n31; te[5] = n32; te[8] = n33;

      return this;
    };

    Matrix3.prototype.identity = function () {
      this.set(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      );
      return this;
    };

    Matrix3.prototype.copy = function (m) {
      var me = m.elements;

      this.set(
        me[0], me[3], me[6],
        me[1], me[4], me[7],
        me[2], me[5], me[8]
      );

      return this;
    };

    Matrix3.prototype.fromMatrix4 = function (m) {
      var me = m.elements;

      this.set(
        me[0], me[4], me[8],
        me[1], me[5], me[9],
        me[2], me[6], me[10]
      );

      return this;
    };

    Matrix3.prototype.multiplyScalar = function (s) {
      var te = this.elements;
      te[0] *= s; te[3] *= s; te[6] *= s;
      te[1] *= s; te[4] *= s; te[7] *= s;
      te[2] *= s; te[5] *= s; te[8] *= s;
      return this;
    };

    Matrix3.prototype.getInverse = function (matrix) {
      // Input: Matrix 4
      var me = matrix.elements;
      var te = this.elements;

      te[0] = me[10] * me[5] - me[6] * me[9];
      te[1] = - me[10] * me[1] + me[2] * me[9];
      te[2] = me[6] * me[1] - me[2] * me[5];
      te[3] = - me[10] * me[4] + me[6] * me[8];
      te[4] = me[10] * me[0] - me[2] * me[8];
      te[5] = - me[6] * me[0] + me[2] * me[4];
      te[6] = me[9] * me[4] - me[5] * me[8];
      te[7] = - me[9] * me[0] + me[1] * me[8];
      te[8] = me[5] * me[0] - me[1] * me[4];

      var det = me[0] * te[0] + me[1] * te[3] + me[2] * te[6];

      if (det === 0) {
        console.warn('Fail. Determinant = 0');

        this.identity();
        return this;
      }

      this.multiplyScalar(1.0 / det);

      return this;
    };

    Matrix3.prototype.invert = function () {
      var te = this.elements;
      var a11 = te[0], a12 = te[1], a13 = te[2];
      var a21 = te[3], a22 = te[4], a23 = te[5];
      var a31 = te[6], a32 = te[7], a33 = te[8];

      var b12 = a33 * a22 - a23 * a32;
      var b22 = -a33 * a21 + a23 * a31;
      var b32 = a32 * a21 - a22 * a31;

      var det = a11 * b12 + a12 * b22 + a13 * b32;

      if (!det) {
        return null;
      }
      det = 1.0 / det;

      te[0] = b12 * det;
      te[1] = (-a33 * a12 + a13 * a32) * det;
      te[2] = (a23 * a12 - a13 * a22) * det;
      te[3] = b22 * det;
      te[4] = (a33 * a11 - a13 * a31) * det;
      te[5] = (-a23 * a11 + a13 * a21) * det;
      te[6] = b32 * det;
      te[7] = (-a32 * a11 + a12 * a31) * det;
      te[8] = (a22 * a11 - a12 * a21) * det;

      return this;
    };

    Matrix3.prototype.transpose = function () {
      var te = this.elements;
      var a12 = te[1], a13 = te[2], a23 = te[5];
      te[1] = te[3];
      te[2] = te[6];
      te[3] = a12;
      te[5] = te[7];
      te[6] = a13;
      te[7] = a23;

      return this;
    };

    Matrix3.prototype.clone = function () {
      var te = this.elements;
      return new Matrix3(
        te[0], te[3], te[6],
        te[1], te[4], te[7],
        te[2], te[5], te[8]
      );
    };

    return Matrix3;
  });
