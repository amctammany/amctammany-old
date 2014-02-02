'use strict';

describe('Controller: GrapherCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var GrapherCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GrapherCtrl = $controller('GrapherCtrl', {
      $scope: scope
    });
  }));

});
