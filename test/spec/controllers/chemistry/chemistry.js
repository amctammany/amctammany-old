'use strict';

describe('Controller: ChemistryCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var ChemistryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChemistryCtrl = $controller('ChemistryCtrl', {
      $scope: scope
    });
  }));

});
