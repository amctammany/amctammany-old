'use strict';

describe('Service: Object3d', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Object3d;
  beforeEach(inject(function (_Object3d_) {
    Object3d = _Object3d_;
  }));

  it('should do something', function () {
    expect(!!Object3d).toBe(true);
  });

});
