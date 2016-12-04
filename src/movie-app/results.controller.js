angular.module('movieApp') // Getter
    .controller('ResultsController', function($scope, $location, omdbApi) {
        // Could also remove $scope and replace it with this keyword
        var query = $location.search().q;
        $scope.results = [];

        omdbApi.search(query)
            .then(function(data) {
                $scope.results = data.Search;
            })
            .catch(function() {
                $scope.errorMessage = "Something went wrong!";
            });
    });