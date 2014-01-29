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
      var normalized = [];
      result.push(this.name);
      normalized.push(this.name);
      result.push(this.atoms.length + ' ' + this.bonds.length);
      normalized.push(this.atoms.length + ' ' + this.bonds.length);
      this.normalize();
      this.atoms.forEach(function (atom) {
        result.push([atom.element, atom.x, atom.y, atom.z].join(' '));
        normalized.push([atom.element, atom.nx, atom.ny, atom.nz].join(' '));
      });

      this.bonds.forEach(function (bond) {
        result.push([bond.startAtom.index, bond.endAtom.index, bond.order].join(' '));
        normalized.push([bond.startAtom.index, bond.endAtom.index, bond.order].join(' '));
      });

      return {
        original: result.join('\n'),
        normalized: normalized.join('\n')
      };
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

    Molecule.prototype.getBoundingBox = function () {
      var positions = this.atoms.map(function (atom) {
        return {x: atom.x, y: atom.y, z: atom.z, index: atom.index};
      });

      positions.sort(function (a,b){return a.x - b.x;});
      this.minX = positions[0].x;
      this.maxX = positions[positions.length - 1].x;
      positions.sort(function (a,b) {return a.y - b.y;});
      this.minY = positions[0].y;
      this.maxY = positions[positions.length - 1].y;
      positions.sort(function (a,b) {return a.z - b.z;});
      this.minZ = positions[0].z;
      this.maxZ = positions[positions.length - 1].z;

      this.width = this.maxX - this.minX;
      this.cx = this.minX + (this.width / 2);
      this.height = this.maxY - this.minY;
      this.cy = this.minY + (this.height / 2);
      this.depth = this.maxZ - this.minZ;
      console.log(this.depth);
      this.cz = this.minZ + (this.depth / 2);
      this.depth = this.depth === 0 ? 1 : this.depth;
    };

    Molecule.prototype.normalize = function () {
      this.getBoundingBox();
      var minX = this.minX, minY = this.minY, minZ = this.minZ;
      var height = this.height, width = this.width, depth = this.depth;
      var atoms = this.atoms.map(function (atom) {
        atom.nx = (((atom.x - minX) / width) - 0.5).toFixed(3);
        atom.ny = (((atom.y - minY) / height) - 0.5).toFixed(3);
        atom.nz = (((atom.z - minZ) / depth)).toFixed(3);
        //atom.nx = atom.x - (minX + width) / 2;
        //atom.nx = atom.nx / (1 * width / 2);
        //atom.nx = atom.nx.toFixed(3);
        //atom.ny = atom.y - (minY + height) / 2;
        //atom.ny = atom.ny / (1 * height / 2);
        //atom.ny = atom.ny.toFixed(3);
        //atom.nz = atom.z - (minZ + depth) / 2;
        //atom.nz = atom.z / (1 * depth / 2);
        //atom.nz = atom.nz ? atom.nz : 1;
        //atom.nz = atom.nz.toFixed(3);
        return atom;
      });
      return atoms;

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
