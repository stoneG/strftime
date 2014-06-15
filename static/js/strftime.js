/* global angular */

var strftimeApp = angular.module('strftimeApp', []);

strftimeApp.controller('StrftimeController', ['$scope', function($scope) {
  //$scope.strftime = 'It is %s:%s%s on %s, %s %s%s.';
  $scope.output = 'It is 7:00PM on Saturday, June 14th.';
  $scope.num = 0;

  $scope.getDefaultStrftime = function() {
    return 'It is %s:%s%s on %s, %s %s%s.';
  };

  $scope.calculate = function() {
    if (!$scope.strftime) {
      $scope.output = $scope.getDefaultStrftime();
    } else {
      $scope.output = $scope.strftime;
    }
  };
}]);
