'use strict';

angular.module('mctApp')
  .controller('NewPostCtrl', function ($scope, $location, Post) {
    $scope.post = {title: '', tags: null, content: ''};
    $scope.preview = '';

    var converter = new Showdown.converter();

    $scope.$watch('post.content', function () {
      if (!$scope.post.content) {return;}
      $scope.preview = converter.makeHtml($scope.post.content);
    });
    $scope.parseContent = function (text) {
      if (!text) {return;}
      $scope.preview = converter.makeHtml(text);
    };

    $scope.savePost = function () {
      var post = new Post($scope.post);
      post.$save();
      $location.path('/posts');
    };
  });
