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
      ctx.beginPath();
      ctx.arc(this.x, this.y, 8, 0, 6.28, 0);
      //ctx.rect(this.x - 5, this.y - 5, 10, 10);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = this.molecule.selectedAtom === this ? 'red' : 'black';
      ctx.fillText(this.element, this.x - 4, this.y + 5);
      ctx.closePath();
      ctx.fill();
    };

    return Atom;
  });
