var movieApp = angular.module('movieApp', [])
    .controller('SearchController', function($scope, $location) {
    // $scope.greeting = "Hola";
        //this.greeting = "Hola " + this.name();
        $scope.search = function() {
                if ($scope.query) {
                        $location.path("/results").search('q', $scope.query);
                }              
        }
    });