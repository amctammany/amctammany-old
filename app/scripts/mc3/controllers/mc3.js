'use strict';

angular.module('mctApp')
  .controller('Mc3Ctrl', function ($scope, Vector3, Camera, Mesh, Renderer) {

    $scope.mesh = new Mesh('cube', 8);
    $scope.mesh.vertices[0] = new Vector3(1, 1, 1);
    $scope.mesh.vertices[1] = new Vector3(1, -1, 1);
    $scope.mesh.vertices[2] = new Vector3(-1, 1, 1);
    $scope.mesh.vertices[3] = new Vector3(-1, -1, 1);
    $scope.mesh.vertices[4] = new Vector3(1, 1, -1);
    $scope.mesh.vertices[5] = new Vector3(1, -1, -1);
    $scope.mesh.vertices[6] = new Vector3(-1, 1, -1);
    $scope.mesh.vertices[7] = new Vector3(-1, -1, -1);
    $scope.camera = new Camera();
    $scope.camera.position = new Vector3(0, 0, 1);
    $scope.camera.target = new Vector3(0, 0, 0);


    $scope.initDemo = function (canvas) {
      $scope.renderer = new Renderer(canvas);
      drawingLoop();
    };
    function drawingLoop () {
      $scope.mesh.rotation.x += 0.05;
      $scope.mesh.rotation.y += 0.05;
      $scope.renderer.render($scope.camera, [$scope.mesh]);
      //window.requestAnimationFrame(drawingLoop);
    }
  });
