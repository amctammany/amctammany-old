'use strict';

angular.module('mctApp')
  .controller('WebGLCtrl', function ($scope) {

    var gl = null;
    var glProgram = null;
    var fragmentShader = null;
    var vertexShader = null;
    var z = -7.0;

    var mvMatrix = mat4.create();
    //var mvMatrix1 = new Matrix4();
    var pMatrix = mat4.create();
    //var pMatrix1 = new Matrix4();

    var vertexPositionAttribute = null;
    var trianglesVerticeBuffer = null;
    var triangleVerticesIndexBuffer = null;
    var vertexColorAttribute = null;
    var trianglesColorBuffer = null;

    var angle = 0.0;

    $scope.forward = function () {
      z += 1;
    };
    $scope.back = function () {
      z -= 1;
    };
    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      } catch (e) {

      }

      if (gl) {
        initShaders();
        setupBuffers();
        getMatrixUniforms();
        (function animLoop () {
          setupWebGL();
          setMatrixUniforms();
          drawScene();
          window.requestAnimationFrame(animLoop, $scope.canvas);
        })();
        drawScene();
      } else {
        console.alert('Browser fail!');
      }
    };

    function getMatrixUniforms () {
      glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
      glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
    }
    function setMatrixUniforms () {
      gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
      gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
    }

    function setupWebGL () {
      gl.clearColor(0.1, 0.5, 0.1, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.viewport(0, 0, $scope.canvas.width, $scope.canvas.height);


      //pMatrix1.makePerspective(45, $scope.canvas.width / $scope.canvas.height, 0.1, 100);
      //mvMatrix1 = Matrix4.Translation(0, 0, -3.0);
      mat4.perspective(pMatrix, 45, $scope.canvas.width / $scope.canvas.height, 0.1, 100.0);
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, mvMatrix, [-1.0, -1.0, z]);
      mat4.rotate(mvMatrix, mvMatrix, angle, [0.0, 1.0, 0.0]);
      angle += 0.01;
    }
    function initShaders () {
      //console.log(document.getElementById('shader-fs').html());
      var fsSource = document.getElementById('shader-fs').innerHTML;
      var vsSource = document.getElementById('shader-vs').innerHTML;

      vertexShader = makeShader(vsSource, gl.VERTEX_SHADER);
      fragmentShader = makeShader(fsSource, gl.FRAGMENT_SHADER);

      glProgram = gl.createProgram();

      gl.attachShader(glProgram, vertexShader);
      gl.attachShader(glProgram, fragmentShader);
      gl.linkProgram(glProgram);

      if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        console.warn('Unable to initialize shaders');
      }

      gl.useProgram(glProgram);
    }

    function makeShader (src, type) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Error compiling shader: ' + gl.getShaderInfoLog(shader));
      }
      return shader;
    }
    function setupBuffers () {
      //var triangleVertices = [
        //// Left Triangle
        //-0.5, 0.5, -0.5,
        //0.0, 0.0, -0.5,
        //-0.5, -0.5, -0.5,

        //// Right Triangle
        //0.5, 0.5, 0.5,
        //0.0, 0.0, 0.5,
        //0.5, -0.5, 0.5
      //];

      //var triangleVerticeColors = [
        //// Red Left Triangle
        //1.0, 0.0, 0.0,
        //1.0, 1.0, 1.0,
        //1.0, 0.0, 0.0,

        //// Blue Left Triangle
        //0.0, 0.0, 1.0,
        //1.0, 1.0, 1.0,
        //0.0, 0.0, 1.0
      //];

      var triangleVerticeColors = [
        // Front Face
        0.0, 0.0, 1.0,
        1.0, 1.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 1.0,

        // Rear
        0.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        1.0, 1.0, 1.0
      ];

      trianglesColorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticeColors), gl.STATIC_DRAW);

      var triangleVertices = [
        // Front Face
        // Bottom left to right, to top
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        2.0, 0.0, 0.0,
        0.5, 1.0, 0.0,
        1.5, 1.0, 0.0,
        1.0, 2.0, 0.0,

        // Back Face
        0.0, 0.0, -2.0,
        1.0, 0.0, -2.0,
        2.0, 0.0, -2.0,
        0.5, 1.0, -2.0,
        1.5, 1.0, -2.0,
        1.0, 2.0, -2.0,

      ];
      trianglesVerticeBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      var triangleVertexIndices = [
        // Front
        0, 1, 3,
        1, 3, 4,
        1, 2, 4,
        3, 4, 5,

        // Rear
        6, 7, 9,
        7, 9, 10,
        7, 8, 10,
        9, 10, 11,

        // Left
        0, 3, 6,
        3, 6, 9,
        3, 5, 9,
        5, 9, 11,

        // Right
        2, 4, 8,
        4, 8, 10,
        4, 5, 10,
        5, 10, 11,
        // Bottom
        0, 6, 8,
        8, 2, 0
      ];
      triangleVerticesIndexBuffer = gl.createBuffer();
      triangleVerticesIndexBuffer.numberVertexPoints = triangleVertexIndices.length;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleVerticesIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleVertexIndices), gl.STATIC_DRAW);


    }

    function drawScene () {
      vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
      gl.enableVertexAttribArray(vertexPositionAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

      vertexColorAttribute = gl.getAttribLocation(glProgram, 'aVertexColor');
      gl.enableVertexAttribArray(vertexColorAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffer);
      gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleVerticesIndexBuffer);
      gl.drawElements(gl.TRIANGLES, triangleVerticesIndexBuffer.numberVertexPoints, gl.UNSIGNED_SHORT, 0);

    }
  });
