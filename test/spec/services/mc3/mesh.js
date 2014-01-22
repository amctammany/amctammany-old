'use strict';

describe('Service: Mesh', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Mesh;
  beforeEach(inject(function (_Mesh_) {
    Mesh = _Mesh_;
  }));

  it('should do something', function () {
    expect(!!Mesh).toBe(true);
  });

});
