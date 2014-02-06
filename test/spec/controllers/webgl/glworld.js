'use strict';

describe('Controller: GLWorldCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var GLWorldCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GLWorldCtrl = $controller('GLWorldCtrl', {
      $scope: scope
    });
  }));

});
