'use strict';

describe('Controller: SpheresCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var SpheresCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpheresCtrl = $controller('SpheresCtrl', {
      $scope: scope
    });
  }));

});
