'use strict';

angular.module('mctApp')
  .controller('PeriodicTableCtrl', function ($scope) {
    $scope.elements = [
      {z: 1, element: 'H', electronConfig: '(1s1)'},
      {z: 2, element: 'He', electronConfig: '(1s2)'},
      {z: 3, element: 'Li', electronConfig: '(1s2)(2s1)'},
      {z: 4, element: 'Be', electronConfig: '(1s2)(2s2)'},
      {z: 5, element: 'B', electronConfig: '(1s2)(2s2)(2p1)'},
      {z: 6, element: 'C', electronConfig: '(1s2)(2s2)(2p2)'},
      {z: 7, element: 'N', electronConfig: '(1s2)(2s2)(2p3)'},
      {z: 8, element: 'O', electronConfig: '(1s2)(2s2)(2p4)'},
      {z: 9, element: 'F', electronConfig: '(1s2)(2s2)(2p5)'},
      {z: 10, element: 'Ne', electronConfig: '(1s2)(2s2)(2p6)'},

    ];
  });
