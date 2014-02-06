'use strict';

describe('Controller: TestMatrixCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var TestMatrixCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestMatrixCtrl = $controller('TestMatrixCtrl', {
      $scope: scope
    });
  }));

});
