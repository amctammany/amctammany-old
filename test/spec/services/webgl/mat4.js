'use strict';

describe('Service: Mat4', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Mat4;
  beforeEach(inject(function (_Mat4_) {
    Mat4 = _Mat4_;
  }));

  it('should do something', function () {
    expect(!!Mat4).toBe(true);
  });

});
