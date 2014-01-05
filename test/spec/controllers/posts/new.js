'use strict';

describe('Controller: NewPostCtrl', function () {

  // load the controller's module
  beforeEach(module('mctApp'));

  var NewPostCtrl,
    Post,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Post = {query: function () {return [{title: 'hi', content: 'foo'}]}};
    NewPostCtrl = $controller('NewPostCtrl', {
      $scope: scope,
      Post: Post
    });
  }));
});
