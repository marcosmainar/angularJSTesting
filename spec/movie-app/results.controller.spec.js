describe('Results Controller', function() {
    var results = [{
        Search: [
            {Title: "Start Wars: Episode IV"},
            {Title: "Start Wars: Episode V"},
            {Title: "Start Wars: Episode VI"}
        ]}
    ];

    var $controller, $scope, $location;
    var $q, $rootScope, omdbApi;

    beforeEach(module('movieApp'));
    beforeEach(module('omdbModule'));

    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, 
                        _$location_, _omdbApi_) {
        $controller = _$controller_;
        $scope = {};
        $q = _$q_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        omdbApi = _omdbApi_;
    }));

    it('should load search results', function() {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope, $location: $location});
        $rootScope.$apply(); // Resolve the promise

        expect(omdbApi.search).toHaveBeenCalledWith("star wars");
    });

     it('should show an error', function() {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope, $location: $location});
        $rootScope.$apply(); // Resolve the promise
        expect($scope.errorMessage).toBe("Something went wrong!");
    })

})