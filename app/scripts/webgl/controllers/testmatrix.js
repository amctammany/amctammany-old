'use strict';

angular.module('mctApp')
  .controller('TestMatrixCtrl', function ($scope, Matrix4, Matrix3) {
    $scope.m1 = new Matrix3(2, 4, 5, 1, 2, 4, 3, 1, 4);
    $scope.m1t = $scope.m1.clone().transpose();
    $scope.m1i = $scope.m1.clone().invert();
    $scope.m2 = mat3.create();
    $scope.m2t = mat3.create();
    $scope.m2i = mat3.create();
    mat3.copy($scope.m2, $scope.m1.elements);
    mat3.transpose($scope.m2t, $scope.m2);
    mat3.invert($scope.m2i, $scope.m2);

  });
