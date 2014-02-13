'use strict';

describe('Service: GLRenderer', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var GLRenderer;
  beforeEach(inject(function (_GLRenderer_) {
    GLRenderer = _GLRenderer_;
  }));

  it('should do something', function () {
    expect(!!GLRenderer).toBe(true);
  });

});
