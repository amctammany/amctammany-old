'use strict';

describe('Service: World', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var World;
  beforeEach(inject(function (_World_) {
    World = _World_;
  }));

  it('should do something', function () {
    expect(!!World).toBe(true);
  });

});
