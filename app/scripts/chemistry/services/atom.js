'use strict';

angular.module('mctApp')
  .factory('Atom', function (Vector3) {
    var Atom = function (element, x, y, z, molecule) {
      this.element = element;
      this.x = x;
      this.y = y;
      this.z = z;

      this.position = new Vector3(x, y, z);
      this.molecule = molecule;


      this.bonds = [];
      this.index = undefined;
      this.selected = false;
      this.getScreenPosition();

    };

    Atom.prototype.vsper = function () {
      var donated;
      if (this.element === 'C') {
        donated = this.bonds.reduce(function (a, b) {
          return (a + b.order);
        }, 0);
      }
      return donated;
    };

    Atom.prototype.getScreenPosition = function () {
      this.screenX = this.position.x * this.molecule.workingWidth + this.molecule.halfWidth;
      this.screenY = this.position.y * this.molecule.workingHeight + this.molecule.halfHeight;
    };
    Atom.prototype.distanceFrom = function (x, y, z) {
      var v = this.molecule.toNormalCoordinates(x, y, z);
      var d = this.position.sub(v);
      var length = d.length();
      return length;
    };

    Atom.prototype.bondTo = function (atom, order) {
      this.molecule.addBond(this, atom, order);
    };
    Atom.prototype.select = function () {
      this.selected = this.selected ? false : true;
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
