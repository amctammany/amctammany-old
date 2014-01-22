'use strict';

describe('Service: RenderableObject', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var RenderableObject;
  beforeEach(inject(function (_RenderableObject_) {
    RenderableObject = _RenderableObject_;
  }));

  it('should do something', function () {
    expect(!!RenderableObject).toBe(true);
  });

});
