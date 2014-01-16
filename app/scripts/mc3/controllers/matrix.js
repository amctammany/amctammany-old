'use strict';

angular.module('mctApp')
  .controller('MatrixCtrl', function ($scope, Matrix) {
    $scope.m1 = new Matrix();
    $scope.m2 = new Matrix();
  });
