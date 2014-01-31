'use strict';

angular.module('mctApp')
  .controller('SketcherCtrl', function ($scope, $routeParams, $filter, Molecule, MoleculeStore, Atom, Bond) {
    $scope.molecules = MoleculeStore.query();
    $scope.name = 'molecule';
    $scope.dragging = false;
    $scope.dragStart = undefined;
    $scope.atomTool = 'C';
    $scope.bondTool = '1';
    $scope.selectedBond = undefined;
    $scope.selectedBondAngle = undefined;
    $scope.mouseTool = undefined;
    $scope.bondTypes = ['1', '2', '3', 'd', 's'];
    $scope.atoms = ['C', 'H', 'N', 'O', 'P', 'S', 'B', 'Si', 'F', 'Cl', 'Br', 'I'];
    $scope.atomGroups = $filter('groupBy')($scope.atoms, 6);
    $scope.changeAtomTool = function (atom) {
      if ($scope.selectedBond) {
        $scope.selectedBond.deselect();
        $scope.molecule.draw();
      }
      $scope.atomTool = atom;
      $scope.bondTool = $scope.bondTool ? $scope.bondTool : '1';
      $scope.mouseTool = undefined;
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
      if ($scope.selectedBond) {
        $scope.selectedBond.deselect();
        $scope.molecule.draw();
      }
      $scope.bondTool = bond;
      $scope.mouseTool = undefined;
      $scope.atomTool = $scope.atomTool ? $scope.atomTool : 'C';
    };
    $scope.getBondToolClass = function (bond) {
      var status = $scope.bondTool === bond ? 'active' : '';
      return status;
    };
    $scope.save = function () {
      var molFile = $scope.molecule.generateMolFile();
      if ($scope.moleculeStore) {
        console.log('update');
        $scope.moleculeStore.name = $scope.name;
        $scope.moleculeStore.molFile = molFile;
        $scope.moleculeStore.$save();
        console.log($scope.moleculeStore);
      } else {
        console.log('new molecule');
        $scope.moleculeStore = new MoleculeStore({name: $scope.name, molFile: molFile});
        $scope.moleculeStore.$save();
      }
    };

    $scope.newMolecule = function () {
      $scope.name = 'molecule';
      $scope.moleculeStore = undefined;
      $scope.molecule = new Molecule($scope.name, undefined, $scope.canvas);
      $scope.molecule.draw();
    };
    $scope.loadMolecule = function (molecule) {
      $scope.moleculeStore = molecule;
      $scope.name = molecule.name;
      console.log(molecule);
      $scope.molecule = new Molecule(molecule.name, molecule.molFile, $scope.canvas);
      $scope.molecule.draw();
    };

    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      if ($routeParams.name && !$scope.moleculeStore) {
        $scope.moleculeStore = MoleculeStore.get({name: $routeParams.name}, function () {
          $scope.name = $scope.moleculeStore.name;
          $scope.molecule = new Molecule($scope.moleculeStore.name, $scope.moleculeStore.molFile, $scope.canvas);
          $scope.molecule.draw();
        });
      } else {
        $scope.molecule = $scope.molecule || new Molecule($scope.name, undefined, canvas);
        $scope.molecule.canvas = canvas;
        $scope.molecule.resize();
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

      if ($scope.selectedBond) {$scope.selectedBond.deselect();}
      $scope.selectedBond = undefined;
      if ($scope.selectedBondAngle) {$scope.selectedBondAngle.deselect();}
      $scope.selectedBondAngle = undefined;
      var closestObject = molecule.findClosestObject(x, y, 0);
      if ($scope.mouseTool !== undefined) {
        if ($scope.mouseTool === 'select') {
          if (closestObject.distance < 0.05 && closestObject.object instanceof Atom) {
            molecule.changeSelection([closestObject.object]);
            $scope.dragging = true;
            $scope.dragStart = {x: x, y: y};
          } else if (closestObject.distance < 0.05 && closestObject.object instanceof Bond){
            if (molecule.selectedBond === closestObject.object) {
              closestObject.object.increment();
            }
            molecule.changeSelection([closestObject.object]);
          } else {
            molecule.changeSelection([]);
          }
        } else if ($scope.mouseTool === 'delete') {
            if (closestObject.distance < 0.05 && closestObject.object instanceof Atom) {
              closestObject.object.remove();
            }
          }



      } else if ($scope.atomTool !== undefined) {
        var atom;
        var z = 0;
        if ($scope.bondTool === 's') {
          z = 0.25;
        } else if ($scope.bondTool === 'd') {
          z = -0.25;
        }
        if (closestObject.object instanceof Atom && closestObject.distance < 0.05) {
          atom = closestObject.object;
        } else {
          atom = molecule.addAtom($scope.atomTool, x, y, z, false);
        }
        if (molecule.selectedAtom && molecule.selectedAtom.distanceFrom(x, y, 0) < 0.45) {

          var order = $scope.bondTool;
          if ($scope.bondTool === 's' || $scope.bondTool === 'd') {
            order = 1;
          }
          molecule.selectedAtom.bondTo(atom, order);
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

    $scope.handleMouseMove = function (e) {
      if (!$scope.molecule) {return;}
      var x = e.offsetX;
      var y = e.offsetY;
      var molecule = $scope.molecule;
      $scope.mouseX = x;
      $scope.mouseY = y;
      if ($scope.dragging) {
        var dx = (x - $scope.dragStart.x) / molecule.workingWidth;
        var dy = (y - $scope.dragStart.y) / molecule.workingHeight;
        molecule.selection.forEach(function (obj) {
          obj.shift(dx, dy, 0);
        });
        $scope.dragStart.x = x;
        $scope.dragStart.y = y;
      }
      if (molecule.selectedAtom && $scope.atomTool !== undefined) {
        var dist = molecule.selectedAtom.distanceFrom(x, y, 0);
        if (dist > 0.45) {molecule.changeSelection([]);}
      }
      molecule.draw();
    };

    $scope.getBondClass = function (bond) {
      return $scope.selectedBond === bond ? 'active' : '';
    };
    $scope.selectBond = function (bond) {
      if ($scope.selectedBond) {$scope.selectedBond.deselect();}
      if ($scope.selectedBondAngle) {$scope.selectedBondAngle.deselect();}
      $scope.selectedBond = bond;
      bond.select();
      $scope.molecule.draw();
    };

    $scope.getBondAngleClass = function (bondAngle) {
      return $scope.selectedBondAngle === bondAngle ? 'active' : '';
    };
    $scope.selectBondAngle = function (bondAngle) {
      if ($scope.selectedBond) {$scope.selectedBond.deselect();}
      if ($scope.selectedBondAngle) {$scope.selectedBondAngle.deselect();}
      $scope.selectedBondAngle = bondAngle;
      bondAngle.select();
      $scope.molecule.draw();
    };
    $scope.satisfy = function () {
      var satisfyBond = function (bond) {
        bond.satisfy();
      };
      var satisfyBondAngle = function (angle) {
        angle.satisfy();
      };
      for (var i = 0; i < 100; i++) {
        $scope.molecule.bonds.forEach(satisfyBond);
        $scope.molecule.bondAngles.forEach(satisfyBondAngle);
      }

      $scope.molecule.draw();
    };


  });
