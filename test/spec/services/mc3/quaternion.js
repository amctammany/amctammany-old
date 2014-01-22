'use strict';

describe('Service: Quaternion', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Quaternion;
  beforeEach(inject(function (_Quaternion_) {
    Quaternion = _Quaternion_;
  }));

  it('should do something', function () {
    expect(!!Quaternion).toBe(true);
  });

});
