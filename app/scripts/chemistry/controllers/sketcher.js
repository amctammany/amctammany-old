'use strict';

angular.module('mctApp')
  .controller('SketcherCtrl', function ($scope, $routeParams, $filter, Molecule, MoleculeStore, Atom) {
    $scope.molecules = MoleculeStore.query();
    console.log($routeParams.name);
    $scope.name = 'molecule';
    $scope.dragging = false;
    $scope.dragStart = undefined;
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
      console.table(mol);
    };
    $scope.save = function () {
      var molFile = $scope.molecule.generateMolFile();
      var mol = molFile.original;
      var normal = molFile.normalized;
      if ($scope.moleculeStore) {
        $scope.moleculeStore.name = $scope.name;
        $scope.moleculeStore.molFile = mol;
        $scope.moleculeStore.normalizedMolFile = normal;
        $scope.moleculeStore.$save();
      } else {
        $scope.moleculeStore = new MoleculeStore({name: $scope.name, molFile: mol, normalizedMolFile: normal});
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
      if ($routeParams.name) {
        $scope.moleculeStore = MoleculeStore.get({name: $routeParams.name}, function () {
          $scope.name = $scope.moleculeStore.name;
          $scope.molecule = new Molecule($scope.moleculeStore.name, $scope.moleculeStore.molFile, $scope.canvas);
          $scope.molecule.draw();
        });
      } else {
        $scope.molecule = $scope.molecule || new Molecule($scope.name, undefined, canvas);
        $scope.molecule.draw();
      }

    };

    $scope.logMolFile = function () {
      console.log($scope.molecule.generateMolFile());
    };
    $scope.normalize = function () {
      console.table($scope.molecule.normalize());
    };
    $scope.handleMouseDown = function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      var molecule = $scope.molecule;

      var closestObject = molecule.findClosestObject(x, y, 0);
      console.log(closestObject);
      if ($scope.mouseTool !== undefined) {
        if ($scope.mouseTool === 'select') {
          if (closestObject.distance < 15 && closestObject.object instanceof Atom) {
            molecule.changeSelection([closestObject.object]);
            $scope.dragging = true;
            $scope.dragStart = {x: x, y: y};
          }
        }


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
        molecule.changeSelection([atom]);
      }

      molecule.draw();
    };

    $scope.handleMouseUp = function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      var molecule = $scope.molecule;
      molecule.draw();
      $scope.dragging = false;
      $scope.mouseX = x;
      $scope.mouseY = y;
    };
    $scope.toggleAnimation = function () {
      console.log('foo')
    }

    $scope.handleMouseMove = function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      var molecule = $scope.molecule;
      $scope.mouseX = x;
      $scope.mouseY = y;
      if ($scope.dragging) {
        var dx = x - $scope.dragStart.x;
        var dy = y - $scope.dragStart.y;
        molecule.selection.forEach(function (obj) {
          obj.shift(dx, dy, 0);
        });
        $scope.dragStart.x = x;
        $scope.dragStart.y = y;
      }
      molecule.draw();


    };



  });
