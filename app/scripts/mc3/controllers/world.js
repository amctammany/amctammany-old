'use strict';

angular.module('mctApp')
  .controller('WorldCtrl', function ($scope, Vector3, Camera, Mesh, Renderer, World) {

    $scope.initDemo = function (canvas) {
      $scope.world = new World();
      var cube = new Mesh('cube', 8);
      cube.vertices[0] = new Vector3(1, 1, 1);
      cube.vertices[1] = new Vector3(1, -1, 1);
      cube.vertices[2] = new Vector3(-1, 1, 1);
      cube.vertices[3] = new Vector3(-1, -1, 1);
      cube.vertices[4] = new Vector3(1, 1, -1);
      cube.vertices[5] = new Vector3(1, -1, -1);
      cube.vertices[6] = new Vector3(-1, 1, -1);
      cube.vertices[7] = new Vector3(-1, -1, -1);

      // Front face lines
      cube.connectVertices(0, 1);
      cube.connectVertices(0, 2);
      cube.connectVertices(2, 3);
      cube.connectVertices(1, 3);


      // Back face lines
      cube.connectVertices(4, 5);
      cube.connectVertices(4, 6);
      cube.connectVertices(6, 7);
      cube.connectVertices(5, 7);

      // Front to back lines
      cube.connectVertices(0, 4);
      cube.connectVertices(1, 5);
      cube.connectVertices(2, 6);
      cube.connectVertices(3, 7);

      cube.position.x = 1;
      $scope.world.add(cube);

      cube = new Mesh('cube', 8);
      cube.vertices[0] = new Vector3(1, 1, 1);
      cube.vertices[1] = new Vector3(1, -1, 1);
      cube.vertices[2] = new Vector3(-1, 1, 1);
      cube.vertices[3] = new Vector3(-1, -1, 1);
      cube.vertices[4] = new Vector3(1, 1, -1);
      cube.vertices[5] = new Vector3(1, -1, -1);
      cube.vertices[6] = new Vector3(-1, 1, -1);
      cube.vertices[7] = new Vector3(-1, -1, -1);

      // Front face lines
      cube.connectVertices(0, 1);
      cube.connectVertices(0, 2);
      cube.connectVertices(2, 3);
      cube.connectVertices(1, 3);


      // Back face lines
      cube.connectVertices(4, 5);
      cube.connectVertices(4, 6);
      cube.connectVertices(6, 7);
      cube.connectVertices(5, 7);

      // Front to back lines
      cube.connectVertices(0, 4);
      cube.connectVertices(1, 5);
      cube.connectVertices(2, 6);
      cube.connectVertices(3, 7);

      cube.position.x = -1;
      $scope.world.add(cube);

      cube = new Mesh('cube', 8);
      cube.vertices[0] = new Vector3(1, 1, 1);
      cube.vertices[1] = new Vector3(1, -1, 1);
      cube.vertices[2] = new Vector3(-1, 1, 1);
      cube.vertices[3] = new Vector3(-1, -1, 1);
      cube.vertices[4] = new Vector3(1, 1, -1);
      cube.vertices[5] = new Vector3(1, -1, -1);
      cube.vertices[6] = new Vector3(-1, 1, -1);
      cube.vertices[7] = new Vector3(-1, -1, -1);

      // Front face lines
      cube.connectVertices(0, 1);
      cube.connectVertices(0, 2);
      cube.connectVertices(2, 3);
      cube.connectVertices(1, 3);


      // Back face lines
      cube.connectVertices(4, 5);
      cube.connectVertices(4, 6);
      cube.connectVertices(6, 7);
      cube.connectVertices(5, 7);

      // Front to back lines
      cube.connectVertices(0, 4);
      cube.connectVertices(1, 5);
      cube.connectVertices(2, 6);
      cube.connectVertices(3, 7);

      cube.position.x = 1;
      cube.position.z = -2;
      $scope.world.add(cube);

      cube = new Mesh('cube', 8);
      cube.vertices[0] = new Vector3(1, 1, 1);
      cube.vertices[1] = new Vector3(1, -1, 1);
      cube.vertices[2] = new Vector3(-1, 1, 1);
      cube.vertices[3] = new Vector3(-1, -1, 1);
      cube.vertices[4] = new Vector3(1, 1, -1);
      cube.vertices[5] = new Vector3(1, -1, -1);
      cube.vertices[6] = new Vector3(-1, 1, -1);
      cube.vertices[7] = new Vector3(-1, -1, -1);

      // Front face lines
      cube.connectVertices(0, 1);
      cube.connectVertices(0, 2);
      cube.connectVertices(2, 3);
      cube.connectVertices(1, 3);


      // Back face lines
      cube.connectVertices(4, 5);
      cube.connectVertices(4, 6);
      cube.connectVertices(6, 7);
      cube.connectVertices(5, 7);

      // Front to back lines
      cube.connectVertices(0, 4);
      cube.connectVertices(1, 5);
      cube.connectVertices(2, 6);
      cube.connectVertices(3, 7);

      cube.position.x = -1;
      cube.position.z = -2;
      $scope.world.add(cube);

      $scope.camera = new Camera();
      $scope.camera.position.z = 10;
      $scope.renderer = new Renderer(canvas);
      function render() {
        $scope.renderer.render($scope.world, $scope.camera);
      }

      render();
      $scope.forward = function () {
        $scope.camera.position.z -= 1;
        render();
      };
      $scope.back = function () {
        $scope.camera.position.z += 1;
        render();
      };
      $scope.left = function () {
        $scope.camera.position.x -= 1;
        render();
      };
      $scope.right = function () {
        $scope.camera.position.x += 1;
        render();
      };

      $scope.lookLeft = function () {
        $scope.camera.rotateY(0.05);
        render();
      };
      $scope.lookRight = function () {
        $scope.camera.rotateY(-0.05);
        render();
      };

    };
  });
