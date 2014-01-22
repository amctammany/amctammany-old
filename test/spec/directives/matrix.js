'use strict';

describe('Directive: matrix', function () {

  // load the directive's module
  beforeEach(module('mctApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.initDemo = function (canvas) {
      console.log('you win');
    };
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<matrix></matrix>');
    element = $compile(element)(scope);

  }));
});
