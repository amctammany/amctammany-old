'use strict';

angular.module('mctApp')
  .factory('Atom', function () {
    var Atom = function (element, x, y, z, molecule) {
      this.element = element;
      this.x = x;
      this.y = y;
      this.z = z;
      this.molecule = molecule;

      this.index = undefined;

    };

    Atom.prototype.draw = function (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x - 5, this.y - 5, 15, 12);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = this.molecule.selectedAtom === this ? 'red' : 'black';
      ctx.fillText(this.element, this.x - 2, this.y + 5);
      ctx.closePath();
      ctx.fill();

    }

    return Atom;
  });
