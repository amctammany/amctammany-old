'use strict';

describe('Service: Matrix4', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Matrix4;
  beforeEach(inject(function (_Matrix4_) {
    Matrix4 = _Matrix4_;
  }));

  it('should do something', function () {
    expect(!!Matrix4).toBe(true);
  });

});
