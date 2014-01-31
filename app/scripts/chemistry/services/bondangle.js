'use strict';

angular.module('mctApp')
  .factory('BondAngle', function () {
    var BOND_ANGLES = {
      2: 180,
      3: 120,
      4: 109.5,
    };

    var BOND_ANGLES_RAD = {
      2: 1,
      3: 2 * Math.PI / 3,
      4: 109.5 * Math.PI / 180,
    };
    var BondAngle = function (atom, b1, b2) {
      this.name = 'foo';
      this.atom = atom;
      this.molecule = this.atom.molecule;
      this.bonds = [b1, b2];
      this.ideal = BOND_ANGLES[this.atom.vsper()];
      this.idealRad = BOND_ANGLES_RAD[this.atom.vsper()];
      this.b1 = b1;
      this.a1 = this.b1.getOtherAtom(this.atom);
      this.b2 = b2;
      this.a2 = this.b2.getOtherAtom(this.atom);
      this.k = this.molecule.bondAngleConstant;

    };
    BondAngle.prototype.getAngle = function () {
      var v1 = this.a1.position.sub(this.atom.position);
      var v2 = this.a2.position.sub(this.atom.position);
      var dot = v1.dot(v2);
      var cTheta = dot / (v1.length() * v2.length());
      var angle = Math.acos(cTheta) * 180 / Math.PI;
      return angle;
    };

    BondAngle.prototype.getRad = function () {
      var angle = this.getAngle();
      return angle * Math.PI / 180;
    };

    BondAngle.prototype.satisfy = function () {
      var diff = this.a1.position.sub(this.a2.position).normalize();
      var dA = (this.getAngle() - this.ideal) / this.ideal;
      this.a1.position.isub(diff.mul(dA * this.k));
      this.a2.position.iadd(diff.mul(dA * this.k));
    };

    BondAngle.prototype.select = function () {
      this.b1.select();
      this.b2.select();
    };
    BondAngle.prototype.deselect = function () {
      this.b1.deselect();
      this.b2.deselect();
    };

    return BondAngle;
  });
