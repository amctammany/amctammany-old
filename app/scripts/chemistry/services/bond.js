'use strict';

angular.module('mctApp')
  .factory('Bond', function () {
    var Bond = function (start, end, order, molecule) {
      this.startAtom = start;
      this.startAtom.bonds.push(this);
      this.endAtom = end;
      this.endAtom.bonds.push(this);
      this.order = order;
      this.molecule = molecule;

      this.atoms = [this.startAtom, this.endAtom];

      this.restLength = 0.25;
      this.k = 0.2;
      this.selected = false;

    };

    Bond.prototype.getOtherAtom = function (atom) {
      if (this.atoms.indexOf(atom) === -1) {return false;}
      return atom === this.startAtom ? this.endAtom : this.startAtom;
    };

    Bond.prototype.select = function () {
      this.selected = true;
    };
    Bond.prototype.deselect = function () {
      this.selected = false;
    };
    Bond.prototype.satisfy = function () {
      var dir = this.startAtom.position.sub(this.endAtom.position);
      var d = (dir.length() - this.restLength) / this.restLength;
      this.startAtom.position.isub(dir.mul(this.k * d));
      this.endAtom.position.iadd(dir.mul(this.k * d));
    };
    Bond.prototype.length = function () {
      var length = this.startAtom.position.sub(this.endAtom.position).length();
      return length;
    };
    Bond.prototype.distanceFrom = function (x, y, z) {
      var midX = ((this.startAtom.x - this.endAtom.x) / 2) + this.endAtom.x;
      var midY = ((this.startAtom.y - this.endAtom.y) / 2) + this.endAtom.y;
      var midZ = ((this.startAtom.z - this.endAtom.z) / 2) + this.endAtom.z;
      var dx = midX - x;
      var dy = midY - y;
      var dz = midZ - z;
      var length = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
      return length;
    };
    Bond.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = this.selected ? 'red' : 'black';
      this.startAtom.getScreenPosition();
      this.endAtom.getScreenPosition();
      for (var i = 1; i <= this.order; i++) {
        ctx.moveTo(this.startAtom.screenX + (i * 2 - 1), this.startAtom.screenY + i * 2 - 1);
        ctx.lineTo(this.endAtom.screenX + i * 2 - 1, this.endAtom.screenY + i * 2 - 1);
      }
      ctx.closePath();
      ctx.stroke();
    };
    Bond.prototype.increment = function () {
      this.order = (this.order++ % 3) + 1;
      console.log(this.order);
    };

    return Bond;
  });
