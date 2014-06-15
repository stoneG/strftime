'use strict';

var strftimeApp = angular.module('strftimeApp', []);


strftimeApp.controller('StrftimeController', ['$scope', function($scope) {
  $scope.num = 0;
  $scope.addOne = function() {
    $scope.num++;
  };
}]);
