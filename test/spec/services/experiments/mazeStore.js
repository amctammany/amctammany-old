'use strict';

describe('Service: MazeStore', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var MazeStore;
  beforeEach(inject(function (_MazeStore_) {
    MazeStore = _MazeStore_;
  }));

  it('should do something', function () {
    expect(!!MazeStore).toBe(true);
  });

});
