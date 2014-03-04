'use strict';

angular.module('mctApp')
  .factory('Wall', function (Object3d, Vector3) {
    var Wall = function (center, normal, tangent, width, height, color) {
      this.center = new Vector3(center[0], center[1], center[2]);
      this.normal = new Vector3(normal[0], normal[1], normal[2]).normalize();
      this.tangent = new Vector3(tangent[0], tangent[1], tangent[2]).normalize();
      this.width = width;
      this.halfWidth = width / 2;
      this.height = height;
      this.halfHeight = height / 2;
      this.color = color;

      this.getVertices();
      Object3d.call(this);

    };

    Wall.prototype = Object.create(Object3d.prototype);

    Wall.prototype.getGLInfo = function () {
      var vertices = [];
      this.vertices.forEach(function (v) {
        vertices.push(v.x);
        vertices.push(v.y);
        vertices.push(v.z);
      });


      var colors = this.color.concat(this.color).concat(this.color).concat(this.color);

      var indices = [
        0, 1, 2,
        0, 2, 3
      ];
      var normals = [];
      normals.push(this.normal.x, this.normal.y, this.normal.z);
      normals.push(this.normal.x, this.normal.y, this.normal.z);
      normals.push(this.normal.x, this.normal.y, this.normal.z);
      normals.push(this.normal.x, this.normal.y, this.normal.z);
      var lineColors = [
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
      ];
      var lineIndices = [
        0, 1,
        1, 2,
        2, 3,
        3, 0
      ];
      return {
        vertices: vertices,
        colors: colors,
        indices: indices,
        normals: normals,
        lineColors: lineColors,
        lineIndices: lineIndices
      };

    };

    Wall.prototype.setupBuffers = function (gl) {
      var info = this.getGLInfo();

      var colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.colors), gl.STATIC_DRAW);
      colorBuffer.itemSize = 3;
      colorBuffer.numItems = info.colors.length / 3;

      var normalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.normals), gl.STATIC_DRAW);
      normalBuffer.itemSize = 3;
      normalBuffer.numItems = info.normals.length / 3;

      var vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.vertices), gl.STATIC_DRAW);
      vertexBuffer.itemSize = 3;
      vertexBuffer.numItems = info.vertices.length / 3;

      var indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(info.indices), gl.STREAM_DRAW);
      indexBuffer.itemSize = 3;
      indexBuffer.numItems = info.indices.length;


      return {
        color: colorBuffer,
        vertex: vertexBuffer,
        index: indexBuffer,
        normal: normalBuffer,
        drawFunc: 'elements'
      };

    };

    Wall.prototype.getVertices = function () {
      var planeY = this.normal.cross(this.tangent).normalize();
      var planeX = this.normal.cross(planeY).normalize();

      planeY.imul(this.halfHeight * -1);
      planeX.imul(this.halfWidth * - 1);

      var tl = this.center.sub(planeX).isub(planeY);
      var tr = this.center.add(planeX).isub(planeY);
      var br = this.center.add(planeX).iadd(planeY);
      var bl = this.center.sub(planeX).iadd(planeY);
      var vertices = [tl, tr, br, bl];


      this.vertices = vertices;

      return vertices;
    };

    return Wall;
  });
