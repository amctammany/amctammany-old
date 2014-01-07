'use strict';

angular.module('mctApp')
  .factory('Cloth', function () {
    var Cloth, Point, Constraint;

    Cloth = function (canvas, options) {
      this.canvas = canvas;
      this.reset(options);
    };
    Cloth.defaults = {
      rows: 15,
      columns: 15,
      springConstant: 10,
    };
    Cloth.prototype.reset = function (options) {
      options = options || Cloth.defaults;
      this.rows = options.rows;
      this.columns = options.columns;
      this.springConstant = options.springConstant;
      this.points = [this.rows * this.columns];
      this.constraints = [];

      this.width = this.canvas.width;
      this.offsetWidth = this.width * 0.8;
      this.dx = this.offsetWidth / this.columns;
      this.offsetX = this.width * 0.1;

      this.height = this.canvas.height;
      this.offsetHeight = this.height * 0.6;
      this.dy = this.offsetHeight / this.rows;
      this.offsetY = this.height * 0.1;

      this.generatePoints();
      this.generateConstraints();
      this.ctx = this.canvas.getContext('2d');
      if (this.ctx) {
        this.draw(this.ctx);
      }
    };

    Cloth.prototype.generatePoints = function () {
      for (var i = 0, columns = this.columns; i < columns; i++) {
        for (var j = 0, rows = this.rows; j < rows; j++) {
          this.addPoint(i, j);
        }
      }
    };
    Cloth.prototype.addPoint = function (column, row) {
      this.points[this.getIndex(column, row)] = new Point(this, column, row);
    };

    Cloth.prototype.generateConstraints = function () {
      var p1, p2;
      var k = this.springConstant;
      for (var i = 0, columns = this.columns; i < columns; i++) {
        for (var j = 0, rows = this.rows; j < rows; j++) {
          if (i > 0) {
            p1 = this.points[this.getIndex(i - 1, j)];
            p2 = this.points[this.getIndex(i, j)];
            this.addConstraint(p1, p2, k);
          }
          if (j > 0) {
            p1 = this.points[this.getIndex(i, j - 1)];
            p2 = this.points[this.getIndex(i, j)];
            this.addConstraint(p1, p2, k);
          }
        }
      }
    };
    Cloth.prototype.addConstraint = function (p1, p2, k) {
      this.constraints.push(new Constraint(p1, p2, k));
    };
    Cloth.prototype.getIndex = function (column, row) {
      return column + (row * this.rows);
    };
    Cloth.prototype.draw = function (ctx) {
      this.constraints.forEach(function (constraint) {
        constraint.draw(ctx);
      });
      this.points.forEach(function (pt) {
        pt.draw(ctx);
      });
    };

    Cloth.prototype.findClosestPoint = function (x, y) {
      var min = 1000;
      var bestPoint = null;
      var dist;
      this.points.forEach(function (pt) {
        dist = Math.sqrt(Math.pow(pt.x - x, 2) + Math.pow(pt.y - y, 2));
        if (dist < min) {
          bestPoint = pt;
          min = dist;
        }
      });
      return bestPoint;
    };

    Point = function (cloth, column, row) {
      this.cloth = cloth;
      this.column = column;
      this.row = row;
      this.fill = 'black';

      this.x = this.column * this.cloth.dx + this.cloth.offsetX;
      this.y = this.row * this.cloth.dy + this.cloth.offsetY;
    };
    Point.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.fill;
      ctx.arc(this.x, this.y, 3, 0, 6.28, 0);
      ctx.closePath();
      ctx.fill();
    };

    Constraint = function (p1, p2, k) {
      this.p1 = p1;
      this.p2 = p2;
      this.k = k;
    };

    Constraint.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.moveTo(this.p1.x, this.p1.y);
      ctx.lineTo(this.p2.x, this.p2.y);
      ctx.closePath();
      ctx.stroke();
    };
    return Cloth;
  });
