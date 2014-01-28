'use strict';

describe('Service: Molecule', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Molecule;
  beforeEach(inject(function (_Molecule_) {
    Molecule = _Molecule_;
  }));

  it('should do something', function () {
    expect(!!Molecule).toBe(true);
  });

});
