'use strict';

describe('Service: Sphere', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Sphere;
  beforeEach(inject(function (_Sphere_) {
    Sphere = _Sphere_;
  }));

  it('should do something', function () {
    expect(!!Sphere).toBe(true);
  });

});
