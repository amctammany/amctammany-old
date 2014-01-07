'use strict';

angular.module('mctApp')
  .controller('Mc3Ctrl', function ($scope, Object3d) {

    $scope.object = new Object3d();
    $scope.object.position.x = -10;
    $scope.object.position.y = -10;
    $scope.object.position.z = -10;
  });
