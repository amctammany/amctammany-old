'use strict';

describe('Controller: CubeCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var CubeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CubeCtrl = $controller('CubeCtrl', {
      $scope: scope
    });
  }));

});
