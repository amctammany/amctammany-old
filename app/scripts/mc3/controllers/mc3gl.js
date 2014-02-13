'use strict';

angular.module('mctApp')
  .controller('Mc3GLCtrl', function ($scope, GLRenderer, Camera, World) {
    $scope.lookLeft = function () {
      $scope.camera.rotateY(0.15);
    };
    $scope.lookRight = function () {
      $scope.camera.rotateY(-0.15);
    };
    $scope.forward = function () {
      $scope.camera.position.z -= 1.0;
    };
    $scope.back = function () {
      $scope.camera.position.z += 1.0;
    };
    $scope.left = function () {
      $scope.camera.position.x -= 1.0;
    };
    $scope.right = function () {
      $scope.camera.position.x += 1.0;
    };

    $scope.initDemo = function (canvas) {
      if ($scope.animFrame) {
        window.cancelAnimationFrame($scope.animFrame);
      }
      $scope.camera = new Camera(45, canvas.width / canvas.height, 0.1, 100);
      $scope.camera.position.z = 4.0;
      $scope.world = new World();
      $scope.world.planes = [];
      var obj = {
        vertices: [
          -1.0, -1.0, 1.0,
          -1.0, 1.0, 1.0,
          -1.0, -1.0, -1.0,
          -1.0, 1.0, -1.0,
        ],
        colors: [
          0.0, 0.0, 1.0,
          0.0, 0.0, 1.0,
          0.0, 0.0, 1.0,
          0.0, 0.0, 1.0,
        ],
        indices: [
          0, 1, 2,
          1, 2, 3
        ]
      };

      $scope.world.planes.push(obj);
      obj = {
        vertices: [
          1.0, -1.0, 1.0,
          1.0, 1.0, 1.0,
          1.0, -1.0, -1.0,
          1.0, 1.0, -1.0,
        ],
        colors: [
          0.0, 1.0, 1.0,
          0.0, 1.0, 1.0,
          0.0, 1.0, 1.0,
          0.0, 1.0, 1.0,
        ],
        indices: [
          0, 1, 2,
          1, 2, 3
        ]
      };

      $scope.world.planes.push(obj);

      var fsSource = document.getElementById('shader-fs').innerHTML;
      var vsSource = document.getElementById('shader-vs').innerHTML;
      $scope.renderer = new GLRenderer(canvas, fsSource, vsSource);

      (function animLoop () {
        $scope.renderer.render($scope.world, $scope.camera);
        $scope.animFrame = window.requestAnimationFrame(animLoop);
      })();
    };

  });
