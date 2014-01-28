'use strict';

angular.module('mctApp')
  .controller('SketcherCtrl', function ($scope, $filter, Molecule, MoleculeStore) {
    $scope.name = 'foobar';
    $scope.atomTool = 'C';
    $scope.bondTool = '1';
    $scope.mouseTool = undefined;
    $scope.mouseTools = ['select', 'group', 'delete'];
    $scope.bondTypes = ['1', '2', '3', 'd', 's'];
    $scope.atoms = ['C', 'H', 'N', 'O', 'P', 'S', 'B', 'Si', 'F', 'Cl', 'Br', 'I'];
    $scope.atomGroups = $filter('groupBy')($scope.atoms, 6);
    $scope.changeAtomTool = function (atom) {
      $scope.atomTool = atom;
      $scope.bondTool = $scope.bondTool ? $scope.bondTool : '1';
      $scope.mouseTool = false;
    };
    $scope.getAtomToolClass = function (atom) {
      var status = $scope.atomTool === atom ? 'active' : '';
      return status;
    };
    $scope.changeMouseTool = function (mouse) {
      $scope.mouseTool = mouse;
      $scope.atomTool = undefined;
      $scope.bondTool = undefined;
    };

    $scope.getMouseToolClass = function (mouse) {
      var status = $scope.mouseTool === mouse ? 'active' : '';
      return status;
    };
    $scope.changeBondTool = function (bond) {
      $scope.bondTool = bond;
      $scope.mouseTool = undefined;
      $scope.atomTool = $scope.atomTool ? $scope.atomTool : 'C';
    };
    $scope.getBondToolClass = function (bond) {
      var status = $scope.bondTool === bond ? 'active' : '';
      return status;
    };
    $scope.generateMolFile = function () {
      var mol = $scope.molecule.generateMolFile();
      console.log(mol);
    };
    $scope.save = function () {
      var molFile = $scope.molecule.generateMolFile();
      if ($scope.moleculeStore) {
        $scope.moleculeStore.name = $scope.name;
        $scope.moleculeStore.molFile = molFile;
        $scope.moleculeStore.$save();
      } else {
        $scope.moleculeStore = new MoleculeStore({name: $scope.name, molFile: molFile});
        $scope.moleculeStore.$save();
      }
    };

    $scope.initDemo = function (canvas) {
      $scope.molecule = $scope.molecule || new Molecule($scope.name, undefined, canvas);
      $scope.molecule.draw()
    };

    $scope.logMolFile = function () {
      console.log($scope.molecule.generateMolFile());
    };
    $scope.handleMouseDown = function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      if ($scope.atomTool !== undefined) {
        $scope.molecule.addAtom($scope.atomTool, x, y, 0);
      }

      $scope.molecule.draw();
    };



  });
