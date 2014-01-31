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
      this.index = undefined;

      this.atoms = [this.startAtom, this.endAtom];

      this.restLength = 0.25;
      this.k = this.molecule.bondConstant;
      this.selected = false;

    };

    Bond.prototype.getOtherAtom = function (atom) {
      if (this.atoms.indexOf(atom) === -1) {return false;}
      return atom === this.startAtom ? this.endAtom : this.startAtom;
    };

    Bond.prototype.getTopAtom = function () {
      return (this.startAtom.position.z - this.endAtom.position.z > 0) ? this.startAtom : this.endAtom;
    };
    Bond.prototype.getBottomAtom = function () {
      return this.getOtherAtom(this.getTopAtom());
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
      if (z === 0) { dz = 0;}
      var length = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
      return length;
    };
    Bond.prototype.remove = function () {
      var index = this.molecule.bonds.indexOf(this);
      this.molecule.bonds.splice(index, 1);

    };
    Bond.prototype.draw = function (ctx) {
      var a1 = this.getTopAtom();
      a1.getScreenPosition();
      var a2 = this.getBottomAtom();
      a2.getScreenPosition();
      ctx.beginPath();
      ctx.strokeStyle = this.selected ? 'red' : 'black';
      //var dz = a1.position.z - a2.position.z;
      //if (dz > 0.15) {
        //ctx.lineWidth = 3;
        //ctx.setLineDash([]);
      //} else if (dz < 0.15) {
        //ctx.lineWidth = 1;
        //ctx.setLineDash([5]);
      //} else {
        //ctx.lineWidth = 1;
        //ctx.setLineDash([]);
      //}
      for (var i = 1; i <= this.order; i++) {
        ctx.moveTo(a1.screenX + (i * 2 - 1), a1.screenY + i * 2 - 1);
        ctx.lineTo(a2.screenX + i * 2 - 1, a2.screenY + i * 2 - 1);
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
