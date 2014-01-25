'use strict';

describe('Service: Euler', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Euler;
  beforeEach(inject(function (_Euler_) {
    Euler = _Euler_;
  }));

  it('should do something', function () {
    expect(!!Euler).toBe(true);
  });

});
