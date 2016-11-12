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

    })
    .factory ('StorageService', function ($localStorage) {

      $localStorage = $localStorage.$default({
        things: []
      });

      var _getAll = function () {
        return $localStorage.things;
      };

      var _add = function (thing) {
        $localStorage.things.push(thing);
      }

      var _remove = function (thing) {
        $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
      }

      var _update = function(){
        $localStorage.things.forEach(function(obj) { obj.selected = false;  });
      }

      var _update_One = function(item){
              $localStorage.things.forEach(function(obj) {
              if(item.url == obj.url)
               {
               obj.selected = true;
               }else
                 {
                                obj.selected = false;

                 }});

      }

      var _selected = function(){
      var ret = "";
             $localStorage.things.forEach(function(obj) {
             if(obj.selected == true)
               ret = obj.url;
               });

               return ret;
      }


      return {
        getAll: _getAll,
        add: _add,
        remove: _remove,
        update: _update,
        update_one: _update_One,
        selected: _selected

      };
    })

    .factory('teamcityTimeFormatter', function($http){

        return {
        all: function(start, end) {
          $http.get("http://teamcity.codebetter.com/guestAuth/app/rest/builds").then(function(resp){
                     console.log(resp);
                     });

        }



    }});




