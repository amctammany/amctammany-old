'use strict';

describe('Controller: Mc3GLCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var Mc3GLCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Mc3GLCtrl = $controller('Mc3GLCtrl', {
      $scope: scope
    });
  }));

});
