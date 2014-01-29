'use strict';

angular.module('mctApp')
  .controller('RendererCtrl', function ($scope, MoleculeStore, Vector3, Camera, Mesh, Renderer, World) {
    $scope.molecules = MoleculeStore.query();

    function render() {
      $scope.world.rotation.x += 0.02;
      //$scope.world.rotation.y += 0.02;
      $scope.renderer.render($scope.world, $scope.camera);
      window.requestAnimationFrame(render);
    }
    $scope.initDemo = function (canvas) {
      $scope.renderer = new Renderer(canvas);
    };

    $scope.world = new World();
    $scope.camera = new Camera();
    $scope.camera.position.z = 10;

    $scope.loadMolecule = function (molecule) {
      var lines = molecule.normalizedMolFile.split('\n');
      console.log(lines);
      var name = lines[0];
      var info = lines[1].split(' ');
      var nAtoms = parseInt(info[0], 10);
      var nBonds = parseInt(info[1], 10);
      var mesh = new Mesh(name, nAtoms);
      var line, lineInfo, i;
      for (i = 0; i < nAtoms; i++) {
        line = lines[i + 2];
        console.log(line);
        lineInfo = line.split(' ');
        var element = lineInfo[0];
        var x = parseFloat(lineInfo[1]);
        var y = parseFloat(lineInfo[2]);
        var z = parseFloat(lineInfo[3]);
        mesh.vertices[i] = new Vector3(x, y, z);
      }
      for (i = 0; i < nBonds; i++) {
        line = lines[i + nAtoms + 2];
        console.log(line);
        lineInfo = line.split(' ');
        var start = parseInt(lineInfo[0], 10);
        var end = parseInt(lineInfo[1], 10);
        mesh.connectVertices(start, end);
      }

      $scope.world.add(mesh);
      render();
    };
  });
