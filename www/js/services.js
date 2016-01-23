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




