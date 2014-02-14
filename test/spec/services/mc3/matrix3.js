'use strict';

describe('Service: Matrix3', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Matrix3;
  beforeEach(inject(function (_Matrix3_) {
    Matrix3 = _Matrix3_;
  }));

  it('should do something', function () {
    expect(!!Matrix3).toBe(true);
  });

});
