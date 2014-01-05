'use strict';

angular.module('mctApp')
  .controller('PostsCtrl', function ($scope, Post, Tag) {
    $scope.query = '';
    $scope.selectedTags = [];
    $scope.init = function () {
      $scope.getTags();
      $scope.getPosts();
    };
    $scope.getTagClass = function (tag) {
      var status = $scope.selectedTags.indexOf(tag) >= 0 ? 'active' : '';
      return status;
    };
    $scope.toggleTag = function (tag) {
      var index = $scope.selectedTags.indexOf(tag);
      if (index >= 0) {
        $scope.selectedTags.splice(index, 1);
      } else {
        $scope.selectedTags.push(tag);
      }
      console.log($scope.selectedTags);
    };

    $scope.getTags = function () {
      $scope.tags = Tag.query();
    };
    $scope.getPosts = function () {
      $scope.posts = Post.query();
    };
    var converter = new Showdown.converter();
    $scope.parseContent = function (text) {
      return converter.makeHtml(text);
    };
  });
