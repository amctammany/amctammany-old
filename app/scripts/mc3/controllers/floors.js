'use strict';

angular.module('mctApp')
  .controller('FloorsCtrl', function ($scope, $window, GLRenderer, Camera, World, Floor) {
    $scope.world = new World();
    var floor1 = new Floor([0, 0, 0], 2, 2, [1, 0, 0]);
    $scope.world.add(floor1);
    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      if ($scope.animFrame) {
        $window.cancelAnimationFrame($scope.animFrame);
      }
      if (!$scope.camera) {
        $scope.camera = new Camera(45, canvas.width / canvas.height, 0.1, 100);
        $scope.camera.position.y = 1.0;
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



  });
