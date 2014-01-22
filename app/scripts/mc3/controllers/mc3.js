'use strict';

angular.module('mctApp')
  .controller('Mc3Ctrl', function ($scope, Vector3, Camera, Mesh, Renderer, World) {



    $scope.initDemo = function (canvas) {
      $scope.rotX = 0.02;
      $scope.rotY = 0.01;
      $scope.rotZ = 0.00;
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

      // Front face lines
      $scope.mesh.connectVertices(0, 1);
      $scope.mesh.connectVertices(0, 2);
      $scope.mesh.connectVertices(2, 3);
      $scope.mesh.connectVertices(1, 3);


      // Back face lines
      $scope.mesh.connectVertices(4, 5);
      $scope.mesh.connectVertices(4, 6);
      $scope.mesh.connectVertices(6, 7);
      $scope.mesh.connectVertices(5, 7);

      // Front to back lines
      $scope.mesh.connectVertices(0, 4);
      $scope.mesh.connectVertices(1, 5);
      $scope.mesh.connectVertices(2, 6);
      $scope.mesh.connectVertices(3, 7);

      $scope.world.add($scope.mesh);
      $scope.camera = new Camera();
      $scope.camera.position.z = 20;

      $scope.renderer = new Renderer(canvas);
      $scope.renderer.render($scope.world, $scope.camera);
    };
    $scope.toggleAnimation = function () {
      if ($scope.animFrame) {
        window.cancelAnimationFrame($scope.animFrame);
        $scope.animFrame = undefined;
      } else {
        drawingLoop();
      }
    };
    $scope.advance = function () {
      $scope.world.rotateX($scope.rotX);
      $scope.world.rotateY($scope.rotY);
      $scope.world.rotateZ($scope.rotZ);
      $scope.renderer.render($scope.world, $scope.camera);

    };
    function drawingLoop () {
      $scope.advance();
      //$scope.rotX += 0.5;
      //$scope.world.rotateX($scope.rotX);
      //$scope.renderer.render($scope.world, $scope.camera);
      //$scope.renderer.render($scope.camera, [$scope.mesh]);
      $scope.animFrame = window.requestAnimationFrame(drawingLoop);
    }
  });
