describe('Search Controller', function() {
    var $this;
    var $scope;
    var $location;
    var $controller;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$location_) {
        $scope = {};
        $location = _$location_;
        $controller = _$controller_;
        // var fn = function($scope) {
        //     $scope.search = function() {
        //         if ($scope.query) {
        //              $location.path("/results").search('q', $scope.query);
        //         }              
        //      }
        // }
        $controller('SearchController', { $scope: $scope, $location: $location });
    }));

    it('should redirect to the query results page for non-empty query', function() {
        // Set binding for the query param
        $scope.query = 'star wars';
        $scope.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to query results for empty query', function() {
        $scope.query = '';
        $scope.search();
        expect($location.url()).toBe('');
    });
})