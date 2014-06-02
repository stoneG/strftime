'use strict';
 
describe('MainCtrl', function(){
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('strftimeApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('StrftimeController', {$scope: scope});
    }));
    // tests start here

    it('should add one', function() {
      scope.num = 0;
      scope.addOne();
      expect(scope.num).toBe(1);
    });
});
