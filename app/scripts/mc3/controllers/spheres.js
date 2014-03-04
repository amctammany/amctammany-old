'use strict';

angular.module('mctApp')
  .controller('SpheresCtrl', function ($scope, $window, GLRenderer, Camera, World, Sphere) {
    $scope.world = new World();
    var sphere = new Sphere([0, 0, 0], 1, 25, [1, 0, 0, 1]);
    $scope.world.add(sphere);

    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      if ($scope.animFrame) {
        $window.cancelAnimationFrame($scope.animFrame);
      }
      if (!$scope.camera) {
        $scope.camera = new Camera(45, canvas.width / canvas.height, 0.1, 100);
        $scope.camera.position.y = 0.0;
        $scope.camera.position.z = 5.0;
      }

      var fsSource = document.getElementById('shader-fs').innerHTML;
      var vsSource = document.getElementById('shader-vs').innerHTML;
      $scope.renderer = new GLRenderer(canvas, fsSource, vsSource);

      animLoop();
    };

    function animLoop () {
      //$scope.world.rotateY(0.01);
      $scope.renderer.render($scope.world, $scope.camera);
      //$scope.animFrame = $window.requestAnimationFrame(animLoop);
    }
  });
