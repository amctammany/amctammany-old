'use strict';

angular.module('mctApp')
  .factory('World', function (Object3d) {
    var World = function () {
      Object3d.call(this);


    };

    World.prototype = Object.create(Object3d.prototype);

    World.prototype.addObject = function (object) {

    };

    World.prototype.removeObject = function (object) {

    };

    return World;
  });
