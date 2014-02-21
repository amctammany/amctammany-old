'use strict';

describe('Controller: CannonCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var CannonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CannonCtrl = $controller('CannonCtrl', {
      $scope: scope
    });
  }));
});
