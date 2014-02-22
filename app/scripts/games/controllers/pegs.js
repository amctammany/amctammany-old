'use strict';

angular.module('mctApp')
  .controller('PegsCtrl', function ($scope, $window, Particle, GameWorld) {

    var dx, dy;
    $scope.world = new GameWorld();
    $scope.pegs = [];
    $scope.balls = [];

    var Ball = function (x, y) {
      this.particle = new Particle($scope.world, x, y, 0, 1);
      this.x = x;
      this.y = y;
      this.radius = 4;
      this.width = this.radius;
      this.height = this.radius;
      this.visible = true;
    };
    Ball.prototype.update = function (delta) {
      if (this.checkBounds()) {
        this.visible = false;
        return false;
      }
      this.particle.accelerate(0, 5, 0);
      this.particle.integrate(delta, 0.0000);
    };
    Ball.prototype.draw = function (ctx) {
      if (!this.visible) { return; }
      ctx.beginPath();
      ctx.arc(this.particle.current.x, this.particle.current.y, this.radius, 0, 6.28, 0);
      ctx.closePath();
      ctx.fill();
    };
    Ball.prototype.reset = function () {
      $scope.world.removeObject(this);
      this.particle = undefined;
    };
    Ball.prototype.checkBounds = function () {
      if (this.particle.current.x < 0 || this.particle.current.x > $scope.canvas.width || this.particle.current.y > $scope.canvas.height) { // || this.particle.current.y > $scope.canvas.height) { return true;
        this.reset();
        return true;
      }
      else {
        return false;
      }
    };
    var Peg = function (x, y) {
      this.x = x;
      this.y = y;
      this.particle = new Particle($scope.world, x, y, 0, 0);
    };

    Peg.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, 6.28, 0);
      ctx.closePath();
      ctx.stroke();
    };

    $scope.addBall = function () {
      var ball = new Ball($scope.canvas.width / 2, 0);
      $scope.world.addObject(ball);
    };
    $scope.initDemo = function (canvas) {
      $scope.canvas = canvas;
      dx = canvas.width / 20;
      dy = canvas.height / 20;
      $scope.ctx = canvas.getContext('2d');
      $scope.ctx.clearRect(0, 0, canvas.width, canvas.height);
      var p = new Peg(canvas.width / 2,  2 * canvas.height / 8);
      $scope.world.addObject(p);
      var p1 = new Peg(canvas.width / 2 - 30, 4 * canvas.height / 8 + 20);
      $scope.world.addObject(p1);
      var p2 = new Peg(canvas.width / 2 + 30, 4 * canvas.height / 8 + 20);
      $scope.world.addObject(p2);
      $scope.animFrame = $window.requestAnimationFrame(animate);
    };

    function animate () {
      $scope.world.start();
      $scope.ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
      $scope.world.update(0.1);
      $scope.world.draw($scope.ctx);
      //$scope.pegs.forEach(function (peg) {
        //peg.draw($scope.ctx);
      //});
      //$scope.balls.forEach(function (ball) {
        //ball.update(0.1);
        //ball.draw($scope.ctx);
      //});
      $window.requestAnimationFrame(animate);
    }
  });
