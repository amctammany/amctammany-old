'use strict';

angular.module('mctApp')
  .factory('Atom', function () {
    var Atom = function (element, x, y, z, molecule) {
      this.element = element;
      this.x = x;
      this.y = y;
      this.z = z;
      this.molecule = molecule;

      this.bonds = [];
      this.index = undefined;

    };

    Atom.prototype.distanceFrom = function (x, y, z) {
      var dx = this.x - x;
      var dy = this.y - y;
      var dz = this.z - z;
      var distance = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
      return distance;
    };

    Atom.prototype.bondTo = function (atom, order) {
      this.molecule.addBond(this, atom, order);
    };


    Atom.prototype.draw = function (ctx) {
      ctx.fillStyle = 'white';
      ctx.arc(this.x, this.y, 5, 0, 6.28, 1);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = this.molecule.selectedAtom === this ? 'red' : 'black';
      ctx.fillText(this.element, this.x - 2, this.y + 5);
      ctx.closePath();
      ctx.fill();
    };

    return Atom;
  });
