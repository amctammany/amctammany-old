'use strict';

describe('Service: Vertex', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Vertex;
  beforeEach(inject(function (_Vertex_) {
    Vertex = _Vertex_;
  }));

  it('should do something', function () {
    expect(!!Vertex).toBe(true);
  });

});
