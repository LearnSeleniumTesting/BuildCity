/**
 * @ngdoc service
 * @name starter.service.Service
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $replace_me
 *
 * */


angular.module('starter.service',[])
    .factory('projectsFactory', function(){

    var allProjects = [
                        { endpoint: "http://teamcity.codebetter.com" }

                        ];

    return {
        all: function() {
          return allProjects;
        },
        get: function(id) {
            return allProjects[id]
          }
      }
    })
    .factory('$localstorage', ['$window', function($window) {
      return {
        set: function(key, value) {
          //before storing the value, get the value, parse it that will convert into an array then push into that array and store back to the same value.
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      }
    }])
    .factory('teamcityRoutes', function(){

        var allRoutes =[
                        {
                         id: 0,
                         name: 'ListAllProjects',
                         route: '/app/rest/projects'
                        },
                        {
                         id: 1,
                         name: 'GetSpecificProject',
                         route: '/app/rest/projects/id:'
                        },
                       ];
        return {
            all: function() {
              return allRoutes;
            },
            get: function(id) {
              return allRoutes[id]
            }
            }

    });




