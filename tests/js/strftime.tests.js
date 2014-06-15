/* global angular, describe, it, beforeEach, expect */

describe('StrftimeController', function(){
    var $scope, datetime, results;

    beforeEach(function() {
      datetime = new Date(Date.parse('Wed, 25 Dec 2013 17:15:30'));
      angular.mock.module('strftimeApp');
      angular.mock.inject(function($rootScope, $controller){
        $scope = $rootScope.$new();
        $controller('StrftimeController', {$scope: $scope});
      });
    });

    it('should calculate default strftime', function() {
      $scope.calculate();
      expect($scope.output).toBe($scope.defaultStrftime());
    });

    // test $scope.grab
    results = {
      'weekdayShort': 'Wed',
      'weekday': 'Wednesday',
      'weekdayNum': '3',
      'dayPadded': '25',
      'monthShort': 'Dec',
      'month': 'December',
      'monthNumPadded': '12',
      'yearShort': '13',
      'year': '2013',
      'day': '25',
      'hour24Padded': '17',
      'hour12Padded': '05',
      'meridian': 'PM',
      'minutePadded': '15',
      'secondPadded': '30',
      'microSecondPadded': '000000',
      'dayOfTheYearPadded': '359',
      'weekOfTheYearNumPadded': '51',
      'weekOfTheYearNum': '51',
    };
    function grabTests(input, output) {
      it('should be able to grab ' + input + ' of a Date object', function() {
        expect($scope.grab(input, datetime)).toBe(output);
      });
    }
    for (var key in results) {
      if (results.hasOwnProperty(key)) {
        grabTests(key, results[key]);
      }
    }

    /*it('should parse strftime units', function() {
      var io = {
        '%Y': '1970'
      };
      $scope.dateTime = Date.parse('Thu, 01 Jan 1970 00:00:00 GMT');
      for (var key in io) {
        if (io.hasOwnProperty(key)) {
          expect($scope.convert(key), io[key]);
        }
      }
    });*/
});
