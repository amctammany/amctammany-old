'use strict';

describe('Controller: PegsCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var PegsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PegsCtrl = $controller('PegsCtrl', {
      $scope: scope
    });
  }));

});
