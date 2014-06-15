/* global angular, describe, it, beforeEach, expect */

describe('MainCtrl', function(){
    var $scope;//we'll use this scope in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('strftimeApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        $scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('StrftimeController', {$scope: $scope});
    }));
    // tests start here

    it('should calculate default strftime', function() {
      $scope.calculate();
      expect($scope.output).toBe($scope.getDefaultStrftime());
    });
});
