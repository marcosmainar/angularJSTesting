describe('Search Controller', function() {
    var $this;
    var $scope;
    var $location;
    var $controller;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$location_, _$timeout_) {
        $scope = {};
        $location = _$location_;
        $controller = _$controller_;
        $timeout = _$timeout_;
        // var fn = function($scope) {
        //     $scope.search = function() {
        //         if ($scope.query) {
        //              $location.path("/results").search('q', $scope.query);
        //         }              
        //      }
        // }
        $controller('SearchController', { 
            $scope: $scope, 
            $location: _$location_,
            $timeout: _$timeout_
         });
    }));

    it('should redirect to the query results page for non-empty query', function() {
        // Set binding for the query param
        // Could also do
        // $controller('SearchController', { $scope: $scope, $location: $location }, 
        //     {query: "star wars"});
        $scope.query = 'star wars';
        $scope.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to query results for empty query', function() {
        $scope.query = '';
        $scope.search();
        expect($location.url()).toBe('');
    });

    it('should redirect after 1 second of keyboard inactivity', function() {
        $scope.query = 'star wars';
        $scope.keyup();
        $timeout.flush();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should cancel timeout in keydown', function() {
        $scope.query = 'star wars';
        $scope.keyup();
        $scope.keydown();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });

    it('should cancel timeout when searching', function() {
        $scope.query = 'star wars';
        $scope.keyup();
        $scope.search();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    })
})