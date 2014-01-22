'use strict';

angular.module('mctApp')
  .controller('ThreeCtrl', function ($scope) {
    $scope.initDemo = function (div) {
      $scope.renderer = new THREE.WebGLRenderer();
      var width = div.clientWidth;
      var height = div.clientHeight || 500;
      $scope.renderer.setSize(width, height);
      div.appendChild($scope.renderer.domElement);

      $scope.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      $scope.camera.position.z = 500;

      $scope.scene = new THREE.Scene();

      var sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 100, 100), new THREE.MeshNormalMaterial());
      sphere.position.x = 0;
      sphere.overdraw = true;

      $scope.scene.add(sphere);

      $scope.renderer.render($scope.scene, $scope.camera);
    };
  });
