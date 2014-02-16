'use strict';

angular.module('mctApp')
  .directive('toggle', function () {
    return {
      replace: true,
      template: '<button class="btn btn-success" ng-click="toggle()">{{text}}</button>',
      restrict: 'E',
      link: function postLink(scope, elm, attrs) {
        scope.active = false;
        scope.text = attrs.off;
        scope.toggle = function () {
          if (scope.active) {
            elm.removeClass('btn-danger');
            elm.addClass('btn-success');
            scope.text = attrs.off;
            scope.active = false;
          } else {
            elm.removeClass('btn-success');
            elm.addClass('btn-danger');
            scope.text = attrs.on;
            scope.active = true;
          }
          scope[attrs.action]();
        };
      }
    };
  });

