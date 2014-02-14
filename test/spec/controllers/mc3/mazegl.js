'use strict';

describe('Controller: MazeGLCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var MazeGLCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MazeGLCtrl = $controller('MazeGLCtrl', {
      $scope: scope
    });
  }));

});
