'use strict';

angular.module('mctApp')
  .controller('Mc3Ctrl', function ($scope, Matrix4, Vector3, Camera, Mesh, Renderer, World) {



    $scope.initDemo = function (canvas) {
      $scope.world = new World();
      $scope.mesh = new Mesh('cube', 8);
      $scope.mesh.vertices[0] = new Vector3(1, 1, 1);
      $scope.mesh.vertices[1] = new Vector3(1, -1, 1);
      $scope.mesh.vertices[2] = new Vector3(-1, 1, 1);
      $scope.mesh.vertices[3] = new Vector3(-1, -1, 1);
      $scope.mesh.vertices[4] = new Vector3(1, 1, -1);
      $scope.mesh.vertices[5] = new Vector3(1, -1, -1);
      $scope.mesh.vertices[6] = new Vector3(-1, 1, -1);
      $scope.mesh.vertices[7] = new Vector3(-1, -1, -1);

      $scope.world.add($scope.mesh);
      $scope.camera = new Camera();
      $scope.camera.position.z = 10;

      $scope.renderer = new Renderer(canvas);
      drawingLoop();
    };
    function drawingLoop () {
      $scope.camera.rotation.x += 0.05;
      $scope.camera.rotation.y += 0.05;
      $scope.renderer.render($scope.world, $scope.camera);
      //$scope.renderer.render($scope.camera, [$scope.mesh]);
      //window.requestAnimationFrame(drawingLoop);
    }
  });
