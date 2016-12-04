describe('Home Controller', function() {
    var $this;
    var $scope;
    var $interval;
    var $controller;
    var omdbApi;
    var PopularMovies;

    beforeEach(module('movieApp'));
    beforeEach(inject(function(_$q_, _PopularMovies_) {
        spyOn(_PopularMovies_, "get").and.callFake(function() {
            var deferred = _$q_.defer();
            deferred.resolve('tt1285016', 'tt1285017', 'tt1285018');
            return deferred.promise;
        });
    }));

     beforeEach(inject(function(_$q_, _omdbApi_) {
            spyOn(_PopularMovies_, "find").and.callFake(function() {
            var deferred = _$q_.defer();
            var args = _omdbApi_.find.calls.mostRecent().args[0];
            if (args === "tt1285016") {
                deferred.resolve(results[0]);
            }
            else if (args == "tt1285017") {
                deferred.resolve(results[1]);
            }
            else if (args == "tt1285018") {
                deferred.resolve(results[2]);
            }
            else {
                deferred.reject();
            }
            deferred.resolve(args);
            return deferred.promise;
        });
     }));

    beforeEach(inject(function(_$controller_, _$interval_, _$rootScope_, _omdbApi_, _PopularMovies_) {
        $scope = {};
        $interval = _$interval_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $controller('HomeController', { 
            $scope: $scope, 
            $interval: _$interval_,
            omdbApi: _omdbApi_,
            PopularMovies: _PopularMovies_
         });
         $rootScope.$apply(); // Resolve the promise
    }));

    it('should rotate movies every 5 sec', function() {
        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);

        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);

        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);

    expect($scope.result.Title).toBe(results[3].Title);
        $interval.flush(5000);
    })
    
    
});
