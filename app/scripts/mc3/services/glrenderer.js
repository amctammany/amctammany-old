'use strict';

angular.module('mctApp')
  .factory('GLRenderer', function (Matrix4, Wall) {
    var _gl, _glProgram;
    var GLRenderer = function (canvas, fsSource, vsSource) {
      this.canvas = canvas;
      this.width = canvas.width;
      this.height = canvas.height;
      this.bufferGroups = [];
      _gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');


      if (_gl) {
        //this.camera = new Camera(45, this.width / this.height, 0.1, 100.0);
        //this.camera.position.z = 4.0;
        //this.world = new World();
        this.pMatrix = new Matrix4();
        this.vMatrix = new Matrix4();
        this.mMatrix = new Matrix4();
        this.vsSource = vsSource;
        this.fsSource = fsSource;
      }
    };
    GLRenderer.prototype.getMatrixUniforms = function () {
      _glProgram.pMatrixUniform = _gl.getUniformLocation(_glProgram, 'uPMatrix');
      _glProgram.vMatrixUniform = _gl.getUniformLocation(_glProgram, 'uVMatrix');
      _glProgram.mMatrixUniform = _gl.getUniformLocation(_glProgram, 'uMMatrix');
    };
    GLRenderer.prototype.setMatrixUniforms = function () {
      _gl.uniformMatrix4fv(_glProgram.pMatrixUniform, false, this.pMatrix.elements);
      _gl.uniformMatrix4fv(_glProgram.vMatrixUniform, false, this.vMatrix.elements);
      _gl.uniformMatrix4fv(_glProgram.mMatrixUniform, false, this.mMatrix.elements);
    };

    GLRenderer.prototype.initShaders = function () {
      this.vertexShader = this.makeShader(this.vsSource, _gl.VERTEX_SHADER);
      this.fragmentShader = this.makeShader(this.fsSource, _gl.FRAGMENT_SHADER);

      _glProgram = _gl.createProgram();

      _gl.attachShader(_glProgram, this.vertexShader);
      _gl.attachShader(_glProgram, this.fragmentShader);
      _gl.linkProgram(_glProgram);

      if (!_gl.getProgramParameter(_glProgram, _gl.LINK_STATUS)) {
        console.warn('Unable to initialize shaders');
      }

      _gl.useProgram(_glProgram);
    };

    GLRenderer.prototype.makeShader = function (src, type) {
      var shader = _gl.createShader(type);
      _gl.shaderSource(shader, src);
      _gl.compileShader(shader);
      if (!_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
        console.warn('Error compiling shader: ' + _gl.getShaderInfoLog(shader));
      }
      return shader;

    };

    GLRenderer.prototype.setupWorld = function () {
      var bufferGroups = this.bufferGroups;
      this.world.children.forEach(function (child) {
        if (child instanceof Wall) {
          var plane = child.getGLInfo();
          var colorBuffer = _gl.createBuffer();
          _gl.bindBuffer(_gl.ARRAY_BUFFER, colorBuffer);
          _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(plane.colors), _gl.STATIC_DRAW);

          var vertexBuffer = _gl.createBuffer();
          _gl.bindBuffer(_gl.ARRAY_BUFFER, vertexBuffer);
          _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(plane.vertices), _gl.STATIC_DRAW);

          var indexBuffer = _gl.createBuffer();
          indexBuffer.numberVertexPoints = plane.indices.length;
          _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(plane.indices), _gl.STATIC_DRAW);

          var lineColorBuffer = _gl.createBuffer();
          _gl.bindBuffer(_gl.ARRAY_BUFFER, lineColorBuffer);
          _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(plane.lineColors), _gl.STATIC_DRAW);

          var lineIndexBuffer = _gl.createBuffer();
          lineIndexBuffer.numberVertexPoints = plane.lineIndices.length;
          _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, lineIndexBuffer);
          _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(plane.lineIndices), _gl.STATIC_DRAW);

          bufferGroups.push({
            color: colorBuffer,
            vertex: vertexBuffer,
            index: indexBuffer,
            lineColor: lineColorBuffer,
            lineIndex: lineIndexBuffer
          });
        }
      });

    };

    GLRenderer.prototype.drawWorld = function () {
      for (var i = 0, l = this.bufferGroups.length; i < l; i++) {
        var group = this.bufferGroups[i];

        var vertexPositionAttribute = _gl.getAttribLocation(_glProgram, 'aVertexPosition');
        _gl.enableVertexAttribArray(vertexPositionAttribute);
        _gl.bindBuffer(_gl.ARRAY_BUFFER, group.vertex);
        _gl.vertexAttribPointer(vertexPositionAttribute, 3, _gl.FLOAT, false, 0, 0);

        var vertexColorAttribute = _gl.getAttribLocation(_glProgram, 'aVertexColor');
        _gl.enableVertexAttribArray(vertexColorAttribute);
        _gl.bindBuffer(_gl.ARRAY_BUFFER, group.color);
        _gl.vertexAttribPointer(vertexColorAttribute, 3, _gl.FLOAT, false, 0, 0);

        _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, group.index);
        _gl.drawElements(_gl.TRIANGLES, group.index.numberVertexPoints, _gl.UNSIGNED_SHORT, 0);

        vertexColorAttribute = _gl.getAttribLocation(_glProgram, 'aVertexColor');
        _gl.enableVertexAttribArray(vertexColorAttribute);
        _gl.bindBuffer(_gl.ARRAY_BUFFER, group.lineColor);
        _gl.vertexAttribPointer(vertexColorAttribute, 3, _gl.FLOAT, false, 0, 0);

        _gl.lineWidth(3);
        _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, group.lineIndex);
        _gl.drawElements(_gl.LINES, group.lineIndex.numberVertexPoints, _gl.UNSIGNED_SHORT, 0);
      }

    };

    GLRenderer.prototype.drawScene = function () {
      var vertexPositionAttribute = _gl.getAttribLocation(_glProgram, 'aVertexPosition');
      _gl.enableVertexAttribArray(vertexPositionAttribute);
      _gl.bindBuffer(_gl.ARRAY_BUFFER, this.roomVerticeBuffer);
      _gl.vertexAttribPointer(vertexPositionAttribute, 3, _gl.FLOAT, false, 0, 0);

      var vertexColorAttribute = _gl.getAttribLocation(_glProgram, 'aVertexColor');
      _gl.enableVertexAttribArray(vertexColorAttribute);
      _gl.bindBuffer(_gl.ARRAY_BUFFER, this.roomColorBuffer);
      _gl.vertexAttribPointer(vertexColorAttribute, 3, _gl.FLOAT, false, 0, 0);

      _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, this.roomVerticesIndexBuffer);
      _gl.drawElements(_gl.TRIANGLES, this.roomVerticesIndexBuffer.numberVertexPoints, _gl.UNSIGNED_SHORT, 0);
    };

    GLRenderer.prototype.setupWebGL = function () {
      _gl.clearColor(0.8, 0.8, 0.8, 1.0);
      _gl.clear(_gl.COLOR_BUFFER_BIT);
      _gl.enable(_gl.DEPTH_TEST);
      _gl.viewport(0, 0, this.width, this.height);
      this.camera.updateMatrixWorld(true);
      this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
      this.pMatrix = this.camera.projectionMatrix;
      this.vMatrix = this.camera.matrixWorldInverse;
      this.mMatrix = this.world.matrixWorld;
    };


    GLRenderer.prototype.render = function (world, camera) {
      if (this.world !== world) {
        console.log('changed world');
        this.camera = camera;
        this.world = world;
        this.initShaders();
        this.setupWorld();
        this.getMatrixUniforms();
      }


      this.setupWebGL();
      this.setMatrixUniforms();
      this.drawWorld();
      //this.drawScene();

    };

    return GLRenderer;

  });
