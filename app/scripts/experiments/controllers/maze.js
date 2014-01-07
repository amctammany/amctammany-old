'use strict';

angular.module('mctApp')
  .controller('MazeCtrl', function ($scope, Maze, MazeStore) {
    $scope.rows = 10;
    $scope.columns = 10;

    $scope.mazes = MazeStore.query();
    $scope.init = function () {

      var canvas = angular.element(document.getElementById('maze-canvas'))[0];

      canvas.width = 700;
      canvas.height = 700;

      $scope.maze = new Maze(canvas, $scope.columns, $scope.rows);
      $scope.canvas = canvas;
    };

    $scope.initDemo = function (canvas) {
      $scope.maze = $scope.maze || new Maze(canvas, $scope.columns, $scope.rows);
    };
    $scope.deleteMaze = function (maze) {
      var confirm = window.confirm('Delete maze: ' + maze.name);
      if (!confirm) {return;}
      maze.$delete();
      $scope.mazes = MazeStore.query();
      return false;
    };

    $scope.activeMaze = function (maze) {
      if (maze === $scope.mazeStore) {return 'active';}
      else {return '';}
    };
    $scope.saveMaze = function () {
      var config = $scope.maze.generateConfig();
      if (!config) {return;}
      if ($scope.mazeStore) {
        $scope.mazeStore.config = config;
        $scope.mazeStore.$save();
      } else {
        var maze = new MazeStore({name: $scope.name, config: config});
        maze.$save();
      }
      $scope.mazes = MazeStore.query();
    };

    $scope.loadMaze = function (maze) {
      $scope.mazeStore = maze;
      $scope.name = maze.name;
      var config = JSON.parse(maze.config);
      $scope.maze.load(config);
      $scope.columns = $scope.maze.columns;
      $scope.rows = $scope.maze.rows;
    };

    $scope.solve = function () {
      $scope.maze.solve();
    };

    $scope.stop = function () {
      $scope.maze.stop();
    };



    $scope.handleMouseDown = function (e) {
      var cellWidth = $scope.maze.cellWidth;
      var cellHeight = $scope.maze.cellHeight;
      var column = Math.floor((e.offsetX - 1)/ cellWidth);
      var row = Math.floor((e.offsetY - 1) / cellHeight);
      var cell = $scope.maze.findCell(column, row);
      if ($scope.maze.startSelection) {
        $scope.maze.startSelection = false;
        return;
      }
      if ($scope.maze.endSelection) {
        $scope.maze.endSelection = false;
        return;
      }
      //cell.bottom = true;
      //$scope.cells[x][y+1].top = true;
      var dl = e.offsetX - (cell.column * cellWidth);
      var dr = (cell.column + 1) * cellWidth - e.offsetX;
      var dt = e.offsetY - (cell.row * cellHeight);
      var db = (cell.row + 1) * cellHeight - e.offsetY;
      var deltas = {
        left: dl,
        right: dr,
        top: dt,
        bottom: db
      };
      var side = $scope.findLowestDelta(deltas);
      cell.removeWall(side);
      $scope.maze.draw();
    };
    $scope.handleMouseMove = function (e) {
      var cellWidth = $scope.maze.cellWidth;
      var cellHeight = $scope.maze.cellHeight;
      var column = Math.floor(e.offsetX / cellWidth);
      var row = Math.floor(e.offsetY / cellHeight);
      var cell = $scope.maze.findCell(column, row);

      if ($scope.maze.startSelection) {
        $scope.maze.start = cell;
      }
      if ($scope.maze.endSelection) {
        $scope.maze.end = cell;
      }

      $scope.maze.draw();

    };

    $scope.addStart = function () {
      $scope.maze.startSelection = true;
    };

    $scope.addEnd = function () {
      $scope.maze.endSelection = true;
    };
    $scope.findLowestDelta = function (deltas) {
      var lowest = Object.keys(deltas).reduce(function (previous, key) {
        var d = deltas[key];
        if (d < deltas[previous]) {
          return key;
        }
        return previous;
      });
      return lowest;
    };

  });

