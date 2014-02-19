'use strict';

describe('Service: Floor', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Floor;
  beforeEach(inject(function (_Floor_) {
    Floor = _Floor_;
  }));

  it('should do something', function () {
    expect(!!Floor).toBe(true);
  });

});
