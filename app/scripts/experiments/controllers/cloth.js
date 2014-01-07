'use strict';

angular.module('mctApp')
  .controller('ClothCtrl', function ($scope, Cloth) {
    $scope.options = {
      rows: 15,
      columns: 15,
    };
    $scope.initDemo = function (canvas) {
      $scope.cloth = new Cloth(canvas, $scope.options);
    };
    $scope.reset = function () {
      if ($scope.cloth) {$scope.cloth.reset($scope.options);}
    };
    $scope.handleMouseDown = function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      var pt = $scope.cloth.findClosestPoint(x, y);
      pt.fill = 'red';
      pt.draw($scope.cloth.ctx);
      console.log(pt);
    };
    $scope.handleMouseMove = function (e) {
      console.log(e);
    };
    $scope.handleMouseUp = function (e) {
      console.log(e);
    };
  });
