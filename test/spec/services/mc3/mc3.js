'use strict';

describe('Service: Mc3', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Mc3;
  beforeEach(inject(function (_Mc3_) {
    Mc3 = _Mc3_;
  }));

  it('should do something', function () {
    expect(!!Mc3).toBe(true);
  });

});
