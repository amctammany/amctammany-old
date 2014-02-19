'use strict';

describe('Controller: FloorsCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var FloorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FloorsCtrl = $controller('FloorsCtrl', {
      $scope: scope
    });
  }));

});
