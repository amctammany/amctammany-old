'use strict';

angular.module('mctApp')
  .factory('Molecule', function (Atom, Bond) {
    var Molecule = function (name, molFile, canvas) {
      this.name = name;
      this.molFile = molFile;
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');

      this.atoms = [];
      this.bonds = [];
      this.selectedAtom = undefined;
      this.selectedBond = undefined;


      if (this.molFile !== undefined) {
        this.parseMolFile();
      }
    };

    Molecule.prototype.addAtom = function (element, x, y, z) {
      var atom = new Atom(element, x, y, z, this);
      this.selectedAtom = atom;
      this.atoms.push(atom);
      atom.index = this.atoms.indexOf(atom);
      return atom;
    };

    Molecule.prototype.addBond = function (start, end, order) {
      var bond = new Bond(start, end, order, this);
      this.bonds.push(bond);

      return bond;
    }

    Molecule.prototype.generateMolFile = function () {
      var result = [];
      result.push(this.name);
      result.push(this.atoms.length + ' ' + this.bonds.length);
      this.atoms.forEach(function (atom) {
        result.push([atom.element, atom.x, atom.y, atom.z].join(' '));
      });

      this.bonds.forEach(function (bond) {
        result.push([bond.start.index, bond.end.index, bond.order].join(' '));
      });

      return result.join('\n');
    }

    Molecule.prototype.draw = function () {
      var ctx = this.ctx;
      this.atoms.forEach(function (atom) {
        atom.draw(ctx);
      });
      this.bonds.forEach(function (bond) {
        bond.draw(ctx);
      });
    };

    return Molecule;
  });
