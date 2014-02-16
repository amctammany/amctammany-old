'use strict';

angular.module('mctApp')
  .controller('AudioCtrl', function ($scope, $window) {

    $scope.frequency = 440;
    var ctx = new $window.webkitAudioContext();

    var oscillator = ctx.createOscillator();
    oscillator.type = 0;
    oscillator.frequency.value = $scope.frequency;

    var gain = ctx.createGain();
    gain.gain.value = 0;

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(0);
    //oscillator.noteOn(0);

    $scope.$watch('frequency', function () {
      oscillator.frequency.value = $scope.frequency;
      $scope.graphDirty = true;
    });

    $scope.audioFormula = function (x) {
      return Math.sin(x * $scope.frequency);
    };
    $scope.togglePlay = function () {
      if ($scope.active) {
        gain.gain.value = 1;
      } else {
        gain.gain.value = 0;
      }
    };
  });
