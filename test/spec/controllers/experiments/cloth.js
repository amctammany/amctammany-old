'use strict';

describe('Controller: ClothCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var ClothCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClothCtrl = $controller('ClothCtrl', {
      $scope: scope
    });
  }));
});
