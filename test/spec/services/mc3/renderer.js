'use strict';

describe('Service: Renderer', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Renderer;
  beforeEach(inject(function (_Renderer_) {
    Renderer = _Renderer_;
  }));

  it('should do something', function () {
    expect(!!Renderer).toBe(true);
  });

});
