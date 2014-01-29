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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
