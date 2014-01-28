'use strict';

describe('Service: Bond', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Bond;
  beforeEach(inject(function (_Bond_) {
    Bond = _Bond_;
  }));

  it('should do something', function () {
    expect(!!Bond).toBe(true);
  });

});
