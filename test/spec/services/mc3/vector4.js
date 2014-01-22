'use strict';

describe('Service: Vector4', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Vector4;
  beforeEach(inject(function (_Vector4_) {
    Vector4 = _Vector4_;
  }));

  it('should do something', function () {
    expect(!!Vector4).toBe(true);
  });

});
