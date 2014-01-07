'use strict';

describe('Service: Vector3', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Vector3, v, x, y, z;
  beforeEach(inject(function (_Vector3_) {
    Vector3 = _Vector3_;
  }));

  it('should do something', function () {
    expect(!!Vector3).toBe(true);
    x = 10, y = 10, z = 10;
    v = new Vector3(x, y, z);
  });

  it('should instantiate vector with x y z', function () {
    expect(v.x).toBe(x);
    expect(v.y).toBe(y);
    expect(v.z).toBe(z);
  });

  it('should get magnitude of vector', function () {
    var length = v.getMagnitude();
    expect(length).toBe(Math.sqrt(300));
  });

  it('should normalize vector', function () {
    var normalized = v.normalize();
    var n = 10 / Math.sqrt(300);
    expect(normalized.x).toBe(n);
    expect(normalized.y).toBe(n);
    expect(normalized.z).toBe(n);
  });

  it('should add vectors', function () {
    var v1 = new Vector3(5, 10, 15);
    var sum = v.add(v1);
    expect(sum.x).toBe(15);
    expect(sum.y).toBe(20);
    expect(sum.z).toBe(25);
  });

  it('should subtract vectors', function () {
    var v1 = new Vector3(5, 10, 15);
    var sum = v.sub(v1);
    expect(sum.x).toBe(5);
    expect(sum.y).toBe(0);
    expect(sum.z).toBe(-5);
  });

  it('should create dot product of two vectors', function () {
    var v1 = new Vector3(5, 10, 15);
    var dot = v.dot(v1);
    expect(dot).toBe(300);
  });

  it('should create cross product of two vectors', function () {
    var v1 = new Vector3(5, 10, 15);
    var cross = v.cross(v1);
    expect(cross.x).toBe(50);
    expect(cross.y).toBe(-100);
    expect(cross.z).toBe(50);
  });


});

