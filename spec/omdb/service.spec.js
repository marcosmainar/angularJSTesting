describe('omdb service', function() {

    var movieData = {"Title":"Star Wars","Year":"1983","Rated":"N/A","Released":"01 May 1983","Runtime":"N/A","Genre":"Action, Adventure, Sci-Fi","Director":"N/A","Writer":"N/A","Actors":"Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones","Plot":"N/A","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMWJhYWQ3ZTEtYTVkOS00ZmNlLWIxZjYtODZjNTlhMjMzNGM2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg","Metascore":"N/A","imdbRating":"7.8","imdbVotes":"362","imdbID":"tt0251413","Type":"game","Response":"True"};
    var movieDataById = {"Title":"The Social Network","Year":"2010","Rated":"PG-13","Released":"01 Oct 2010","Runtime":"120 min","Genre":"Biography, Drama","Director":"David Fincher","Writer":"Aaron Sorkin (screenplay), Ben Mezrich (book)","Actors":"Jesse Eisenberg, Rooney Mara, Bryan Barter, Dustin Fitzsimons","Plot":"Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.","Language":"English, French","Country":"USA","Awards":"Won 3 Oscars. Another 161 wins & 162 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2ODk0NDAwMF5BMl5BanBnXkFtZTcwNTM1MDc2Mw@@._V1_SX300.jpg","Metascore":"95","imdbRating":"7.7","imdbVotes":"488,232","imdbID":"tt1285016","Type":"movie","Response":"True"};
    var omdbApi = {};
    var $httpBackend;

    beforeEach(module('omdbModule'));
    beforeEach(inject(function(_omdbApi_, _$httpBackend_) {
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return movie data', function() {
        // angular.mock.module({
        //     'omdbApi' : {
        //         search: function(query) {
        //             return movieData;
        //         }
        //     }
        // })

        // angular.mock.module(function($provide) {
        //     $provide.factory('omdbApi', function() {
        //        return {
        //             search: function(query) {
        //                 return movieData;
        //             }
        //         }
        //     })
        // })
        // $httpBackend
        //     .expect()
        //     .when();
        var response;
        //var expectedUrl = "http://www.omdbapi.com/?v=1&s=start%20wars";
        // Can also use regex
        var expectedUrl = function(url) {
            return url.indexOf('http://www.omdbapi.com') !== -1;
        }

        $httpBackend.when('GET', expectedUrl)
            .respond(200, movieData);

        omdbApi.search('start wars').then(function(data) {
            response = data;
        });

        $httpBackend.flush(); // Resolves all the configured HTTP requests
        expect(response).toEqual(movieData);

        console.log(angular.mock.dump(movieData));
    })

    it('should handle error', function() {
        var response;

        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt1285016')
            .respond(500);

        omdbApi.findById('tt1285016')
            .then(function(data) {
                response = data;
            })
            .catch(function() {
                response = 'Error!';
            })

        $httpBackend.flush();
        expect(response).toEqual('Error!');
    })

    it('should return movie data by id', function() {
        var response;
        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt1285016')
            .respond(200, movieDataById);

        omdbApi.findById('tt1285016')
            .then(function(data) {
                response = data;
            })

        $httpBackend.flush();
        expect(response).toEqual(movieDataById);
     })
})