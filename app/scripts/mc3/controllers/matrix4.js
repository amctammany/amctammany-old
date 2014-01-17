'use strict';

angular.module('mctApp')
  .controller('Matrix4Ctrl', function ($scope, Matrix4) {
    $scope.m1 = new Matrix4(1,2,0,1,2,1,0,3,2,2,0,1,2,2,3,4);
    $scope.m1.textarea = $scope.m1.toString();
    $scope.loadMatrix = function (name) {
      var matrix = $scope[name];
      var elements = [];
      var lines = matrix.textarea.split('\n');
      lines.forEach(function (line) {
        var items = line.split(',');
        items.forEach(function (item) {
          elements.push(parseFloat(item));
        })
      });
      matrix.set.apply(matrix, elements);
      return elements;
    };
    $scope.m2 = new Matrix4();
    $scope.m2.textarea = $scope.m2.toString();

    $scope.m3 = new Matrix4();
    $scope.calculate = function () {
      $scope.m3.multiplyMatrices($scope.m1, $scope.m2);
    }
  });
