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
      .when('/mc3/matrix4', {
        templateUrl: 'views/mc3/matrix4.html',
        controller: 'Matrix4Ctrl'
      })
      .when('/mc3/world', {
        templateUrl: 'views/mc3/world.html',
        controller: 'WorldCtrl'
      })
      .when('/chemistry/sketcher', {
        templateUrl: 'views/chemistry/sketcher.html',
        controller: 'SketcherCtrl'
      })
      .when('/chemistry/sketcher/:name', {
        templateUrl: 'views/chemistry/sketcher.html',
        controller: 'SketcherCtrl'
      })
      .when('/chemistry/renderer', {
        templateUrl: 'views/chemistry/renderer.html',
        controller: 'RendererCtrl'
      })
      .when('/chemistry/renderer/:name', {
        templateUrl: 'views/chemistry/renderer.html',
        controller: 'RendererCtrl'
      })

      .when('/webgl', {
        templateUrl: 'views/webgl/webgl.html',
        controller: 'WebGLCtrl'
      })
      .when('/webgl/world', {
        templateUrl: 'views/webgl/glworld.html',
        controller: 'GLWorldCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
