'use strict';

angular.module('mctApp')
  .controller('AudioCtrl', function ($scope, $window) {

    $scope.frequency = 440;
    var ctx = new $window.webkitAudioContext();

    var osc = ctx.createOscillator();
    //osc.type = 0;
    osc.frequency.value = $scope.frequency;

    var mod = ctx.createOscillator();
    $scope.mod = mod;
    mod.frequency.value = 8;

    $scope.gain = ctx.createGain();
    $scope.gain.gain.value = 30;

    var finalGain = ctx.createGain();
    finalGain.gain.value = 0;

    mod.connect($scope.gain);
    $scope.gain.connect(osc.frequency);
    osc.connect(finalGain);
    finalGain.connect(ctx.destination);

    osc.start(0);
    mod.start(0);
    //oscillator.noteOn(0);

    $scope.$watch('frequency', function () {
      osc.frequency.value = $scope.frequency;
      $scope.graphDirty = true;
    });

    $scope.audioFormula = function (x) {
      return Math.sin( 8 * Math.sin(x * $scope.frequency));
    };
    $scope.togglePlay = function () {
      if ($scope.active) {
        finalGain.gain.value = 1;
      } else {
        finalGain.gain.value = 0;
      }
    };
  });
