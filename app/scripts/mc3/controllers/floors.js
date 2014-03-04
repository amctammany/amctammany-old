'use strict';

angular.module('mctApp')
  .controller('FloorsCtrl', function ($scope, $window, GLRenderer, Camera, World, Floor) {
    $scope.world = new World();
    var floor = new Floor([0, 0, 0], 2, 2, [1, 0, 0]);
    floor.index = 0;
    $scope.world.add(floor);
    floor = new Floor([2, 0, 0], 2, 2, [1, 0, 0]);
    floor.index = 1;
    $scope.world.add(floor);
    floor = new Floor([-2, 0, 0], 2, 2, [1, 0, 0]);
    floor.index = 2;
    $scope.world.add(floor);
    floor = new Floor([-2, 0, -2], 2, 2, [1, 0, 0]);
    floor.index = 3;
    $scope.world.add(floor);
    floor = new Floor([0, 0, -2], 2, 2, [1, 0, 0]);
    floor.index = 4;
    $scope.world.add(floor);
    floor = new Floor([2, 0, -2], 2, 2, [1, 0, 0]);
    floor.index = 5;
    $scope.world.add(floor);

    floor = new Floor([-2, 0, -4], 2, 2, [1, 0, 0]);
    floor.index = 6;
    $scope.world.add(floor);
    floor = new Floor([0, 0, -4], 2, 2, [1, 0, 0]);
    floor.index = 7;
    $scope.world.add(floor);
    floor = new Floor([2, 0, -4], 2, 2, [1, 0, 0]);
    floor.index = 8;
    $scope.world.add(floor);
    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      if ($scope.animFrame) {
        $window.cancelAnimationFrame($scope.animFrame);
      }
      if (!$scope.camera) {
        $scope.camera = new Camera(45, canvas.width / canvas.height, 0.1, 100);
        $scope.camera.position.y = 2.0;
        $scope.camera.position.z = 5.0;
      }
      var fsSource = document.getElementById('shader-fs').innerHTML;
      var vsSource = document.getElementById('shader-vs').innerHTML;
      $scope.renderer = new GLRenderer(canvas, fsSource, vsSource);

      animLoop();
    };

    function animLoop () {
      $scope.renderer.render($scope.world, $scope.camera);
      $scope.animFrame = $window.requestAnimationFrame(animLoop);
    }
    $scope.handleMouseDown = function (e) {
      var nx = (2 * e.offsetX / $scope.canvas.width) - 1;
      var ny = (-2 * e.offsetY / $scope.canvas.height) + 1;
      console.log($scope.renderer.unprojectVector($scope.camera, nx, ny));
    };
    $scope.handleMouseUp = function () {
    };
    //$scope.handleMouseMove = function (e) {
      //$scope.canvas.focus();
      //if (prevX && prevY) {
        //var dx = prevX - e.x;
        ////var dy = prevY - e.y;
        //if (Math.abs(dx) < 20) {
          //$scope.camera.rotateY(dx / 50);
          ////$scope.camera.rotateX(dy / 500);
        //}
        //prevX = e.x;
        //prevY = e.y;
      //}
    //};



  });
