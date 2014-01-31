'use strict';

describe('Service: BondAngle', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var BondAngle;
  beforeEach(inject(function (_BondAngle_) {
    BondAngle = _BondAngle_;
  }));

  it('should do something', function () {
    expect(!!BondAngle).toBe(true);
  });

});
