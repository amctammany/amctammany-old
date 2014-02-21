'use strict';

describe('Service: Particle', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Particle;
  beforeEach(inject(function (_Particle_) {
    Particle = _Particle_;
  }));

  it('should do something', function () {
    expect(!!Particle).toBe(true);
  });

  it('should instantiate with positions and masses', function (){
    var x = 10, y = 10, z = 10, mass = 2;
    var particle = new Particle('world', x, y, z, mass);
    expect(particle.current.x).toBe(x);
    expect(particle.current.y).toBe(y);
    expect(particle.current.z).toBe(z);

    expect(particle.previous.x).toBe(x);
    expect(particle.previous.y).toBe(y);
    expect(particle.previous.z).toBe(z);

    expect(particle.mass).toBe(mass);
    expect(particle.inverseMass).toBe(1 / mass);
  })

});
