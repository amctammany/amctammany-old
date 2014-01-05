'use strict';

describe('Controller: PostsCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var PostsCtrl,
    Post,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Post = {query: function () {return [{title: 'hi', content: 'foo'}, {title: 'foo', content: 'bar'}]}};
    PostsCtrl = $controller('PostsCtrl', {
      $scope: scope,
      Post: Post
    });
  }));

  it('should query list of posts', function () {
    scope.getPosts();
    expect(scope.posts.length).toBe(2);
  });
});
