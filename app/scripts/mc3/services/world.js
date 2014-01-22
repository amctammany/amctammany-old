'use strict';

angular.module('mctApp')
  .factory('World', function (Object3d) {
    var World = function () {
      Object3d.call(this);
      this.autoUpdate = true;

      this.objectsAdded = [];
      this.objectsRemoved = [];


    };

    World.prototype = Object.create(Object3d.prototype);

    World.prototype.addObject = function (object) {
      this.objectsAdded.push(object);

    };

    World.prototype.removeObject = function (object) {
      this.objectsRemoved.push(object);

    };

    return World;
  });
