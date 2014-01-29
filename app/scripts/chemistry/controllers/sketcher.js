'use strict';

angular.module('mctApp')
  .controller('SketcherCtrl', function ($scope, $filter, Molecule, MoleculeStore, Atom) {
    $scope.molecules = MoleculeStore.query();
    $scope.name = 'molecule';
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

    $scope.loadMolecule = function (molecule) {
      $scope.moleculeStore = molecule;
      $scope.name = molecule.name;
      $scope.molecule = new Molecule(molecule.name, molecule.molFile, $scope.canvas);
      $scope.molecule.draw();
    };

    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      $scope.molecule = $scope.molecule || new Molecule($scope.name, undefined, canvas);
      $scope.molecule.draw();
    };

    $scope.logMolFile = function () {
      console.log($scope.molecule.generateMolFile());
    };
    $scope.handleMouseDown = function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      var molecule = $scope.molecule;

      var closestObject = molecule.findClosestObject(x, y, 0);
      if ($scope.mouseTool !== undefined) {


      } else if ($scope.atomTool !== undefined) {
        var atom;
        if (closestObject.object instanceof Atom && closestObject.distance < 15) {
          atom = closestObject.object;
        } else {
          atom = molecule.addAtom($scope.atomTool, x, y, 0);
        }
        if (molecule.selectedAtom && molecule.selectedAtom.distanceFrom(x, y, 0) < 50) {
          molecule.selectedAtom.bondTo(atom, $scope.bondTool);
        }
        molecule.selectedAtom = atom;
      }

      molecule.draw();
    };

    $scope.handleMouseUp = function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      console.log('x: ' + x + '; y: ' + y);
    };

    $scope.handleMouseMove = function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      console.log('x: ' + x + '; y: ' + y);

    };



  });
