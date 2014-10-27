/* global angular, describe, it, beforeEach, expect */

describe('StrftimeController', function(){
    var $scope, testInputs = [], testOutputs = [];

    beforeEach(function() {
      testInputs.push(new Date(Date.parse('Wed, 25 Dec 2013 17:15:30')));
      testOutputs.push({
        'weekdayShort': 'Wed',
        'weekday': 'Wednesday',
        'weekdayNum': '3',
        'day': '25',
        'dayPadded': '25',
        'monthShort': 'Dec',
        'monthShortLower': 'dec',
        'month': 'December',
        'monthNum': '12',
        'monthNumPadded': '12',
        'yearShort': '13',
        'year': '2013',
        'hour24': '17',
        'hour12': '5',
        'hour24Padded': '17',
        'hour12Padded': '05',
        'meridian': 'PM',
        'meridianPeriod': 'p.m.',
        'minutePadded': '15',
        'secondPadded': '30',
        'microSecond': '0',
        'microSecondPadded': '000000',
        'dayOfTheYear': '359',
        'dayOfTheYearPadded': '359',
        'weekOfTheYearNumPadded': '51',
        'weekOfTheYearNum': '51',
        'timeDjango': '5:15',
      });
      testInputs.push(new Date(Date.parse('Mon, 2 Jan 2012 5:45:19:000001')));
      testOutputs.push({
        'weekdayShort': 'Mon',
        'weekday': 'Monday',
        'weekdayNum': '1',
        'day': '2',
        'dayPadded': '02',
        'monthShort': 'Jan',
        'monthShortLower': 'jan',
        'month': 'January',
        'monthNum': '1',
        'monthNumPadded': '01',
        'yearShort': '12',
        'year': '2012',
        'hour24': '5',
        'hour12': '5',
        'hour24Padded': '05',
        'hour12Padded': '05',
        'meridian': 'AM',
        'meridianPeriod': 'a.m.',
        'minutePadded': '05',
        'secondPadded': '01',
        'microSecond': '1',
        'microSecondPadded': '000001',
        'dayOfTheYear': '2',
        'dayOfTheYearPadded': '002',
        'weekOfTheYearNumPadded': '01',
        'weekOfTheYearNum': '1',
        'timeDjango': '5:05',
      });

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

    it('should be able to grab any component from a Date object', function() {
      for (var i = 0; i < testOutputs.length; i++) {
        for (var key in testOutputs[i]) {
          if (testOutputs.hasOwnProperty(key)) {
            expect($scope.grab(input, testInputs[index])).toBe(output);
          }
        }
      }
    });

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

    it('should convert strftime strings to normal strings', function() {
      var year = (new Date()).getFullYear().toString(),
        input;

      if ($scope.strftime.prefix) {
        input = '%%Y';
        output = '%%Y';
        expect($scope.convert(input)).toBe(output);

        input = '%Y';
        output = year;
        expect($scope.convert(input)).toBe(output);

        input = '%Y%Y%Y%Y';
        output = year + year + year + year;
        expect($scope.convert(input)).toBe(output);

        input = ' %Y';
        output = ' ' + year;
        expect($scope.convert(input)).toBe(output);

        input = 'is it %Y or %Y?';
        output = 'is it ' + year + ' or ' + year + '?';
        expect($scope.convert(input)).toBe(output);
      }
    });
});
