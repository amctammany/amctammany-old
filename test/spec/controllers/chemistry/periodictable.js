'use strict';

describe('Controller: PeriodicTableCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var PeriodicTableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeriodicTableCtrl = $controller('PeriodicTableCtrl', {
      $scope: scope
    });
  }));

});
