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
    var datetime = arguments.length === 2? arguments[1] : new Date(),
      addPadding = function(str, len) {
        while (str.length < len) {
          str = '0' + str;
        }
        return str;
      },
      getFunc = {
        'weekdayShort': function() {
        },
        'weekday': function() {
        },
        'weekdayNum': function() {
          return datetime.getDay().toString();
        },
        'dayPadded': function() {
          return addPadding(datetime.getDate().toString(), 2);
        },
        'monthShort': function() {
        },
        'month': function() {
        },
        'monthNumPadded': function() {
          return addPadding((datetime.getMonth() + 1).toString(), 2);
        },
        'yearShort': function() {
          return datetime.getFullYear().toString().slice(-2);
        },
        'year': function() {
          return datetime.getFullYear().toString();
        },
        'day': function() {
          return datetime.getDate().toString();
        },
        'hour24Padded': function() {
          return addPadding(datetime.getHours().toString(), 2);
        },
        'hour12Padded': function() {
          return addPadding(datetime.getHours().toString(), 2);
        },
        'meridian': function() {
          return datetime.getHours() < 12? 'AM' : 'PM';
        },
        'minutePadded': function() {
          return addPadding(datetime.getMinutes().toString(), 2);
        },
        'secondPadded': function() {
          return addPadding(datetime.getSeconds().toString(), 2);
        },
        'microSecondPadded': function() {
        },
        'dayOfTheYearPadded': function() {
        },
        'weekOfTheYearNumPadded': function() {
        },
        'weekOfTheYearNum': function() {
        },
      };
    return getFunc[type]();
  };

  $scope.calculate = function() {
    // $scope.output default
    $scope.output = !$scope.strftime? $scope.defaultStrftime() : $scope.strftime;
  };

}]);
