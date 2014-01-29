'use strict';

describe('Controller: RendererCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var RendererCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RendererCtrl = $controller('RendererCtrl', {
      $scope: scope
    });
  }));

});
