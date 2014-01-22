'use strict';

describe('Service: Projector', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Projector;
  beforeEach(inject(function (_Projector_) {
    Projector = _Projector_;
  }));

  it('should do something', function () {
    expect(!!Projector).toBe(true);
  });

});
