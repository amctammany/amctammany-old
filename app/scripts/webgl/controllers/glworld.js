'use strict';

angular.module('mctApp')
  .controller('GLWorldCtrl', function ($scope, Matrix4, Camera) {
    var gl = null;
    var glProgram = null;
    var fragmentShader = null;
    var vertexShader = null;
    var x = 0.0;
    var y = 0.0;
    var z = -4.0;
    var angle = 0.0;


    var mMatrix = new Matrix4();
    var vMatrix = new Matrix4();
    var pMatrix = new Matrix4();

    var vertexPositionAttribute = null;
    var roomVerticeBuffer = null;
    var roomVerticesIndexBuffer = null;
    var roomColorBuffer = null;
    var vertexColorAttribute = null;

    $scope.lookLeft = function () {
      $scope.camera.rotateY(0.15);
      angle += 0.15;
    };
    $scope.lookRight = function () {
      $scope.camera.rotateY(-0.15);
      angle -= 0.15;
    };
    $scope.forward = function () {
      $scope.camera.position.z -= 1.0;
    };
    $scope.back = function () {
      $scope.camera.position.z += 1.0;
    };
    $scope.left = function () {
      x -= 1.0;
    };
    $scope.right = function () {
      x += 1.0;
    };
    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      } catch (e) {

      }

      if (gl) {
        if ($scope.animFrame) {
          window.cancelAnimationFrame($scope.animFrame);
        }
        $scope.camera = new Camera(45, $scope.canvas.width / $scope.canvas.height, 0.1, 100);
        $scope.camera.position.z = 4.0;
        initShaders();
        setupBuffers();
        getMatrixUniforms();
        (function animLoop () {
          setupWebGL();
          setMatrixUniforms();
          drawScene();
          $scope.animFrame = window.requestAnimationFrame(animLoop, $scope.canvas);
        })();
        drawScene();
      } else {
        console.alert('Browser fail!');
      }
    };

    function getMatrixUniforms () {
      glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
      glProgram.vMatrixUniform = gl.getUniformLocation(glProgram, 'uVMatrix');
      glProgram.mMatrixUniform = gl.getUniformLocation(glProgram, 'uMMatrix');
    }
    function setMatrixUniforms () {
      gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix.elements);
      gl.uniformMatrix4fv(glProgram.vMatrixUniform, false, vMatrix.elements);
      gl.uniformMatrix4fv(glProgram.mMatrixUniform, false, mMatrix.elements);
    }

    function setupWebGL () {
      gl.clearColor(0.1, 0.5, 0.1, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.viewport(0, 0, $scope.canvas.width, $scope.canvas.height);


      $scope.camera.updateMatrixWorld(true);
      $scope.camera.matrixWorldInverse.getInverse($scope.camera.matrixWorld);
      pMatrix = $scope.camera.projectionMatrix;
      vMatrix = $scope.camera.matrixWorldInverse;
      //pMatrix1.makePerspective(45, $scope.canvas.width / $scope.canvas.height, 0.1, 100);
      mMatrix = Matrix4.Translation(x, y, z);
      //mat4.perspective(pMatrix, 45, $scope.canvas.width / $scope.canvas.height, 0.1, 100.0);
      ////mat4.identity(pMatrix);
      //mat4.identity(mvMatrix);
      //mat4.translate(mvMatrix, mvMatrix, [x, y, z]);
      //mat4.rotate(pMatrix, pMatrix, angle, [0.0, 1.0, 0.0]);
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
      var roomVerticeColors = [
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0
      ];



      roomColorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, roomColorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(roomVerticeColors), gl.STATIC_DRAW);

      var roomVertices = [
        // Left Wall
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,

        // Right Wall
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0

      ];

      roomVerticeBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, roomVerticeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(roomVertices), gl.STATIC_DRAW);

      var roomVertexIndices = [
        // Left
        0, 1, 2,
        1, 2, 3,

        // Right
        4, 5, 6,
        5, 6, 7,
        // Back
        2, 3, 6,
        6, 7, 3,


      ];
      roomVerticesIndexBuffer = gl.createBuffer();
      roomVerticesIndexBuffer.numberVertexPoints = roomVertexIndices.length;
      console.log(roomVerticesIndexBuffer.numberVertexPoints);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, roomVerticesIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(roomVertexIndices), gl.STATIC_DRAW);


    }


    function drawScene () {
      vertexPositionAttribute = gl.getAttribLocation(glProgram, 'aVertexPosition');
      gl.enableVertexAttribArray(vertexPositionAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, roomVerticeBuffer);
      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

      vertexColorAttribute = gl.getAttribLocation(glProgram, 'aVertexColor');
      gl.enableVertexAttribArray(vertexColorAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, roomColorBuffer);
      gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, roomVerticesIndexBuffer);
      gl.drawElements(gl.TRIANGLES, roomVerticesIndexBuffer.numberVertexPoints, gl.UNSIGNED_SHORT, 0);

    }

  });
