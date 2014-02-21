'use strict';

angular.module('mctApp')
  .factory('Object3d', function (Vector3, Matrix4, Quaternion, Euler) {
    var Object3d = function () {

      this.name = '';
      this.parent = undefined;
      this.children = [];

      this.position = new Vector3(0, 0, 0);
      this.previous = new Vector3(0, 0, 0);
      this._rotation = new Euler();
      this._quaternion = new Quaternion();
      this.scale = new Vector3(1, 1, 1);

      this._rotation._quaternion = this.quaternion;
      this._quaternion._euler = this.rotation;


      this.matrix = new Matrix4();
      this.matrixWorld = new Matrix4();
      this.matrixWorld.makeRotationFromQuaternion(this.quaternion);

      this.matrixAutoUpdate = true;
      this.matrixWorldNeedsUpdate = true;

    };

    Object3d.prototype = {

      get rotation () {
        return this._rotation;
      },
      set rotation (value) {
        this._rotation = value;
        this._rotation._quaternion = this._quaternion;
        this._quaternion._euler = this._rotation;
        this._rotation._updateQuaternion();
      },

      get quaternion () {
        return this._quaternion;
      },
      set quaternion (value) {
        this._quaternion = value;
        this._quaternion._euler = this._rotation;
        this._rotation._quaternion = this._quaternion;
        this._quaternion._updateEuler();
      },

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
          this.world = world;
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
      rotateOnAxis: function (axis, angle) {
        var q1 = new Quaternion();
        q1.setFromAxisAngle(axis, angle);
        this.quaternion.multiply(q1);
        return this;
      },
      rotateX: function (angle) {
        var v1 = new Vector3(1, 0, 0);
        this.rotateOnAxis(v1, angle);
      },
      rotateY: function (angle) {
        var v1 = new Vector3(0, 1, 0);
        this.rotateOnAxis(v1, angle);
      },
      rotateZ: function (angle) {
        var v1 = new Vector3(0, 0, 1);
        this.rotateOnAxis(v1, angle);
      },

      move: function (x, y, z) {
        this.previous.copy(this.position);
        this.matrixWorld.translate([x, y, z]);
        this.position = this.matrixWorld.getPosition();
        var vector = this.position.sub(this.previous);
        console.log(vector);
        //console.log(this.world);

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
    };
    return Object3d;
  });
