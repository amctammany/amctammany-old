'use strict';

angular.module('mctApp')
  .controller('EditPostCtrl', function ($scope, $location, $routeParams, Post) {
    $scope.post = Post.get({name: $routeParams.name});
    var converter = new Showdown.converter();
    $scope.$watch('post.content', function () {
      if (!$scope.post.content) {return;}
      $scope.preview = converter.makeHtml($scope.post.content);
    });

    $scope.savePost = function () {
      $scope.post.$save();
      $location.path('/posts');
    };
  });
