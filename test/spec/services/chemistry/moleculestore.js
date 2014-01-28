'use strict';

describe('Service: moleculeStore', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var MoleculeStore;
  beforeEach(inject(function (_MoleculeStore_) {
    MoleculeStore = _MoleculeStore_;
  }));

  it('should do something', function () {
    expect(!!MoleculeStore).toBe(true);
  });

});
