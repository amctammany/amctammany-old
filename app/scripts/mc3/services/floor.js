'use strict';

angular.module('mctApp')
  .factory('Floor', function (Wall, Object3d, Vector3) {
    var Floor = function (center, width, height, color) {
      this.center = new Vector3(center[0], center[1], center[2]);
      this.normal = new Vector3(0, 1, 0);
      this.tangent = new Vector3(1, 0, 0);
      this.width = width;
      this.halfWidth = width / 2;
      this.height = height;
      this.halfHeight = height / 2;
      this.color = color;

      this.getVertices();
      Object3d.call(this);
    };

    Floor.prototype = Object.create(Wall.prototype);


    return Floor;
  });
