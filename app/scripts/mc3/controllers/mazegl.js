'use strict';

angular.module('mctApp')
  .controller('MazeGLCtrl', function ($scope, GLRenderer, Camera, World, Wall) {

    var prevX, prevY;
    $scope.handleMouseMove = function (e) {
      $scope.canvas.focus();
      if (prevX && prevY) {
        var dx = prevX - e.x;
        //var dy = prevY - e.y;
        if (Math.abs(dx) < 20) {
          $scope.camera.rotateY(dx / 200);
        }
        //$scope.camera.rotateX(dy / 500);
      }
      prevX = e.x;
      prevY = e.y;
    };

    $scope.handleKeyPress = function (e) {
      switch (e.keyCode) {
        case 87:
          $scope.forward();
          break;
        case 65:
          $scope.left();
          break;
        case 83:
          $scope.back();
          break;
        case 68:
          $scope.right();
          break;
      }
    };
    $scope.lookLeft = function () {
      $scope.camera.rotateY(0.15);
    };
    $scope.lookRight = function () {
      $scope.camera.rotateY(-0.15);
    };
    $scope.forward = function () {
      $scope.camera.move(0, 0, -0.5);
      //$scope.camera.position.z -= 1.0;
    };
    $scope.back = function () {
      $scope.camera.move(0, 0, 0.5);
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

    var wall = new Wall([0, 0, -3], [0, 0, 1], [1, 0, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);

    wall = new Wall([-2, 0, -3], [0, 0, 1], [1, 0, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);

    wall = new Wall([-2, 0, -1], [0, 0, 1], [1, 0, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);
    wall = new Wall([1, 0, 0], [-1, 0, 0], [0, 1, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);

    wall = new Wall([1, 0, -2], [-1, 0, 0], [0, 1, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);

    wall = new Wall([-1, 0, 0], [1, 0, 0], [0, 1, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(wall);



    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
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
