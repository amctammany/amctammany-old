'use strict';

describe('Service: GameWorld', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var GameWorld, Particle;

  beforeEach(inject(function (_GameWorld_, _Particle_) {
    GameWorld = _GameWorld_;
    Particle = _Particle_;
  }));

  it('should do something', function () {
    expect(!!GameWorld).toBe(true);
  });

});
