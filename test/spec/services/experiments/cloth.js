'use strict';

describe('Service: Cloth', function () {

  // load the service's module
  beforeEach(module('mctApp'));

  // instantiate service
  var Cloth, clothInstance;
  beforeEach(inject(function (_Cloth_) {
    Cloth = _Cloth_;
    var canvas = {width: 200, height: 200, getContext: function () {return null;}};
    clothInstance = new Cloth(canvas);
  }));

  it('should do something', function () {
    expect(!!Cloth).toBe(true);
  });

  it('should instantiate with defaults', function () {
    expect(!!clothInstance).toBe(true);
    expect(clothInstance.rows).toBe(Cloth.defaults.rows);
    expect(clothInstance.columns).toBe(Cloth.defaults.columns);
  });

  it('should get index of point', function () {
    expect(clothInstance.getIndex(0,0)).toBe(0);
    expect(clothInstance.getIndex(1,0)).toBe(1);
    expect(clothInstance.getIndex(2,0)).toBe(2);
    expect(clothInstance.getIndex(0,1)).toBe(15);
    expect(clothInstance.getIndex(1,2)).toBe(31);
  })

  it('should generate points', function () {
    clothInstance.generatePoints();
    expect(clothInstance.points.length).toBe(clothInstance.rows * clothInstance.columns);
  });


});
