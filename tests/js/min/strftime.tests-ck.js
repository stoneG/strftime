describe("StrftimeController",function(){function e(e,t){it("should be able to grab "+e+" of a Date object",function(){expect(d.grab(e,a)).toBe(t)})}var d,a,t;beforeEach(function(){a=new Date(Date.parse("Wed, 25 Dec 2013 17:15:30")),angular.mock.module("strftimeApp"),angular.mock.inject(function(e,a){d=e.$new(),a("StrftimeController",{$scope:d})})}),it("should calculate default strftime",function(){d.calculate(),expect(d.output).toBe(d.defaultStrftime())}),t={weekdayShort:"Wed",weekday:"Wednesday",weekdayNum:"3",dayPadded:"25",monthShort:"Dec",month:"December",monthNumPadded:"12",yearShort:"13",year:"2013",day:"25",hour24Padded:"17",hour12Padded:"05",meridian:"PM",minutePadded:"15",secondPadded:"30",microSecondPadded:"000000",dayOfTheYearPadded:"359",weekOfTheYearNumPadded:"51",weekOfTheYearNum:"51"};for(var o in t)t.hasOwnProperty(o)&&e(o,t[o])});