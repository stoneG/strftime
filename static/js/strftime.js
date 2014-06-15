/* global angular */

var strftimeApp = angular.module('strftimeApp', []);

strftimeApp.controller('StrftimeController', ['$scope', function($scope) {
  //$scope.strftime = 'It is %s:%s%s on %s, %s %s%s.';
  $scope.output = 'It is 7:00PM on Saturday, June 14th.';
  $scope.num = 0;

  $scope.defaultStrftime = function() {
    return 'It is %s:%s%s on %s, %s %s%s.';
  };

  $scope.grab = function (type) {
    var datetime = arguments.length === 2? arguments[1] : new Date();
    if (type === 'year') {
      return datetime.getFullYear().toString();
    }
  };

  $scope.calculate = function() {
    // $scope.output default
    $scope.output = !$scope.strftime? $scope.defaultStrftime() : $scope.strftime;
  };

}]);
