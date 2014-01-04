'use strict';

angular.module('mctApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.$location = $location;
    $scope.$watch('$location.path()', function (path) {
      $scope.activeNavId = path || '/';
      return;
    });
    $scope.getClass = function (id) {
      if (!$scope.activeNavId) {return;}
			if ($scope.activeNavId.substring(0, id.length) === id) {
				return 'active';
			} else {
				return '';
			}
    };

  });
