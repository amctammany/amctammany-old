'use strict';

angular.module('mctApp')
  .factory('Euler', function () {
    var Euler = function (x, y, z, order) {

      this._x = x || 0;
      this._y = y || 0;
      this._z = z || 0;
      this._order = order || 'XYZ';

      this._quaternion = undefined;
    };

    Euler.prototype = {
      _updateQuaternion: function () {
        if (this._quaternion !== undefined) {
          this._quaternion.setFromEuler(this, false);
        }
      },

      get x () {
        return this._x;
      },
      set x (value) {
        this._x = value;
        this._updateQuaternion();
      },

      get y () {
        return this._y;
      },
      set y (value) {
        this._y = value;
        this._updateQuaternion();
      },

      get z () {
        return this._z;
      },
      set z (value) {
        this._z = value;
        this._updateQuaternion();
      },

      get order () {
        return this._order;
      },
      set order (value) {
        this._order = value;
        this._updateQuaternion();
      },

      setFromQuaternion: function (q, order, update) {
        function clamp(x) {
          return Math.min(Math.max(x, -1), 1);
        }

        var sqx = q.x * q.x;
        var sqy = q.y * q.y;
        var sqz = q.z * q.z;
        var sqw = q.w * q.w;

        order = order || this._order;


        if (order === 'XYZ') {
          this._x = Math.atan2(2 * (q.x * q.w - q.y * q.z), (sqw - sqx - sqy + sqz));
          this._y = Math.asin(clamp(2 * (q.x * q.z + q.y * q.w)));
          this._z = Math.atan2(2 * (q.z * q.w - q.x * q.y), (sqw + sqx - sqy - sqz));
        }

        this._order = order;
        if (update !== false) {
          this._updateQuaternion();
        }
        return this;
      }
    };

    return Euler;
  });
