'use strict';

angular.module('mctApp')
  .factory('GLRenderer', function (Matrix4, Matrix3) {
    var _gl, _glProgram;
    var GLRenderer = function (canvas, fsSource, vsSource) {
      this.canvas = canvas;
      this.width = canvas.width;
      this.height = canvas.height;
      this.bufferGroups = [];
      this.lineWidth = 3;
      _gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');


      if (_gl) {
        //this.camera = new Camera(45, this.width / this.height, 0.1, 100.0);
        //this.camera.position.z = 4.0;
        //this.world = new World();
        this.pMatrix = new Matrix4();
        this.vMatrix = new Matrix4();
        this.mMatrix = new Matrix4();
        this.mvMatrix = new Matrix4();
        this.normalMatrix = new Matrix3();
        //this.normalMatrix1 = mat3.create();
        this.vsSource = vsSource;
        this.fsSource = fsSource;
      }
    };
    GLRenderer.prototype.getMatrixUniforms = function () {
      _glProgram.pMatrixUniform = _gl.getUniformLocation(_glProgram, 'uPMatrix');
      _glProgram.vMatrixUniform = _gl.getUniformLocation(_glProgram, 'uVMatrix');
      _glProgram.mMatrixUniform = _gl.getUniformLocation(_glProgram, 'uMMatrix');
      _glProgram.mvMatrixUniform = _gl.getUniformLocation(_glProgram, 'uMVMatrix');
      _glProgram.normalMatrixUniform = _gl.getUniformLocation(_glProgram, 'uNormalMatrix');
    };
    GLRenderer.prototype.setMatrixUniforms = function () {
      _gl.uniformMatrix4fv(_glProgram.pMatrixUniform, false, this.pMatrix.elements);
      _gl.uniformMatrix4fv(_glProgram.vMatrixUniform, false, this.vMatrix.elements);
      _gl.uniformMatrix4fv(_glProgram.mMatrixUniform, false, this.mMatrix.elements);
      _gl.uniformMatrix4fv(_glProgram.mvMatrixUniform, false, this.mvMatrix.elements);
      _gl.uniformMatrix3fv(_glProgram.normalMatrixUniform, false, this.normalMatrix.elements);
      //_gl.uniformMatrix3fv(_glProgram.normalMatrixUniform, false, this.normalMatrix1);
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
        bufferGroups.push(child.setupBuffers(_gl));
      });

    };

    GLRenderer.prototype.drawWorld = function () {
      for (var i = 0, l = this.bufferGroups.length; i < l; i++) {
        var group = this.bufferGroups[i];

        var vertexPositionAttribute = _gl.getAttribLocation(_glProgram, 'aVertexPosition');
        _gl.enableVertexAttribArray(vertexPositionAttribute);
        _gl.bindBuffer(_gl.ARRAY_BUFFER, group.vertex);
        _gl.vertexAttribPointer(vertexPositionAttribute, group.vertex.itemSize, _gl.FLOAT, false, 0, 0);

        var vertexColorAttribute = _gl.getAttribLocation(_glProgram, 'aVertexColor');
        _gl.enableVertexAttribArray(vertexColorAttribute);
        _gl.bindBuffer(_gl.ARRAY_BUFFER, group.color);
        _gl.vertexAttribPointer(vertexColorAttribute, group.color.itemSize, _gl.FLOAT, false, 0, 0);

        var vertexNormalAttribute = _gl.getAttribLocation(_glProgram, 'aVertexNormal');
        _gl.enableVertexAttribArray(vertexNormalAttribute);
        _gl.bindBuffer(_gl.ARRAY_BUFFER, group.normal);
        _gl.vertexAttribPointer(vertexNormalAttribute, 3, _gl.FLOAT, false, 0, 0);


        _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, group.index);
        if (group.drawFunc === 'elements') {
          _gl.drawElements(_gl.TRIANGLES, group.index.numItems, _gl.UNSIGNED_SHORT, 0);
        } else if (group.drawFunc === 'arrays') {
          _gl.drawArrays(_gl.TRIANGLES, 0, group.vertex.numItems);
        }
      }
    };

    GLRenderer.prototype.setupWebGL = function () {
      _gl.clearColor(0.8, 0.8, 0.8, 1.0);
      _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
      _gl.enable(_gl.DEPTH_TEST);
      _gl.viewport(0, 0, this.width, this.height);
      this.camera.updateMatrixWorld(true);
      this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
      this.world.updateMatrixWorld(true);
      this.pMatrix = this.camera.projectionMatrix;
      this.vMatrix = this.camera.matrixWorldInverse;
      this.mMatrix = this.world.matrixWorld;

      this.mvMatrix.multiplyMatrices(this.mMatrix, this.vMatrix);
      this.normalMatrix.getInverse(this.mvMatrix).transpose();
      //mat3.normalFromMat4(this.normalMatrix1, this.mvMatrix.elements);
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
