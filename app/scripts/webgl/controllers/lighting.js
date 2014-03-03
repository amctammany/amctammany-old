'use strict';

angular.module('mctApp')
  .controller('LightingCtrl', function ($scope, $window) {
    $scope.foo = 'foo';
    var gl = null,
        canvas = null,
        glProgram = null,
        fragmentShader = null,
        vertexShader = null;

    var vertexPositionAttribute = null,
        vertexNormalAttribute = null,
        vertexColorAttribute = null,
        vertexTexCoordAttribute = null,
        trianglesVerticeBuffer = null,
        trianglesNormalBuffer = null,
        trianglesColorBuffer = null,
        trianglesTexCoordBuffer = null;

    var texture = [],
        textureImage = [],
        STONE_TEXTURE = 0,
        WEBGL_LOGO_TEXTURE = 1;

    var mvMatrix = mat4.create(),
        pMatrix = mat4.create(),
        normalMatrix = mat3.create();

    var angle = 0.01;
    var paused = false;

    function loadTexture() {
      textureImage[STONE_TEXTURE] = new Image();
      textureImage[STONE_TEXTURE].onload = function () {
        setupTexture(STONE_TEXTURE);
        gl.uniform1i(glProgram.samplerUniform, STONE_TEXTURE);
      };
      textureImage[STONE_TEXTURE].src = '/images/stone-128px.jpg';

      textureImage[WEBGL_LOGO_TEXTURE] = new Image();
      textureImage[WEBGL_LOGO_TEXTURE].onload = function () {
        setupTexture(WEBGL_LOGO_TEXTURE);
        gl.uniform1i(glProgram.samplerUniform2, WEBGL_LOGO_TEXTURE);
      };
      textureImage[WEBGL_LOGO_TEXTURE].src = '/images/webgl_logo-512px.png';


      glProgram.uDoTexturing = gl.getUniformLocation(glProgram, 'uDoTexturing');
      gl.uniform1i(glProgram.uDoTexturing, 1);
    }

    function setupTexture (i) {
      gl.activeTexture(gl.TEXTURE0 + i);
      texture[i] = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture[i]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage[i]);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

      if (!gl.isTexture(texture[i])) {
        console.error('Error: Texture is invalid');
      }
    }

    function initWebGL () {
      canvas = document.getElementById('lighting-canvas');
      try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      } catch (e) {
      }

      if (gl) {
        initShaders();
        setupBuffers();
        getMatrixUniforms();
        loadTexture();
        (function animLoop () {
          if (!paused) {
            setupWebGL();
            setMatrixUniforms();
            drawScene();
          }
          $window.requestAnimationFrame(animLoop, canvas);
        })();
      } else {
        console.error('Error: your browser does not support webgl');
      }
    }

    function setupWebGL () {
      gl.clearColor(0.1, 0.5, 0.1, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);

      gl.viewport(0, 0, canvas.width, canvas.height);
      mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, mvMatrix, [0.0, -1.0, -5.5]);
      mat4.rotate(mvMatrix, mvMatrix, angle, [0.0, 1.0, 1.0]);

      mat3.normalFromMat4(normalMatrix, mvMatrix);

      angle += 0.005;
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
      var triangleVerticesOriginal = [
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

      var triangleVertexIndices = [
        // Front
        0, 1, 3,
        1, 4, 3,
        1, 2, 4,
        3, 4, 5,

        // Rear
        6, 7, 9,
        7, 10, 9,
        7, 8, 10,
        9, 10, 11,

        // Left
        0, 6, 3,
        3, 6, 9,
        3, 9, 5,
        5, 9, 11,

        // Right
        2, 8, 4,
        4, 8, 10,
        4, 10, 5,
        5, 10, 11,

        // Bottom
        0, 6, 8,
        8, 2, 0
      ];

      var triangleVertices = [];
      var triangleVerticeColors = [];
      var triangleNormals = [];
      var triangleTexCoords = [];

      var i, l, a, b, c;
      for (i = 0, l = triangleVertexIndices.length; i < l; i++) {
        a = triangleVertexIndices[i];

        triangleVertices.push(triangleVerticesOriginal[a*3]);
        triangleVertices.push(triangleVerticesOriginal[a*3 + 1]);
        triangleVertices.push(triangleVerticesOriginal[a*3 + 2]);

        if (i >= 24) {
          triangleTexCoords.push(triangleVerticesOriginal[a*3 + 1]);
          triangleTexCoords.push(triangleVerticesOriginal[a*3 + 2]);
        } else {
          triangleTexCoords.push(triangleVerticesOriginal[a*3]);
          triangleTexCoords.push(triangleVerticesOriginal[a*3 + 1]);
        }

        triangleVerticeColors.push(0.8);
        triangleVerticeColors.push(0.1);
        triangleVerticeColors.push(0.1);
      }

      trianglesVerticeBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      trianglesColorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticeColors), gl.STATIC_DRAW);

      trianglesTexCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleTexCoords), gl.STATIC_DRAW);


      for (i = 0, l = triangleVertexIndices.length; i < l; i += 3) {
        a = triangleVertexIndices[i];
        b = triangleVertexIndices[i+1];
        c = triangleVertexIndices[i+2];

        var v1 = [
          triangleVerticesOriginal[a*3] - triangleVerticesOriginal[b*3],
          triangleVerticesOriginal[a*3 + 1] - triangleVerticesOriginal[b*3 + 1],
          triangleVerticesOriginal[a*3 + 2] - triangleVerticesOriginal[b*3 + 2],
        ];

        var v2 = [
          triangleVerticesOriginal[a*3] - triangleVerticesOriginal[c*3],
          triangleVerticesOriginal[a*3 + 1] - triangleVerticesOriginal[c*3 + 1],
          triangleVerticesOriginal[a*3 + 2] - triangleVerticesOriginal[c*3 + 2],
        ];

        var cross = [
          v1[1]*v2[2] - v1[1]*v2[2],
          v1[2]*v2[0] - v1[0]*v2[2],
          v1[0]*v2[1] - v1[0]*v2[1],
        ];

        triangleNormals.push.apply(triangleNormals, cross);
        triangleNormals.push.apply(triangleNormals, cross);
        triangleNormals.push.apply(triangleNormals, cross);
      }

      trianglesNormalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleNormals), gl.STATIC_DRAW);
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

      vertexNormalAttribute = gl.getAttribLocation(glProgram, 'aVertexNormal');
      gl.enableVertexAttribArray(vertexNormalAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
      gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

      vertexTexCoordAttribute = gl.getAttribLocation(glProgram, 'aVertexTexCoord');
      gl.enableVertexAttribArray(vertexTexCoordAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
      gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 16*3);
    }

    function getMatrixUniforms () {
      glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
      glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
      glProgram.normalMatrixUniform = gl.getUniformLocation(glProgram, 'uNormalMatrix');
      glProgram.samplerUniform = gl.getUniformLocation(glProgram, 'uSampler');
      glProgram.samplerUniform2 = gl.getUniformLocation(glProgram, 'uSampler2');
    }

    function setMatrixUniforms () {
      gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
      gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
      gl.uniformMatrix3fv(glProgram.normalMatrixUniform, false, normalMatrix);
    }

    initWebGL();
  });
