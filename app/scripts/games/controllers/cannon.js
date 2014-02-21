'use strict';

angular.module('mctApp')
  .controller('CannonCtrl', function ($scope, $window, Vector3, Particle) {


    var Cannon = function (x, y) {
      this.x = x;
      this.y = y;
      this.rotation = 0;
    };
    Cannon.prototype.fire = function (dx, dy) {
      $scope.ball = new Ball(this.x, this.y);
      $scope.ball.particle.accelerate(2 * dx, 2 * dy, 0);

    };
    Cannon.prototype.draw = function (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.arc(0, 0, 15, 0, 6.28, 0);
      ctx.fillRect(-3, -25, 6, 25);
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.restore();
    };

    var Bucket = function (x, y) {
      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 30;
      this.intersectionPoint = new Vector3(0, 0, 0);
    };

    Bucket.prototype.draw = function (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.closePath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    Bucket.prototype.isBallInBucket = function (ball) {
      var x1 = ball.particle.previous.x, y1 = ball.particle.previous.y;
      var x2 = ball.particle.current.x, y2 = ball.particle.current.y;
      var x3 = this.x, y3 = this.y;
      var x4 = this.x + this.width, y4 = this.y;

      var m1 = (y2 - y1) / (x2 - x1);
      var m2 = (y4 - y3) / (y2 - y1);
      var b1 = y1 - (m1 * x1);
      var b2 = y3 - (m2 * x3);

      this.intersectionPoint.x = (b2 - b1) / (m1 - m2);
      this.intersectionPoint.y = m1 * this.intersectionPoint.x + b1;

      return this.intersectionPoint.x > x3 &&
        this.intersectionPoint.x < x4 &&
        y2 + ball.height > y3 &&
        x2 + ball.width < x4;
    };

    var Crosshair = function (x, y) {
      this.x = x;
      this.y = y;
    };
    Crosshair.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 5, 0, 6.28, 0);
      ctx.closePath();
      ctx.strokeStyle = 'red';
      ctx.stroke();
    };

    var Ball = function (x, y) {
      this.particle = new Particle('world', x, y, 0, 1);
      this.radius = 5;
      this.height = 5;
      this.width = 5;
    };
    Ball.prototype.update = function (delta) {
      if (this.checkBounds()) {
        this.reset();
      }
      this.particle.accelerate(0, 6, 0);
      this.particle.integrate(delta, 0.000);
      this.draw($scope.ctx);
    };
    Ball.prototype.reset = function () {
      $scope.ball = undefined;
      //this.particle = new Particle('world', $scope.cannon.x, $scope.cannon.y);
    };
    Ball.prototype.checkBounds = function () {
      if (this.particle.current.x < 0 || this.particle.current.x > $scope.canvas.width || this.particle.current.y > $scope.canvas.height) { // || this.particle.current.y > $scope.canvas.height) {
        return true;
      }
      else {
        return false;
      }
    };

    Ball.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.arc(this.particle.current.x, this.particle.current.y, this.radius, 0, 6.28, 0);
      ctx.closePath();
      ctx.fill();
    };

    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      $scope.ctx = canvas.getContext('2d');
      $scope.bucket = new Bucket(canvas.width * 0.9, canvas.height * 0.9);
      $scope.cannon = new Cannon(canvas.width * 0.05, canvas.height * 0.9);
      $scope.animFrame = $window.requestAnimationFrame(animate);
    };
    $scope.handleMouseDown = function (e) {
      $scope.crosshair = new Crosshair(e.offsetX, e.offsetY);
      var dx = e.offsetX - $scope.cannon.x;
      var dy = e.offsetY - $scope.cannon.y;
      var angle = Math.atan2(dy, dx) + (Math.PI / 2);
      $scope.cannon.rotation = angle;
    };

    $scope.handleMouseUp = function (e) {
      var dx = e.offsetX - $scope.cannon.x;
      var dy = e.offsetY - $scope.cannon.y;
      $scope.cannon.fire(dx, dy);
      $scope.crosshair = null;
    };

    $scope.handleMouseMove = function (e) {
      if ($scope.crosshair) {
        var dx = e.offsetX - $scope.cannon.x;
        var dy = e.offsetY - $scope.cannon.y;
        var angle = Math.atan2(dy, dx) + (Math.PI / 2);
        $scope.cannon.rotation = angle;
        $scope.crosshair.x = e.offsetX;
        $scope.crosshair.y = e.offsetY;
      }
    };
    function animate () {
      var ctx = $scope.ctx;
      ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
      $scope.cannon.draw(ctx);
      $scope.bucket.draw(ctx);
      if ($scope.crosshair) {
        $scope.crosshair.draw(ctx);
      }
      if ($scope.ball !== undefined) {
        var hit = $scope.bucket.isBallInBucket($scope.ball);
        if (hit) {
          console.log('success');
          $window.cancelAnimationFrame($scope.animFrame);
          $scope.animFrame = undefined;
          return;
        }
        $scope.ball.update(0.1);
        if ($scope.ball !== undefined) {
          $scope.ball.draw(ctx);
        }
      }
      $scope.animFrame = $window.requestAnimationFrame(animate);
    }
  });
