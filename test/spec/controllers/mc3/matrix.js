'use strict';

describe('Controller: Matrix4Ctrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var Matrix4Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Matrix4Ctrl = $controller('Matrix4Ctrl', {
      $scope: scope
    });
  }));

});
