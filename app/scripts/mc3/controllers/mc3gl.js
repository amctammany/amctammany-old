'use strict';

angular.module('mctApp')
  .controller('Mc3GLCtrl', function ($scope, GLRenderer, Camera, World, Wall) {
    $scope.lookLeft = function () {
      $scope.camera.rotateY(0.15);
    };
    $scope.lookRight = function () {
      $scope.camera.rotateY(-0.15);
    };
    $scope.forward = function () {
      $scope.camera.move(0, 0, -0.3);
      //$scope.camera.position.z -= 1.0;
    };
    $scope.back = function () {
      $scope.camera.move(0, 0, 0.3);
      //$scope.camera.position.z += 1.0;
    };
    $scope.left = function () {
      $scope.camera.move(-0.3, 0, 0);
      //$scope.camera.position.x -= 1.0;
    };
    $scope.right = function () {
      $scope.camera.move(0.3, 0, 0);
      //$scope.camera.position.x += 1.0;
    };
    $scope.world = new World();

    var wall = new Wall([0, 0, -1], [0, 0, 1], [1, 0, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);
    wall = new Wall([1, 0, 0], [-1, 0, 0], [0, 1, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);

    wall = new Wall([-1, 0, 0], [1, 0, 0], [0, 1, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);



    $scope.initDemo = function (canvas) {
      if ($scope.animFrame) {
        window.cancelAnimationFrame($scope.animFrame);
      }
      if (!$scope.camera) {
        $scope.camera = new Camera(45, canvas.width / canvas.height, 0.1, 100);
        $scope.camera.position.z = 4.0;
      }



      var fsSource = document.getElementById('shader-fs').innerHTML;
      var vsSource = document.getElementById('shader-vs').innerHTML;
      $scope.renderer = new GLRenderer(canvas, fsSource, vsSource);

      (function animLoop () {
        $scope.renderer.render($scope.world, $scope.camera);
        $scope.animFrame = window.requestAnimationFrame(animLoop);
      })();
    };

  });
