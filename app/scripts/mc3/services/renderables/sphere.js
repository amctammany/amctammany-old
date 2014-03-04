'use strict';

angular.module('mctApp')
  .factory('Sphere', function (Object3d, Vector3) {
    var Sphere = function (position, radius, divisions, color) {
      this.position = new Vector3(position[0], position[1], position[2]);
      this.radius = radius;
      this.divisions = (divisions !== undefined) ? divisions : 10;
      this.color = (color !== undefined) ? color : [1.0, 0.0, 0.0, 1.0];
      this.smoothShading = false;

      Object3d.call(this);
    };
    Sphere.prototype = Object.create(Object3d.prototype);

    Sphere.prototype.getGLInfo = function () {
      var latitudeBands = this.divisions;
      var longitudeBands = this.divisions;

      var vertexPositionData = [],
          normalData = [],
          colorData = [],
          indexData = [],
          textureData = [];

      var latNumber, longNumber;
      for (latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (longNumber = 0; longNumber <= longitudeBands; longNumber++) {
          var phi = longNumber * 2 * Math.PI / longitudeBands;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);

          var x = cosPhi * sinTheta;
          var y = cosTheta;
          var z = sinPhi * sinTheta;
          //var u = 1 - (longNumber / longitudeBands);
          //var v = latNumber / latitudeBands;

          textureData.push((x + 1.0) * 0.5);
          textureData.push((y + 1.0) * 0.5);

          normalData.push(x);
          normalData.push(y);
          normalData.push(z);

          colorData.push(this.color[0]);
          colorData.push(this.color[1]);
          colorData.push(this.color[2]);
          colorData.push(this.color[3]);

          vertexPositionData.push(this.radius * x + this.position.x);
          vertexPositionData.push(this.radius * y + this.position.y);
          vertexPositionData.push(this.radius * z + this.position.z);
        }
      }

      for (latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (longNumber = 0; longNumber < longitudeBands; longNumber++) {
          var first = (latNumber * (longitudeBands + 1)) + longNumber;
          var second = first + longitudeBands + 1;

          indexData.push(first);
          indexData.push(second);
          indexData.push(first + 1);

          indexData.push(second);
          indexData.push(second + 1);
          indexData.push(first + 1);
        }
      }

      if (!this.smoothShading) {
        vertexPositionData = calculateFlattenedVertices(vertexPositionData, indexData);
        colorData = [];
        for (var i = 0; i < indexData.length; ++i) {
          colorData.push(this.color[0]);
          colorData.push(this.color[1]);
          colorData.push(this.color[2]);
          colorData.push(this.color[3]);
        }
        normalData = calculatePerFaceNormals(normalData, indexData);
      }
      return {
        vertices: vertexPositionData,
        colors: colorData,
        indices: indexData,
        normals: normalData,
      };
    };

    Sphere.prototype.setupBuffers = function (gl) {
      var info = this.getGLInfo();

      var colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.colors), gl.STATIC_DRAW);
      colorBuffer.itemSize = 4;
      colorBuffer.numItems = info.colors.length / 4;

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
        drawFunc: (this.smoothShading ? 'elements' : 'arrays')
      };
    };

    function calculateFlattenedVertices (origVertices, indices) {
      var vertices = [];
      var a;
      for (var i = 0; i < indices.length; ++i) {
        a = indices[i]*3;
        vertices.push(origVertices[a]);
        vertices.push(origVertices[a + 1]);
        vertices.push(origVertices[a + 2]);
      }
      return vertices;
    }

    function calculatePerFaceNormals (origNormals, indices) {
      var normals = [];
      for (var i = 0; i < indices.length; i+=3) {
        var a = indices[i]*3;
        var b = indices[i + 1]*3;
        var c = indices[i + 2]*3;

        var n1 = new Vector3(origNormals[a], origNormals[a+1], origNormals[a+2]);
        var n2 = new Vector3(origNormals[b], origNormals[b+1], origNormals[b+2]);
        var n3 = new Vector3(origNormals[c], origNormals[c+1], origNormals[c+2]);

        var nx = (n1.x + n2.x + n3.x)/3;
        var ny = (n1.y + n2.y + n3.y)/3;
        var nz = (n1.z + n2.z + n3.z)/3;

        var v3 = new Vector3(nx, ny, nz);
        normals.push(v3.x);
        normals.push(v3.y);
        normals.push(v3.z);

        normals.push(v3.x);
        normals.push(v3.y);
        normals.push(v3.z);

        normals.push(v3.x);
        normals.push(v3.y);
        normals.push(v3.z);
      }
      return normals;
    }
    return Sphere;
  });
