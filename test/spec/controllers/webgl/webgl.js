'use strict';

describe('Controller: WebGLCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var WebGLCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebGLCtrl = $controller('WebGLCtrl', {
      $scope: scope
    });
  }));

});
