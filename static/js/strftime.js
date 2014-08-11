/* global angular */

var strftimeApp = angular.module('strftimeApp', []);

strftimeApp.controller('StrftimeController', ['$scope', function($scope) {
  // $scope.strftime = 'It is %I:%M%p on %A, %B %dth.';
  $scope.output = 'It is 7:00PM on Saturday, June 14th.';
  $scope.num = 0;

  $scope.defaultStrftime = function() {
    return $scope.convert('It is %I:%M%p on %A, %B %dth.');
  };

  /**
   * Grabs the specified datetime component.
   * @returns {String} representation of datetime component.
   */
  $scope.grab = function (type) {
    var datetime = arguments.length === 2? arguments[1] : new Date(),
      addPadding = function(str, len) {
        while (str.length < len) { str = '0' + str; }
        return str;
      },
      weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday','Saturday'],
      months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
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
        'monthShortLower': function() {
          return this.monthShort().toLowerCase();
        },
        'month': function() {
          return months[datetime.getMonth()];
        },
        'monthNum': function() {
          return (datetime.getMonth() + 1).toString();
        },
        'monthNumPadded': function() {
          return addPadding(this.monthNum(), 2);
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
        'hour12': function() {
          var hour24 = datetime.getHours(),
            hour12 = hour24 > 11? hour24 - 12 : hour24;
          return hour12.toString();
        },
        'hour24': function() {
          return datetime.getHours().toString();
        },
        'hour24Padded': function() {
          return addPadding(this.hour24(), 2);
        },
        'hour12Padded': function() {
          return addPadding(this.hour12(), 2);
        },
        'meridian': function() {
          return datetime.getHours() < 12? 'AM' : 'PM';
        },
        'meridianPeriod': function() {
          return datetime.getHours() < 12? 'a.m.' : 'p.m.';
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
          var yearStart = new Date(datetime.getFullYear(), 0, 0),
            week = 1000 * 60 * 60 * 24 * 7;
          return addPadding(Math.floor((datetime - yearStart)/week).toString(), 2);
        },
        'weekOfTheYearNum': function() {
          var yearStart = new Date(datetime.getFullYear(), 0, 0),
            week = 1000 * 60 * 60 * 24 * 7;
          return Math.floor((datetime - yearStart)/week).toString();
        },
        'timeDjango': function() {
          var minutes = this.minutePadded();
          minutes = minutes == '00'? '' : ':' + minutes;
          return this.hour12() + minutes;
        }
      };
    return getFunc[type]();
  };

  $scope.strftimes = {
    django: {
      prefix: '',
      tokens: ['a', 'A', 'b', 'd', 'D',/* 'e', 'E',*/ 'f', 'F', 'g', 'G',
        'h', 'H', 'i', 'I', 'j', 'l', /*'L', */'m', 'M', 'n', 'N',/* 'o',*/
        'O',/* 'P', 'r',*/ 's', 'S', 't', 'T', 'u',/* 'U',*/ 'w', 'W',
        'y', 'Y', 'z',/* 'Z' */],
      grabInputs: [],
      mapping: {
        a: 'tba',
        A: 'tba',
        b: 'tba',
        d: 'tba',
        D: 'tba',
        // e: 'tba',
        // E: 'tba',
        // f: 'tba',
        F: 'tba',
        g: 'tba',
        G: 'tba',
        h: 'tba',
        H: 'tba',
        i: 'tba',
        // I: 'tba',
        j: 'tba',
        l: 'tba',
        // L: 'tba',
        m: 'tba',
        M: 'tba',
        n: 'tba',
        // N: 'tba',
        // o: 'tba',
        // TODO O: 'tba',
        // P: 'tba',
        // r: 'tba',
        s: 'tba',
        // TODO S: 'tba',
        // TODO t: 'tba',
        // TODO T: 'tba',
        u: 'tba',
        // U: 'tba',
        w: 'tba',
        W: 'tba',
        y: 'tba',
        Y: 'tba',
        z: 'tba',
        // Z: 'tba',
      }
    },
    python: {
      prefix: '%',
      tokens: ['a', 'A', 'w', 'd', 'b', 'B', 'm', 'y', 'Y', 'H', 'I', 'p',
        'M', 'S', 'f', 'j', 'U', 'W'],
      grabInputs: ['weekdayShort', 'weekday', 'weekdayNum', 'dayPadded',
        'monthShort', 'month', 'monthNumPadded', 'yearShort', 'year',
        'hour24Padded', 'hour12Padded', 'meridian', 'minutePadded',
        'secondPadded', 'microSecondPadded', 'dayOfTheYearPadded',
        'weekOfTheYearNumPadded', 'weekOfTheYearNum'],
      mapping: {
        'a': 'weekdayShort',
        'A': 'weekday',
        'w': 'weekdayNum',
        'd': 'dayPadded',
        'b': 'monthShort',
        'B': 'month',
        'm': 'monthNumPadded',
        'y': 'yearShort',
        'Y': 'year',
        'H': 'hour24Padded',
        'I': 'hour12Padded',
        'p': 'meridian',
        'M': 'minutePadded',
        'S': 'secondPadded',
        'f': 'microSecondPadded',
        'j': 'dayOfTheYearPadded',
        'U': 'weekOfTheYearNumPadded',
        'W': 'weekOfTheYearNum',
      }
    }
  };

  // Init to python for now
  $scope.strftime = $scope.strftimes.python;

  /**
   * Converts strftime (%d, %t, etc...) tokens to datetime components.
   * @returns {String} of datetime component.
   */
  $scope.convertToken = function(input) {
    var datetime = arguments.length === 2? arguments[1] : new Date(),
      strftime = {
        '%a': 'weekdayShort',
        '%A': 'weekday',
        '%w': 'weekdayNum',
        '%d': 'dayPadded',
        '%b': 'monthShort',
        '%B': 'month',
        '%m': 'monthNumPadded',
        '%y': 'yearShort',
        '%Y': 'year',
        //'day': '25',
        '%H': 'hour24Padded',
        '%I': 'hour12Padded',
        '%p': 'meridian',
        '%M': 'minutePadded',
        '%S': 'secondPadded',
        '%f': 'microSecondPadded',
        '%j': 'dayOfTheYearPadded',
        '%U': 'weekOfTheYearNumPadded',
        '%W': 'weekOfTheYearNum',
      };
    return $scope.grab(strftime[input], datetime);
  };

  $scope.convert = function(input) {
    var re = '(^|[^\%])(\%[' + $scope.strftime.tokens.join('') + '])',
      match,
      replacer;

    re = new RegExp(re, 'g');
    replacer = function(match, p1, p2) {
      return p1 + $scope.convertToken(p2);
    };
    while (match = re.exec(input)) {
      input = input.replace(re, replacer);
    }
    return input;
  };

  $scope.calculate = function() {
    // $scope.output default
    if ($scope.input) {
      $scope.output = $scope.convert($scope.input);
    } else {
      $scope.output = $scope.defaultStrftime();
    }
  };

}]);
