'use strict';

describe('Controller: SketcherCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var SketcherCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SketcherCtrl = $controller('SketcherCtrl', {
      $scope: scope
    });
  }));

});
