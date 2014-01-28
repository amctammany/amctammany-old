'use strict';

describe('Service: Atom', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Atom;
  beforeEach(inject(function (_Atom_) {
    Atom = _Atom_;
  }));

  it('should do something', function () {
    expect(!!Atom).toBe(true);
  });

});
