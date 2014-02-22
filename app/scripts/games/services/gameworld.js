'use strict';

angular.module('mctApp')
  .factory('GameWorld', function () {
    var GameWorld = function () {
      this.objects = [];
      this.movables = [];
      this.immovables = [];
      this.worldChanged = false;
    };

    GameWorld.prototype.addObject = function (object) {
      this.worldChanged = true;
      this.objects.push(object);
    };

    GameWorld.prototype.removeObject = function (object) {
      this.worldChanged = true;
      var index = this.objects.indexOf(object);
      if (index >= 0) {
        this.objects.splice(index, 1);
      }
    };

    GameWorld.prototype.draw = function (ctx) {
      this.objects.forEach(function (obj) {
        obj.draw(ctx);
      });
    };
    GameWorld.prototype.update = function (delta) {
      var detect = this.detectParticleCollisions;
      var self = this;
      this.movables.forEach(function (obj) {
        if (!obj.particle) {
          return false;
        }
        detect.call(self, obj.particle);

        obj.update(delta, 0.0);
      });
    };

    GameWorld.prototype.detectParticleCollisions = function (particle) {
      var d, l, sqL;
      this.objects.forEach(function (obj) {
        var target = 1;
        if (particle === obj.particle) { return;}
        d = particle.getCurrent().sub(obj.particle.getCurrent());
        l = d.length();
        sqL = l * l;
        if (l < target) {
          console.log('collision');
          var factor = (l - target) / l;
          //var v1 = particle.velocity;
          //var v2 = obj.particle.velocity;
          d.x += 10;
          particle.addForce(d.mul(factor * 10));
          obj.particle.addForce(d.mul(factor * -10));
        }
      });

    };


    GameWorld.prototype.start = function () {
      if (!this.worldChanged) { return; }
      this.movables = this.objects.filter(function (obj) {
        return obj.particle.inverseMass !== 0;
      });
      this.immovables = this.objects.filter(function (obj) {
        return obj.particle.inverseMass === 0;
      });
      this.worldChanged = false;
    };

    return GameWorld;
  });
