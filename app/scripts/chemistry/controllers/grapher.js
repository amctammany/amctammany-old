'use strict';

angular.module('mctApp')
  .controller('GrapherCtrl', function ($scope) {
    $scope.formula1 = function (x) {
      return Math.sin(x);
    };
  });
