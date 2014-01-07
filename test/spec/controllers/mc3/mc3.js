'use strict';

describe('Controller: Mc3Ctrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var Mc3Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Mc3Ctrl = $controller('Mc3Ctrl', {
      $scope: scope
    });
  }));

});
