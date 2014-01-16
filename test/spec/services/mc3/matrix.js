'use strict';

describe('Service: Matrix', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Matrix;
  beforeEach(inject(function (_Matrix_) {
    Matrix = _Matrix_;
  }));

  it('should do something', function () {
    expect(!!Matrix).toBe(true);
  });

});
