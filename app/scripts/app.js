'use strict';

angular.module('mctApp', ['ngRoute', 'ngSanitize', 'ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/posts', {
        templateUrl: 'views/posts/index.html',
        controller: 'PostsCtrl'
      })
      .when('/posts/new', {
        templateUrl: 'views/posts/new.html',
        controller: 'NewPostCtrl'
      })
      .when('/posts/:name', {
        templateUrl: 'views/posts/show.html',
        controller: 'ShowPostCtrl'
      })
      .when('/posts/:name/edit', {
        templateUrl: 'views/posts/edit.html',
        controller: 'EditPostCtrl'
      })
      .when('/experiments/maze', {
        templateUrl: 'views/experiments/maze.html',
        controller: 'MazeCtrl'
      })
      .when('/experiments/cloth', {
        templateUrl: 'views/experiments/cloth.html',
        controller: 'ClothCtrl'
      })
      .when('/chemistry', {
        templateUrl: 'views/chemistry/chemistry.html',
        controller: 'ChemistryCtrl'
      })
      .when('/chemistry/periodictable', {
        templateUrl: 'views/chemistry/periodictable.html',
        controller: 'PeriodicTableCtrl'
      })
      .when('/mc3', {
        templateUrl: 'views/mc3/mc3.html',
        controller: 'Mc3Ctrl'
      })
      .when('/mc3/matrix', {
        templateUrl: 'views/mc3/matrix.html',
        controller: 'MatrixCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
