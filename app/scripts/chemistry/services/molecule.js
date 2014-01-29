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
      this.atoms.push(atom);
      atom.index = this.atoms.indexOf(atom);
      return atom;
    };

    Molecule.prototype.addBond = function (start, end, order) {
      var bond = new Bond(start, end, order, this);
      this.bonds.push(bond);

      return bond;
    };
    Molecule.prototype.findClosestObject = function (x, y, z) {
      var bestAtom = this.findClosestAtom(x, y, z);
      var bestBond = this.findClosestBond(x, y, z);
      var obj;
      if (bestAtom.distance < bestBond.distance * 1.5) {
        obj = {object: bestAtom.atom, distance: bestAtom.distance};
      } else {
        obj = {object: bestBond.bond, distance: bestBond.distance};
      }
      return obj;

    };
    Molecule.prototype.findClosestAtom = function (x, y, z) {
      var bestScore = 999,
          bestAtom;
      var length = this.atoms.length;
      for (var i = 0; i < length; i ++) {
        var atom = this.atoms[i];
        var distance = atom.distanceFrom(x, y, z);
        if (distance < bestScore) {
          bestScore = distance;
          bestAtom = atom;
        }
      }
      return {
        atom: bestAtom,
        distance: bestScore
      };

    };
    Molecule.prototype.findClosestBond = function (x, y, z) {
      var bestScore = 999,
          bestBond;
      var length = this.bonds.length;
      for (var i = 0; i < length; i ++) {
        var bond = this.bonds[i];
        var distance = bond.distanceFrom(x, y, z);
        if (distance < bestScore) {
          bestScore = distance;
          bestBond = bond;
        }
      }
      return {
        bond: bestBond,
        distance: bestScore
      };
    };

    Molecule.prototype.generateMolFile = function () {
      var result = [];
      result.push(this.name);
      result.push(this.atoms.length + ' ' + this.bonds.length);
      this.atoms.forEach(function (atom) {
        result.push([atom.element, atom.x, atom.y, atom.z].join(' '));
      });

      this.bonds.forEach(function (bond) {
        result.push([bond.startAtom.index, bond.endAtom.index, bond.order].join(' '));
      });

      return result.join('\n');
    };

    Molecule.prototype.parseMolFile = function () {
      var lines = this.molFile.split('\n');
      this.name = lines[0];
      var info = lines[1].split(' ');

      var numAtoms = parseInt(info[0], 10);
      var numBonds = parseInt(info[1], 10);
      var line, lineInfo, i;
      for (i = 0; i < numAtoms; i++) {
        line = lines[i + 2];
        lineInfo = line.split(' ');
        var element = lineInfo[0];
        var x = parseFloat(lineInfo[1]);
        var y = parseFloat(lineInfo[2]);
        var z = parseFloat(lineInfo[3]);
        //new Atom(element, x, y, z, this);
        this.addAtom(element, x, y, z);
        //atom.draw(this.ctx);
      }
      for (i = 0; i < numBonds; i++) {
        line = lines[i + numAtoms + 2];
        lineInfo = line.split(' ');
        var startIndex = parseInt(lineInfo[0], 10);
        var startAtom = this.atoms[startIndex];
        var endIndex = parseInt(lineInfo[1], 10);
        var endAtom = this.atoms[endIndex];
        var order = parseInt(lineInfo[2], 10);
        this.addBond(startAtom, endAtom, order);
        //new Bond(startAtom, endAtom, order, this);
        //bond.draw(this.ctx);
      }

    };

    Molecule.prototype.draw = function () {
      var ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bonds.forEach(function (bond) {
        bond.draw(ctx);
      });

      this.atoms.forEach(function (atom) {
        atom.draw(ctx);
      });
    };

    return Molecule;
  });
