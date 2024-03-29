'use strict';

angular.module('mctApp')
  .factory('Matrix4', function (Vector3, Quaternion) {
    var Matrix4 = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
      this.elements = new Float32Array(16);
      var te = this.elements;

      te[0] = (n11 !== undefined) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;
      te[1] = n21 || 0; te[5] = (n22 !== undefined) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;
      te[2] = n31 || 0; te[6] = n32 || 0; te[10] = (n33 !== undefined) ? n33 : 1; te[14] = n34 || 0;
      te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = (n44 !== undefined) ? n44 : 1;
    };

    Matrix4.prototype.toString = function () {
      var te = this.elements;
      var l1 = [te[0], te[4], te[8], te[12]].join(',');
      var l2 = [te[1], te[5], te[9], te[13]].join(',');
      var l3 = [te[2], te[6], te[10], te[14]].join(',');
      var l4 = [te[3], te[7], te[11], te[15]].join(',');

      var lines = [l1, l2, l3, l4].join('\n');
      return lines;
    };
    Matrix4.prototype.set = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
      var te = this.elements;
      te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
      te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
      te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
      te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

      return this;
    };

    Matrix4.prototype.identity = function () {
      this.set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      );
      return this;
    };

    Matrix4.prototype.transpose = function () {
      var te = this.elements;
      var tmp;

      tmp = te[1]; te[1] = te[4]; te[4] = tmp;
      tmp = te[2]; te[2] = te[8]; te[8] = tmp;
      tmp = te[6]; te[6] = te[9]; te[9] = tmp;

      tmp = te[3]; te[3] = te[12]; te[12] = tmp;
      tmp = te[7]; te[7] = te[13]; te[13] = tmp;
      tmp = te[11]; te[11] = te[14]; te[14] = tmp;

      return this;

    };
    Matrix4.prototype.copy = function (m) {
      this.elements.set(m.elements);
      return this;
    };

    Matrix4.prototype.compose = function (position, quaternion, scale) {
      this.makeRotationFromQuaternion(quaternion);
      this.scale(scale);
      this.setPosition(position);
      return this;
    };

    Matrix4.prototype.scale = function (v) {
      var te = this.elements;
      var x = v.x, y = v.y, z = v.z;

      te[0] *= x; te[4] *= y; te[8] *= z;
      te[1] *= x; te[5] *= y; te[9] *= z;
      te[2] *= x; te[6] *= y; te[10] *= z;
      te[3] *= x; te[7] *= y; te[11] *= z;
      return this;
    };
    Matrix4.prototype.multiply = function (m) {
      var result = new Matrix4();
      result.multiplyMatrices(this, m);
      return result;
    };

    Matrix4.prototype.multiplyMatrices = function (a, b) {

      var ae = a.elements;
      var be = b.elements;
      var te = this.elements;

      var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
      var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
      var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
      var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

      var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
      var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
      var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
      var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

      te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
      te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
      te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
      te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

      te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
      te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
      te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
      te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

      te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
      te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
      te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
      te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

      te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
      te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
      te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
      te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

      return this;
    };

    Matrix4.prototype.multiplyScalar = function (s) {
      var te = this.elements;

      te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
      te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
      te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
      te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;

      return this;
    };
    Matrix4.prototype.getInverse = function (m) {
      var te = this.elements;
      var me = m.elements;

      var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
      var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
      var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
      var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

      te[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
      te[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
      te[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
      te[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
      te[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
      te[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
      te[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
      te[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
      te[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
      te[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
      te[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
      te[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
      te[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
      te[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
      te[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
      te[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;

      var det = n11 * te[ 0 ] + n21 * te[ 4 ] + n31 * te[ 8 ] + n41 * te[ 12 ];

      if (det === 0) {
        console.warn('Cannot invert matrix. Determinant is 0 ');
        this.identity();
        return this;
      }
      this.multiplyScalar(1/det);
      return this;
    };

    Matrix4.prototype.translate = function (v) {
      var te = this.elements;
      //var x = v.x, y = v.y, z = v.z;
      var x = v[0], y = v[1], z = v[2];

      te[12] = te[0] * x + te[4] * y + te[8] * z + te[12];
      te[13] = te[1] * x + te[5] * y + te[9] * z + te[13];
      te[14] = te[2] * x + te[6] * y + te[10] * z + te[14];
      te[15] = te[3] * x + te[7] * y + te[11] * z + te[15];
    };

    Matrix4.prototype.getPosition = function () {
      var te = this.elements;
      var x = te[12];
      var y = te[13];
      var z = te[14];
      return new Vector3(x, y, z);

    };

    Matrix4.prototype.setPosition = function (v) {
      var te = this.elements;

      te[12] = v.x;
      te[13] = v.y;
      te[14] = v.z;

      return this;
    };

    Matrix4.prototype.makeRotationFromQuaternion = function (q) {
      var te = this.elements;

      var x = q.x, y = q.y, z = q.z, w = q.w;
      var x2 = x + x, y2 = y + y, z2 = z + z;
      var xx = x * x2, xy = x * y2, xz = x * z2;
      var yy = y * y2, yz = y * z2, zz = z * z2;
      var wx = w * x2, wy = w * y2, wz = w * z2;

      te[0] = 1 - (yy + zz);
      te[4] = xy - wz;
      te[8] = xz + wy;

      te[1] = xy + wz;
      te[5] = 1 - (xx + zz);
      te[9] = yz - wx;

      te[2] = xz - wy;
      te[6] = yz + wx;
      te[10] = 1 - (xx + yy);

      te[3] = 0;
      te[7] = 0;
      te[11] = 0;

      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;

      return this;
    };

    Matrix4.prototype.makeFrustum = function (left, right, bottom, top, near, far) {
      var te = this.elements;
      var x = 2 * near / (right - left);
      var y = 2 * near / (top - bottom);

      var a = (right + left) / (right - left);
      var b = (top + bottom) / (top - bottom);
      var c = - (far + near) / (far - near);
      var d = - 2 * far * near / (far - near);

      te[0] = x; te[4] = 0; te[8] = a; te[12] = 0;
      te[1] = 0; te[5] = y; te[9] = b; te[13] = 0;
      te[2] = 0; te[6] = 0; te[10] = c; te[14] = d;
      te[3] = 0; te[7] = 0; te[11] = -1; te[15] = 0;

      return this;
    };

    Matrix4.prototype.makePerspective = function (fov, aspect, near, far) {
      var ymax = near * Math.tan((fov * 0.5));
      var ymin = - ymax;
      var xmin = ymin * aspect;
      var xmax = ymax * aspect;
      return this.makeFrustum(xmin, xmax, ymin, ymax, near, far);
    };

    Matrix4.prototype.lookAt = function (eye, target, up) {
      var te = this.elements;
      var x = Vector3.Zero();
      var y = Vector3.Zero();
      var z = Vector3.Zero();

      z.subVectors(target, eye).normalize();
      if (z.length() === 0) {
        z.z = 1;
      }

      x.crossVectors(up, z).normalize();
      if (x.length() === 0) {
        z.x += 0.0001;
        x.crossVectors(up, z).normalize();
      }

      y.crossVectors(z, x).normalize();

      //var ex = -1 * x.dot(eye);
      //var ey = -1 * y.dot(eye);
      //var ez = -1 * z.dot(eye);

          //this.set(
            //x.x, y.x, z.x, 0,
            //x.y, y.y, z.y, 0,
            //x.z, y.z, z.z, 0,
            //ex, ey, ez, 1
          //);
      te[0] = x.x; te[4] = y.x; te[8] = z.x;
      te[1] = x.y; te[5] = y.y; te[9] = z.y;
      te[2] = x.z; te[6] = y.z; te[10] = z.z;
      return this;
    };

    Matrix4.RotationYawPitchRoll = function (yaw, pitch, roll) {
      var result = new Matrix4();
      var tempQuaternion = Quaternion.RotationYawPitchRoll(yaw, pitch, roll);
      //result.makeRotationFromQuaternion(tempQuaternion);
      tempQuaternion.toRotationMatrix(result);
      return result;
    };

    Matrix4.PerspectiveFov = function (fov, aspect, znear, zfar) {
      var result = Matrix4.Zero();
      var e = result.elements;

      var tan = 1.0 / (Math.tan(fov * 0.5));

      e[0] = tan / aspect;
      e[1] = e[2] = e[3] = 0.0;
      e[5] = tan;
      e[4] = e[6] = e[7] = 0.0;
      e[8] = e[9] = 0.0;
      e[10] = -zfar / (znear - zfar);
      e[11] = 1.0;
      e[12] = e[13] = e[15] = 0.0;
      e[14] = (znear * zfar) / (znear - zfar);
      return result;
    };
    Matrix4.Zero = function () {
      var result = new Matrix4();
      result.set(
        0, 0, 0, 0,
        0, 0 ,0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
      );
      return result;
    };
    Matrix4.Translation = function (x, y, z) {
      var result = new Matrix4();
      result.set(
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
      );
      return result;
    };

    return Matrix4;
  });
