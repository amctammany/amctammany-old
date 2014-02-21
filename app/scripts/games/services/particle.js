'use strict';

angular.module('mctApp')
  .factory('Particle', function (Vector3) {
    var Particle = function (world, x, y, z, mass) {
      this.world = world;
      this.current = new Vector3(x, y, z);
      this.previous = new Vector3(x, y, z);
      this.velocity = new Vector3(0, 0, 0);
      this.acceleration = new Vector3(0, 0, 0);

      this.forceAccumulator = new Vector3(0, 0, 0);
      this.mass = (mass !== undefined) ? mass : 1;
      this.inverseMass = (this.mass !== 0) ? 1.0 / mass : 0;

    };

    Particle.prototype.integrate = function (delta, damping) {
      if (this.inverseMass === 0) {return;}
      // Work out acceleration
      this.acceleration.iadd(this.forceAccumulator.mul(this.inverseMass * (delta * delta)));

      // Update velocity from acceleration
      //this.velocity.iadd(this.acceleration.mul(delta));

      // Update Position
      // Damping = 0.01
      this.velocity = this.current.mul(1 - damping).sub(this.previous.mul(1 - damping)).add(this.acceleration);
      var position = this.current.add(this.velocity);
      this.previous = this.current;
      this.current = position;
      //this.position.iadd(this.velocity.mul(delta));

      // Impose drag
      //this.velocity.imul(Math.pow(this.damping, delta));

      this.clearAccumulator();
    };
    Particle.prototype.addForce = function (f) {
      this.forceAccumulator.iadd(f);
    };
    Particle.prototype.accelerate = function (x, y, z) {
      var f = new Vector3(x, y, z);
      this.addForce(f);
    };
    Particle.prototype.clearAccumulator = function () {
      this.acceleration.zero();
      this.forceAccumulator.zero();
    };




    return Particle;
  });
