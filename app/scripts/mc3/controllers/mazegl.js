'use strict';

angular.module('mctApp')
  .controller('MazeGLCtrl', function ($scope, GLRenderer, Camera, World, Wall, Floor, MazeStore) {

    var prevX, prevY;
    $scope.handleMouseDown = function (e) {
      prevX = e.x;
      prevY = e.y;
    };
    $scope.handleMouseUp = function () {
      prevX = null;
      prevY = null;
    };
    $scope.handleMouseMove = function (e) {
      $scope.canvas.focus();
      if (prevX && prevY) {
        var dx = prevX - e.x;
        //var dy = prevY - e.y;
        if (Math.abs(dx) < 20) {
          $scope.camera.rotateY(dx / 50);
          //$scope.camera.rotateX(dy / 500);
        }
        prevX = e.x;
        prevY = e.y;
      }
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
    function loadMaze (config) {
      config.cells.forEach(function (cell) {
        var x = cell.row * 2;
        var z = cell.column * 2;
        var color = [0.5, 0.5, 0.5];
        var floorColor = [0.1, 0.1, 0.1];
        var wall, floor;
        if (cell.row === config.start.row && cell.column === config.start.column) {
          floorColor = [1.0, 0.0, 0.0];
        }
        if (cell.row === config.end.row && cell.column === config.end.column) {
          floorColor = [0.0, 1.0, 0.0];
        }
        floor = new Wall([x, -1, z], [0, 1, 0], [0, 0, 1], 2, 2, floorColor);
        floor = new Floor([x, -1, z], 2, 2, floorColor);
        $scope.world.add(floor);

        if (!cell.top) {
          wall = new Wall([x - 1, 0, z], [-1, 0, 0], [0, 1, 0], 2, 2, color);
          $scope.world.add(wall);
        }
        if (!cell.bottom) {
          wall = new Wall([x + 1, 0, z], [-1, 0, 0], [0, 1, 0], 2, 2, color);
          $scope.world.add(wall);
        }

        if (!cell.left) {
          wall = new Wall([x, 0, z - 1], [0, 0, -1], [1, 0, 0], 2, 2, color);
          $scope.world.add(wall);
        }
        if (!cell.right) {
          wall = new Wall([x, 0, z + 1], [0, 0, -1], [1, 0, 0], 2, 2, color);
          $scope.world.add(wall);

        }
      });
      animLoop();

    }

    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      if ($scope.animFrame) {
        window.cancelAnimationFrame($scope.animFrame);
      }
      if (!$scope.camera) {
        $scope.camera = new Camera(45, canvas.width / canvas.height, 0.1, 100);
        $scope.camera.position.y = 0.05;
        $scope.camera.position.z = 1.01;
        $scope.camera.world = $scope.world;
        $scope.world.camera = $scope.camera;
      }
      if (!$scope.maze) {
        $scope.maze = MazeStore.get({name: 'big'}, function (maze) {
          var config = JSON.parse(maze.config);
          loadMaze(config);
          $scope.camera.findVisible();
        });
      }



      var fsSource = document.getElementById('shader-fs').innerHTML;
      var vsSource = document.getElementById('shader-vs').innerHTML;
      $scope.renderer = new GLRenderer(canvas, fsSource, vsSource);
      $scope.renderer.lineWidth = 2.0;

    };

    function animLoop () {
      $scope.renderer.render($scope.world, $scope.camera);
      $scope.animFrame = window.requestAnimationFrame(animLoop);
    }

  });
