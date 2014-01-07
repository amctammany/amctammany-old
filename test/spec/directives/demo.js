'use strict';

describe('Directive: demo', function () {

  // load the directive's module
  beforeEach(module('mctApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.initDemo = function (canvas) {

    };
  }));

});
