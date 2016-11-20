describe('MovieCore service', function() {
    var PopularMovies;
    var $httpBackend;

    beforeEach(module('movieCore'));
    beforeEach(inject(function(_PopularMovies_, _$httpBackend_) {
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create popular movie', function() {
        //var expectedData = '{"movieId":"tt1285016","description":"Great movie"}';
        // var expectedData = function(data) {
        //     dump(angular.mock.dump(data));
        //     return angular.fromJson(data).movieId === "tt1285016";
        // };
        var expectedData = /{"movieId":"tt1285016","description":".*"}/;
        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var popularMovie = new PopularMovies({
            movieId: 'tt1285016',
            description: 'Great movie!!!'
        });

        popularMovie.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should get popular movie by id', function() {
        // $httpBackend.expectGET(function(url) {
        //     dump(url);
        // }).respond(200);
        $httpBackend.expectGET('popular/tt1285016').respond(200);

        PopularMovies.get({movieId: "tt1285016"});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update popular', function() {
        var popularMovie = new PopularMovies({
            movieId: 'tt1285016',
            description: 'Great movie!!!'
        });

        $httpBackend.expectPUT('popular').respond(200);

        PopularMovies.update(popularMovie);

        expect($httpBackend.flush).not.toThrow();
    });

    it('should authenticate requests', function() {
         var matchAny = /.*/;
         var expected = '{"authToken:"teddybear","Accept":"application/json, text/plain, */*"}';
         var expectedHeaders = function(headers) {
             dump(angular.mock.dump(headers));
             return angular.fromJson(headers).authToken === "teddybear";
         }

         // Can use function or object for expectedHeaders
         $httpBackend.expectGET('popular/tt1285016', expectedHeaders).respond(200);

         PopularMovies.get({movieId: "tt1285016"});

         expect($httpBackend.flush).not.toThrow();
         // $httpBackend.flush accepts an optional parameter of how many http requests we want to process
    });
})