'use strict';

angular.module('mctApp')
  .controller('TestMatrixCtrl', function ($scope, Matrix4) {
    $scope.m1 = new Matrix4();
    $scope.m2 = mat4.create();
    $scope.m1.makePerspective(45, 1, 0.1, 100);
    $scope.m2 = mat4.perspective($scope.m2, 45, 1, 0.1, 100);
  });
