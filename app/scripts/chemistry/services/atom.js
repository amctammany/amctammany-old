'use strict';

angular.module('mctApp')
  .factory('Atom', function (Vector3, BondAngle) {
    var Atom = function (element, x, y, z, molecule) {
      this.element = element;
      this.x = x;
      this.y = y;
      this.z = z;

      this.position = new Vector3(x, y, z);
      this.molecule = molecule;


      this.bonds = [];
      this.bondAngles = undefined;
      this.selected = false;
      this.getScreenPosition();

    };

    Atom.prototype.addBondAngle = function (b1, b2) {
      if (b1 === b2) { return false;}
      for (var i = 0, l = this.bondAngles.length; i < l; i++) {
        var angle = this.bondAngles[i];
        if (angle.bonds.indexOf(b1) >= 0 && angle.bonds.indexOf(b2) >= 0) {
          return false;
        }

      }
      var bondAngle = new BondAngle(this, b1, b2);
      this.bondAngles.push(bondAngle);
      this.molecule.bondAngles.push(bondAngle);
      return bondAngle;
    };
    Atom.prototype.getIndex = function () {
      return this.molecule.atoms.indexOf(this);
    };
    Atom.prototype.getBondAngles = function () {
      if (this.bondAngles !== undefined) {return;}
      this.bondAngles = [];
      for (var i = 0, l = this.bonds.length; i < l; i++) {
        for (var j = 0; j < l; j++) {
          var b1 = this.bonds[i];
          var b2 = this.bonds[j];
          this.addBondAngle(b1, b2);
        }
      }
    };

    Atom.prototype.vsper = function () {
      return this.bonds.length;
      //var donated;
      //if (this.element === 'C') {
        //donated = this.bonds.reduce(function (a, b) {
          //return (a + b.order);
        //}, 0);
      //}
      //return donated;
    };

    Atom.prototype.getScreenPosition = function () {
      this.screenX = this.position.x * this.molecule.workingWidth + this.molecule.halfWidth;
      this.screenY = this.position.y * this.molecule.workingHeight + this.molecule.halfHeight;
    };
    Atom.prototype.distanceFrom = function (x, y, z) {
      var v = this.molecule.toNormalCoordinates(x, y, z);
      var d = this.position.sub(v);
      d.z = 0;
      var length = d.length();
      return length;
    };

    Atom.prototype.bondTo = function (atom, order) {
      for (var i = 0, l = this.bonds.length; i < l; i++) {
        var bond = this.bonds[i];
        if (bond.atoms.indexOf(atom) >= 0) {
          return false;
        }
      }
      this.molecule.addBond(this, atom, order);
    };
    Atom.prototype.remove = function () {
      this.molecule.atoms.splice(this.getIndex(), 1);
      this.bonds.forEach(function (bond) {
        bond.remove();
      });
    }
    Atom.prototype.select = function () {
      this.selected = true;
    };
    Atom.prototype.deselect = function () {
      this.selected = false;
    };

    Atom.prototype.copy = function () {
      return new Atom(this.element, this.x, this.y, this.z, this.molecule);
    };

    Atom.prototype.shift = function (dx, dy, dz) {
      this.position.x += dx;
      this.position.y += dy;
      this.position.z += dz;
      this.getScreenPosition();
      return this;
    };
    Atom.prototype.draw = function (ctx) {
      this.getScreenPosition();
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.screenX, this.screenY, 8, 0, 6.28, 0);
      //ctx.rect(this.x - 5, this.y - 5, 10, 10);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = this.selected ? 'red' : 'black';
      ctx.fillText(this.element, this.screenX - 4, this.screenY + 5);
      ctx.closePath();
      ctx.fill();
    };

    return Atom;
  });
