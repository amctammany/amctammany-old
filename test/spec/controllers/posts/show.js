'use strict';

describe('Controller: ShowPostCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var ShowPostCtrl,
    Post,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Post = {
      get: function () {
        var result = {name: 'foo'};
        return result;
      }
    };

    ShowPostCtrl = $controller('ShowPostCtrl', {
      $scope: scope,
      Post: Post
    });
  }));
  it('should have title', function () {
    expect(scope.post.name).toBe('foo');
  });

});
