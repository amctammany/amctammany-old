'use strict';

angular.module('mctApp')
  .factory('Object3d', function (Vector3, Matrix4, Quaternion) {
    var Object3d = function () {

      this.name = '';
      this.parent = undefined;
      this.children = [];

      this.position = new Vector3(0, 0, 0);
      this.rotation = new Vector3(0, 0, 0);
      this.quaternion = new Quaternion();
      this.scale = new Vector3(1, 1, 1);


      this.matrix = new Matrix4();
      this.matrixWorld = new Matrix4();
      this.matrixWorld.makeRotationFromQuaternion(this.quaternion);

      this.matrixAutoUpdate = true;
      this.matrixWorldNeedsUpdate = true;

    };

    Object3d.prototype = {
       add: function (object) {
        if (object === this) {
          console.warn('Cannot add object as child of itself');
          return;
        }
        if (object instanceof Object3d) {
          if (object.parent !== undefined) {
            object.parent.remove(object);
          }

          object.parent = this;

          this.children.push(object);

          var world = this;
          while (world.parent !== undefined) {
            world = world.parent;
          }
          if (world !== undefined) {
            world.addObject(object);
          }
        }
      },

      remove: function (object) {
        var index = this.children.indexOf(object);

        if (index !== -1) {
          object.parent = undefined;
          this.children.splice(index, 1);

          var world = this;
          while (world.parent !== undefined) {
            world = world.parent;
          }
          if (world !== undefined) {
            world.removeObject(object);
          }
        }
      },
      lookAt: function (vector) {
        var m1 = new Matrix4();
        m1.lookAt(vector, this.position, this.up);
        this.quaternion.setFromRotationMatrix(m1);
      },

      updateMatrix:  function () {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrixWorldNeedsUpdate = true;
      },

      updateMatrixWorld: function (force) {
        if (this.matrixAutoUpdate === true) { this.updateMatrix(); }
        if (this.matrixWorldNeedsUpdate === true || force === true) {
          if (this.parent === undefined) {
            this.matrixWorld.copy(this.matrix);
          } else {
            this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
          }
          this.matrixWorldNeedsUpdate = false;
          force = true;
        }

        for (var i = 0, l = this.children.length; i < l; i++) {
          this.children[i].updateMatrixWorld(force);
        }
      }
    }
    return Object3d;
  });
