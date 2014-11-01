/* global angular */

var strftimeApp = angular.module('strftimeApp', []);

strftimeApp.controller('StrftimeController', ['$scope', function($scope) {
  // $scope.strftime = 'It is %I:%M%p on %A, %B %dth.';
  $scope.output = 'It is 7:00PM on Saturday, June 14th.';
  $scope.num = 0;

  $scope.defaultStrftime = function() {
    console.log('defaultStrftime');
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
          return datetime.getMilliseconds().toString();
        },
        'microSecondPadded': function() {
          return addPadding(datetime.getMilliseconds().toString(), 6);
        },
        'dayOfTheYear': function() {
          var yearStart = new Date(datetime.getFullYear(), 0, 0),
            day = 1000 * 60 * 60 * 24;
          return Math.floor((datetime - yearStart)/day).toString();
        },
        'dayOfTheYearPadded': function() {
          var yearStart = new Date(datetime.getFullYear(), 0, 0),
            day = 1000 * 60 * 60 * 24;
          return addPadding(Math.floor((datetime - yearStart)/day).toString(), 3);
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
    console.log('grab type', type);
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
        a: 'meridianPeriod',
        A: 'meridian',
        b: 'monthShortLower',
        d: 'dayPadded',
        D: 'weekdayShort',
        // e: 'tba',
        // E: 'tba',
        // f: 'tba',
        F: 'month',
        g: 'hour12',
        G: 'hour24',
        h: 'hour12Padded',
        H: 'hour24Padded',
        i: 'minutePadded',
        // I: 'tba',
        j: 'day',
        l: 'weekday',
        // L: 'tba',
        m: 'monthNumPadded',
        M: 'monthShort',
        n: 'monthNum',
        // N: 'tba',
        // o: 'tba',
        // TODO O: 'tba',
        // P: 'tba',
        // r: 'tba',
        s: 'secondPadded',
        // TODO S: 'tba',
        // TODO t: 'tba',
        // TODO T: 'tba',
        u: 'microSecondPadded',
        // U: 'tba',
        w: 'weekdayNum',
        W: 'weekOfTheYearNum',
        y: 'yearShort',
        Y: 'year',
        z: 'dayOfTheYear',
        // Z: 'tba',
      }
    },
    python: {
      prefix: '\%',
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
      strftime = {};
    for (var key in $scope.strftime.mapping) {
      if ($scope.strftime.mapping.hasOwnProperty(key)) {
        strftime[$scope.strftime.prefix + key] = $scope.strftime.mapping[key];
      }
    }
    console.log(strftime);
    console.log(input);
    return $scope.grab(strftime[input], datetime);
  };

  $scope.convert = function(input) {
    var re,
      match,
      replacer, replacer1, replacer2,
      prefix = $scope.strftime.prefix;

    replacer1 = function(match, p1) {
      console.log(match, p1);
      return $scope.convertToken(p1);
    };
    replacer2 = function(match, p1, p2) {
      console.log(match, p1, p2);
      return p1 + $scope.convertToken(p2);
    };
    if (prefix) {
      re = '(^|[^' + prefix + '])(' + prefix + '[' + $scope.strftime.tokens.join('') + '])';
      re = new RegExp(re, 'g');
      replacer = replacer2
    } else {
      re = '([' + $scope.strftime.tokens.join('') + '])';
      re = new RegExp(re, 'g');
      replacer = replacer1
    }

    while (match = re.exec(input)) {
      console.log(match, '?=', re.exec(input));
      input = input.replace(re, replacer);
    }
    console.log('convert input', input);
    return input;
  };

  $scope.calculate = function() {
    // $scope.output default
    if ($scope.input) {
      console.log('got input of', $scope.input);
      $scope.output = $scope.convert($scope.input);
    } else {
      $scope.output = $scope.defaultStrftime();
    }
  };
  $scope.calculate();

}]);
