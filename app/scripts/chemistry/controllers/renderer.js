'use strict';

angular.module('mctApp')
  .controller('RendererCtrl', function ($scope, $window, $location, $routeParams, MoleculeStore, Vector3, Camera, Mesh, Renderer, World) {
    $scope.molecules = MoleculeStore.query();
    $scope.rotX = 0.02;
    $scope.rotY = 0.00;
    $scope.rotZ = 0.02;

    $scope.sketcher = function () {
      if ($scope.molecule) {
        $location.path('chemistry/sketcher/' + $scope.molecule.urlString);
      }
    };


    function render() {
      $scope.world.rotateX($scope.rotX);
      $scope.world.rotateY($scope.rotY);
      $scope.world.rotateZ($scope.rotZ);
      //$scope.world.rotation.y += 0.02;
      $scope.renderer.render($scope.world, $scope.camera);
      $scope.animFrame = $window.requestAnimationFrame(render);
    }
    $scope.initDemo = function (canvas) {
      if ($scope.molecule) {
        return;
      }
      $scope.renderer = new Renderer(canvas);
      if ($routeParams.name) {
        $scope.molecule = MoleculeStore.get({name: $routeParams.name}, function (molecule){
          $scope.loadMolecule(molecule);
        });
      }
      $scope.molecule.draw();
    };

    $scope.camera = new Camera();
    $scope.camera.position.z = 10;
    $scope.toggleAnimation = function () {
      if ($scope.animFrame) {
        $window.cancelAnimationFrame($scope.animFrame);
        $scope.animFrame = undefined;
      } else {
        $scope.animFrame = $window.requestAnimationFrame(render);
      }
    }


    $scope.loadMolecule = function (molecule) {
      if ($scope.animFrame) {
        window.cancelAnimationFrame($scope.animFrame);
      }
      $scope.molecule = molecule;
      $scope.world = new World();
      var lines = molecule.normalizedMolFile.split('\n');
      var name = lines[0];
      var info = lines[1].split(' ');
      var nAtoms = parseInt(info[0], 10);
      var nBonds = parseInt(info[1], 10);
      var mesh = new Mesh(name, nAtoms);
      var line, lineInfo, i;
      for (i = 0; i < nAtoms; i++) {
        line = lines[i + 2];
        lineInfo = line.split(' ');
        //var element = lineInfo[0];
        var x = parseFloat(lineInfo[1]);
        var y = parseFloat(lineInfo[2]);
        var z = parseFloat(lineInfo[3]);
        mesh.vertices[i] = new Vector3(x, y, z);
      }
      for (i = 0; i < nBonds; i++) {
        line = lines[i + nAtoms + 2];
        lineInfo = line.split(' ');
        var start = parseInt(lineInfo[0], 10);
        var end = parseInt(lineInfo[1], 10);
        mesh.connectVertices(start, end);
      }

      $scope.world.add(mesh);
      $scope.renderer.render($scope.world, $scope.camera);
    };
  });
