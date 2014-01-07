'use strict';

describe('Controller: MazeCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var MazeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MazeCtrl = $controller('MazeCtrl', {
      $scope: scope
    });
  }));
});
