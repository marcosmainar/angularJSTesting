angular.module('omdbModule', []) // Declare a new module with its list of dependencies as an array of comma separated names
    .factory('omdbApi', function($http, $q) {
        var service = {};
        var baseUrl = "http://www.omdbapi.com/?v=1&"
        var movieData = [];

        function httpPromise(url) {
            var deferred = $q.defer();
            $http.get(url)
                .success(function(data) {
                    deferred.resolve(data);  
                })
                .error(function() {
                    deferred.reject();
                }); 
            return deferred.promise;
        }

        service.search = function(query) {
            return httpPromise(baseUrl + 's=' + encodeURIComponent(query));
        }

        service.findById = function(id) {
            return httpPromise(baseUrl + 'i=' + id);
        }

        return service;
    });