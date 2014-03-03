'use strict';

angular.module('mctApp')
  .controller('CubeCtrl', function ($scope, GLRenderer, Camera, World, Wall) {
    $scope.world = new World();

    var back = new Wall([0, 0, -1], [0, 0, -1], [1, 0, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(back);

    var front = new Wall([0, 0, 1], [0, 0, 1], [1, 0, 0], 2, 2,  [0.5, 0.5, 0.5]);
    $scope.world.add(front);

    var left = new Wall([-1, 0, 0], [-1, 0, 0], [0, 1, 0], 2, 2, [0.5, 0.5, 0.5]);
    $scope.world.add(left);

    var right = new Wall([1, 0, 0], [1, 0, 0], [0, 1, 0], 2, 2, [0.5, 0.5, 0.5]);
    $scope.world.add(right);

    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;

      if (!$scope.camera) {
        $scope.camera = new Camera(45, canvas.width / canvas.height, 0.1, 100);
        $scope.camera.position.z = 4.0;
      }

      var fsSource = document.getElementById('shader-fs').innerHTML;
      var vsSource = document.getElementById('shader-vs').innerHTML;
      $scope.renderer = new GLRenderer(canvas, fsSource, vsSource);
      $scope.renderer.lineWidth = 1;

      (function animLoop () {
        $scope.world.rotateY(0.01);
        $scope.renderer.render($scope.world, $scope.camera);
        $scope.animFrame = window.requestAnimationFrame(animLoop);
      })();


    };
  });
