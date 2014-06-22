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
      weekdays = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
      },
      months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      },
      getFunc = {
        'weekdayShort': function() {
          return weekdays[datetime.getDay()].slice(0, 3);
        },
        'weekday': function() {
          return weekdays[datetime.getDay()];
        },
        'weekdayNum': function() {
          return datetime.getDay().toString();
        },
        'dayPadded': function() {
          return addPadding(datetime.getDate().toString(), 2);
        },
        'monthShort': function() {
          return months[datetime.getMonth()].slice(0, 3);
        },
        'month': function() {
          return months[datetime.getMonth()];
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
          var hour24 = datetime.getHours(),
            hour12 = hour24 > 11? hour24 - 12 : hour24;
          return addPadding(hour12.toString(), 2);
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
          return addPadding(datetime.getMilliseconds().toString(), 6);
        },
        'dayOfTheYearPadded': function() {
          var yearStart = new Date(datetime.getFullYear(), 0, 0),
            day = 1000 * 60 * 60 * 24;
          return Math.floor((datetime - yearStart)/day).toString();
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
