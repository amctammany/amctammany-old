'use strict';

describe('Service: Wall', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Wall, wall;
  beforeEach(inject(function (_Wall_) {
    Wall = _Wall_;
    wall = new Wall([0, 0, 0], [0, 0, 1], [1, 0, 0], 2, 2, 'blue')
  }));

  it('should do something', function () {
    expect(!!Wall).toBe(true);
  });

  it('should instantiate wall', function () {
    expect(wall.center.x).toBe(0);
    expect(wall.center.y).toBe(0);
    expect(wall.center.z).toBe(0);

    expect(wall.tangent.x).toBe(1);
    expect(wall.tangent.y).toBe(0);
    expect(wall.tangent.z).toBe(0);

    expect(wall.normal.x).toBe(0);
    expect(wall.normal.y).toBe(0);
    expect(wall.normal.z).toBe(1);
  });

  it('should get vertices', function () {
    var vertices = wall.getVertices();
    expect(vertices.length).toBe(4);
    expect(vertices[0].x).toBe(-1);
    expect(vertices[0].y).toBe(1);
    expect(vertices[0].z).toBe(0);

    expect(vertices[1].x).toBe(1);
    expect(vertices[1].y).toBe(1);
    expect(vertices[1].z).toBe(0);

    expect(vertices[2].x).toBe(1);
    expect(vertices[2].y).toBe(-1);
    expect(vertices[2].z).toBe(0);

    expect(vertices[3].x).toBe(-1);
    expect(vertices[3].y).toBe(-1);
    expect(vertices[3].z).toBe(0);
  })

});
