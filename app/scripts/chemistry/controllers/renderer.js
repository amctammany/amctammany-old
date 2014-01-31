'use strict';

angular.module('mctApp')
  .controller('RendererCtrl', function ($scope, $window, $location, $routeParams, MoleculeStore, Molecule, Vector3, Camera, Mesh, Renderer, World) {
    $scope.molecules = MoleculeStore.query();
    $scope.rotX = 0.02;
    $scope.rotY = 0.00;
    $scope.rotZ = 0.02;

    $scope.sketcher = function () {
      if ($scope.molecule) {
        $location.path('chemistry/sketcher/' + $scope.moleculeStore.urlString);
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
        MoleculeStore.get({name: $routeParams.name}, function (molecule){
          $scope.loadMolecule(molecule);
        });
      }
    };

    $scope.camera = new Camera();
    $scope.camera.position.z = 5;
    $scope.toggleAnimation = function () {
      if ($scope.animFrame) {
        $window.cancelAnimationFrame($scope.animFrame);
        $scope.animFrame = undefined;
      } else {
        $scope.animFrame = $window.requestAnimationFrame(render);
      }
    };


    $scope.getMoleculeClass = function (molecule) {
      if (molecule.urlString === $routeParams.name) {return 'active';}
      return $scope.moleculeStore === molecule ? 'active' : '';
    };
    $scope.loadMolecule = function (molecule) {
      if ($scope.animFrame) {
        window.cancelAnimationFrame($scope.animFrame);
      }
      $scope.moleculeStore = molecule;
      $routeParams.name = molecule.urlString;
      $scope.molecule = new Molecule(molecule.name, molecule.molFile, undefined);
      $scope.molecule.getBoundingBox();
      $scope.world = new World();
      $scope.world.x = $scope.molecule.cx;
      $scope.world.y = $scope.molecule.cy;
      $scope.world.z = $scope.molecule.cz;
      var mesh = new Mesh($scope.molecule.name, $scope.molecule.atoms.length + 1);
      var i, l;
      for (i = 0, l = $scope.molecule.atoms.length; i < l; i++) {
        var atom = $scope.molecule.atoms[i];
        mesh.vertices[i] = atom.position;
      }
      mesh.vertices[$scope.molecule.atoms.length] = new Vector3($scope.molecule.cx, $scope.molecule.cy, $scope.molecule.cz);
      for (i = 0, l = $scope.molecule.bonds.length; i < l; i++) {
        var bond = $scope.molecule.bonds[i];
        mesh.connectVertices(bond.startAtom.getIndex(), bond.endAtom.getIndex());

      }
      $scope.world.add(mesh);
      $scope.renderer.render($scope.world, $scope.camera);
    };
  });
