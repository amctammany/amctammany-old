'use strict';

describe('Service: Maze', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Maze;
  beforeEach(inject(function (_Maze_) {
    Maze = _Maze_;
  }));

  it('should do something', function () {
    expect(!!Maze).toBe(true);
  });

});
