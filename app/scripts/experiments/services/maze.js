'use strict';

angular.module('mctApp')
  .factory('Maze', function () {

    var BranchPoint = function (path, cell) {
      this.path = path;
      this.cell = cell;
      this.cell.isBranchPoint = true;
      this.branches = [];
    };

    BranchPoint.prototype.getChoices = function () {
      var history = this.path.history;
      return this.branches.filter(function (branch) {
        return history.indexOf(branch) < 0;
      });
    };

    var Path = function (maze, start) {
      this.maze = maze;
      this.start = start;
      this.history = [];
      this.branchPoints = [];
      this.cell = start;
      var choice = this.choosePath();
      this.travelTo(choice);
    };

    Path.prototype.choosePath = function () {
      var choices = [];
      var next;
      if (this.cell.left) {
        next = this.maze.findCell(this.cell.column - 1, this.cell.row);
        if (this.history.indexOf(next) < 0) {
          choices.push(next);
        }
      }
      if (this.cell.right) {
        next = this.maze.findCell(this.cell.column + 1, this.cell.row);
        if (this.history.indexOf(next) < 0) {
          choices.push(next);
        }
      }
      if (this.cell.top) {
        next = this.maze.findCell(this.cell.column, this.cell.row - 1);
        if (this.history.indexOf(next) < 0) {
          choices.push(next);
        }
      }
      if (this.cell.bottom) {
        next = this.maze.findCell(this.cell.column, this.cell.row + 1);
        if (this.history.indexOf(next) < 0) {
          choices.push(next);
        }
      }
      if (choices.length > 1) {
        var branchPoint = new BranchPoint(this, this.cell);
        branchPoint.branches = choices;
        this.branchPoints.push(branchPoint);

      }
      var choice = choices[Math.floor(Math.random() * choices.length)];
      return choice;
    };
    Path.prototype.travelTo = function (cell) {
      if (!this.maze.solveInProgress) {return;}
      if (cell === this.maze.end) {
        window.alert('Win');
        this.maze.solveInProgress = false;
        return;
      }
      if (!cell) {
        var lastBranch = this.branchPoints[this.branchPoints.length - 1];
        var i = 1;
        while (lastBranch) {
          if (lastBranch.getChoices().length > 0) {

            this.maze.draw();
            this.travelTo(lastBranch.cell);
            return;
          }
          lastBranch = this.branchPoints[this.branchPoints.length - i];
          if (i > this.branchPoints.length) {
            window.alert('No solution found');
            this.maze.solveInProgress = false;
            return false;
          }
          i++;
        }
      }
      this.history.push(this.cell);
      this.cell = cell;
      this.cell.visited = true;
      var self = this;
      this.maze.draw();
      window.setTimeout(function () {
        self.travelTo(self.choosePath());
      }, 100);

    };

// Maze {
    var Maze = function (canvas, columns, rows) {
      this.rows = rows;
      this.columns = columns;

      this.defaultFill = 'lightsteelblue';
      this.startFill = 'lightgreen';
      this.endFill = 'red';
      this.branchPointFill = 'green';
      this.visitedFill = 'white';
      if (canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.height = canvas.height;
        this.width = canvas.width;
      }
      this.reset();
    };

    Maze.prototype.solve = function () {
      if (this.solveInProgress) {return;}
      this.reset();
      this.solveInProgress = true;
      new Path(this, this.start);

    };
    Maze.prototype.stop = function () {
      this.solveInProgress = false;
    };
    Maze.prototype.getIndex = function (column, row) {
      return column + (row * this.columns);
    };
    Maze.prototype.findCell = function (column, row) {
      return this.cells[column + (row * this.columns)];
    };

    Maze.prototype.generateConfig = function () {
      if (!this.end || !this.start) {
        console.log('incomplete maze');
        return;
      }
      this.changed = false;
      var cellData = this.cells.map(function (cell) {
        return {
          row: cell.row,
          column: cell.column,
          left: cell.left,
          right: cell.right,
          top: cell.top,
          bottom: cell.bottom
        };
      });

      var data = {
        rows: this.rows,
        columns: this.columns,
        start: {column: this.start.column, row: this.start.row},
        end: {column: this.end.column, row: this.end.row},
        cells: cellData
      };
      this.loadData = data;
      //var config = JSON.stringify(data);
      return JSON.stringify(data);
    };

    Maze.prototype.load = function (config) {
      this.solveInProgress = false;
      this.loadData = config;
      console.log(config);
      this.columns = config.columns;
      this.rows = config.rows;
      this.cells = new Array(this.rows * this.columns);

      this.cellWidth = this.canvas.width / this.columns;
      this.cellHeight = this.canvas.height / this.rows;
      var self = this;
      var cellCopy;
      config.cells.forEach(function (cell) {
        cellCopy = self.addCell(cell.column, cell.row);
        cellCopy.maze = self;
        cellCopy.top = cell.top;
        cellCopy.bottom = cell.bottom;
        cellCopy.left = cell.left;
        cellCopy.right = cell.right;
        self.cells[self.getIndex(cell.column, cell.row)] = cellCopy;
      });
      this.start = this.findCell(config.start.column, config.start.row);
      this.end = this.findCell(config.end.column, config.end.row);
      this.draw();

    };
    Maze.prototype.reset = function () {
      if (this.changed) {
        window.alert('Reset will destroy new data');
        return false;
      }
      if (this.loadData) {
        this.load(this.loadData);
        return;
      }
      var row, column, cell;
      this.cellWidth = this.canvas.width / this.columns;
      this.cellHeight = this.canvas.height / this.rows;


      this.cells = new Array(this.rows * this.columns);
      console.log(this.columns);
      console.log(this.rows);
      for (row = 0; row < this.rows; row++) {
        for (column = 0; column < this.columns; column++) {
          cell = this.addCell(column, row);
        }
      }
      this.draw();
    };

    Maze.prototype.addCell = function (column, row) {
      var cell = new Cell(column, row);
      cell.maze = this;
      this.cells[this.getIndex(column, row)] = cell;
      //this.cells[index(column, row)] = cell;
      return cell;
    };

    Maze.prototype.draw = function () {
      if (!this.canvas) {return;}
      var ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);
      this.cells.forEach(function (cell) {
        cell.draw(ctx);
      });
    };

// }

// Cell {
    var Cell = function (column, row) {
      this.column = column;
      this.row = row;
      this.fill = 'lightsteelblue';
      this.left = false;
      this.right = false;
      this.top = false;
      this.bottom = false;

    };

  // Remove Wall {
    Cell.prototype.removeWall = function (side) {
      this.maze.changed = true;
      var neighbor;
      var maze = this.maze;
      if (side === 'left') {
        if (this.column - 1 < 0) { return; }
        neighbor = maze.findCell(this.column - 1, this.row);
        if (neighbor) {
          this.left = this.left ? false : true;
          neighbor.right = neighbor.right ? false : true;
        }
      }
      if (side === 'right') {
        if (this.column + 1 >= maze.columns) { return; }
        neighbor = maze.findCell(this.column + 1, this.row);
        if (neighbor) {
          this.right = this.right ? false : true;
          neighbor.left = neighbor.left ? false : true;
        }
      }

      if (side === 'top') {
        if (this.row - 1 < 0) {return;}
        neighbor = maze.findCell(this.column, this.row - 1);
        if (neighbor) {
          this.top = this.top ? false : true;
          neighbor.bottom = neighbor.bottom ? false : true;
        }
      }

      if (side === 'bottom') {
        if (this.row + 1 >= maze.rows) {return;}
        neighbor = maze.findCell(this.column, this.row + 1);
        console.log(neighbor);
        if (neighbor) {
          this.bottom = this.bottom ? false : true;
          neighbor.top = neighbor.top ? false : true;
        }
      }
      console.log(this);


    };
  // }

  // Draw {
    Cell.prototype.draw = function (ctx) {
      ctx.lineWidth = 1;
      var cellWidth = this.maze.cellWidth;
      var cellHeight = this.maze.cellHeight;
      if (this.maze.start === this) {
        ctx.fillStyle = this.maze.startFill;
      } else if (this.maze.end === this) {
        ctx.fillStyle = this.maze.endFill;
      } else if (this.isBranchPoint) {
        ctx.fillStyle = this.maze.branchPointFill;
      } else if (this.visited) {
        ctx.fillStyle = this.maze.visitedFill;
      } else {
        ctx.fillStyle = this.fill;
      }
      ctx.beginPath();
      ctx.fillRect(this.column * cellWidth, this.row * cellHeight, cellWidth, cellHeight);
      ctx.closePath();

      if (!this.left) {
        ctx.strokeStyle = this.leftColor;
        ctx.beginPath();
        ctx.moveTo(this.column * cellWidth, this.row * cellHeight);
        ctx.lineTo(this.column * cellWidth, (this.row + 1) * cellHeight);
        ctx.closePath();
        ctx.stroke();
      }
      if (!this.right) {
        ctx.strokeStyle = this.rightColor;
        ctx.beginPath();
        ctx.moveTo((this.column + 1) * cellWidth, this.row * cellHeight);
        ctx.lineTo((this.column + 1)* cellWidth, (this.row + 1) * cellHeight);
        ctx.closePath();
        ctx.stroke();
      }
      if (!this.top) {
        ctx.strokeStyle = this.topColor;
        ctx.beginPath();
        ctx.moveTo(this.column * cellWidth, this.row * cellHeight);
        ctx.lineTo((this.column + 1) * cellWidth, this.row * cellHeight);
        ctx.closePath();
        ctx.stroke();
      }
      if (!this.bottom) {
        ctx.strokeStyle = this.bottomColor;
        ctx.beginPath();
        ctx.moveTo(this.column * cellWidth, (this.row + 1) * cellHeight);
        ctx.lineTo((this.column + 1) * cellWidth, (this.row + 1) * cellHeight);
        ctx.closePath();
        ctx.stroke();
      }

    };

    // }
// }

    return Maze;


  });

