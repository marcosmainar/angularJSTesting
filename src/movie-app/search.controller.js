angular.module('movieApp')
    .controller('SearchController', function($scope, $location) {
        var timeout;
        $scope.keyup = function() {
            timeout = $timeout($scope.search(), 1000);
        },

        $scope.keydown = function() {
            $timeout.cancel(timeout);
        },

        // Could also remove $scope and replace it with this keyword
        $scope.search = function() {
                if ($scope.query) {
                        $location.path("/results").search('q', $scope.query);
                        $timeout.cancel(timeout);
                }              
        }
    });