'use strict';

describe('Controller: ThreeCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var ThreeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThreeCtrl = $controller('ThreeCtrl', {
      $scope: scope
    });
  }));
});
