'use strict';

angular.module('mctApp')
  .controller('ShowPostCtrl', function ($scope, Post, $location, $routeParams) {
    $scope.post = Post.get({name: $routeParams.name});
    var converter = new Showdown.converter();
    $scope.$watch('post.content', function () {
      if (!$scope.post.content) {return;}
      $scope.content = converter.makeHtml($scope.post.content);
    });

    $scope.editPost = function () {
      $location.path('/posts/' + $scope.post.urlString + '/edit');
    };
    $scope.deletePost = function () {
      $scope.post.$delete();
      $location.path('/posts');
    };
  });
