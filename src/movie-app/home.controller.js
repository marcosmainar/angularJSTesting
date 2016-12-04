angular.module('movieApp')
    .controller('HomeController', function($scope, $interval, omdbApi, PopularMovies, movieCore) {
        var results = [];
        var idx = 0;
        var findMovie = function(id) {
            omdbApi.find(id)
                .then(function(data) {
                    $scope.result = data;
                })
        }
        // Get PopularMovies List
        PopularMovies.get()
            .then(function(data) {
                            results.data = data;
                            $interval(function() {
                        idx++;
                        $scope.result = findMovie(resultsIdx % results.length);
                    }, 5000);
            })
});