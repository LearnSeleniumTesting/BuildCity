// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.service', 'highcharts-ng','ngCordova', 'ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })
  .state('app.projectList', {
      url: '/projectList',
      views: {
        'menuContent': {
          templateUrl: 'templates/projectlist.html',
          controller: 'projectListCtrl'
        }
      }
    })
    .state('app.queuedBuild', {
          url: '/queuedBuilds',
          views: {
            'menuContent': {
              templateUrl: 'templates/queued-builds.html',
              controller: 'queuedBuildCtrl'
            }
          }
        })
  .state('app.singleProjectDetail', {
    url: '/project/:projectId',
    views: {
      'menuContent': {
        templateUrl: 'templates/project-detail.html',
        controller: 'projectDetailCtrl'
      }
    }
  })
  .state('app.settings',{
     url: '/settings',
          views: {
            'menuContent': {
              templateUrl: 'templates/project-settings.html',
              controller: 'settingsCtrl'
            }
          }
        })
 .state('app.build-summary',{
     url: '/build/:buildId/build',
          views: {
            'menuContent': {
              templateUrl: 'templates/build-summary.html'

            }
          }
        })
  .state('app.build',{
     url: '/build/:buildId',
          views: {
            'menuContent': {
              templateUrl: 'templates/build.html',
              controller: 'buildCtrl'

            }
          }
        })
   .state('app.test',{
      url: '/test',
           views: {
             'menuContent': {
               templateUrl: 'templates/test.html',
               controller: 'testCtrl'

             }
           }
         })

        .state('app.newTeamcity',{
             url: '/newTeamcity',
                  views: {
                    'menuContent': {
                      templateUrl: 'templates/project-settings.html',
                      controller: 'settingsCtrl'
                    }
                  }
                });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/test');
});
