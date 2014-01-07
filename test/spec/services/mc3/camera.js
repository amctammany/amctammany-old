'use strict';

describe('Service: Camera', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Camera;
  beforeEach(inject(function (_Camera_) {
    Camera = _Camera_;
  }));

  it('should do something', function () {
    expect(!!Camera).toBe(true);
  });

});
