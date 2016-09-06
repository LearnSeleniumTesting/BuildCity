angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
//    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('loginCtrl', function($scope, $state, projectsFactory, myService){
 //This controller is for login.html where you can click on button to login as guest.
 $scope.activeProject = projectsFactory.all()[0].endpoint;
 $scope.guestUrl = null;
 $scope.GoToSetting = function(){
 $state.go('app.settings');
 }
 $scope.setGuest = function(){
    $state.go('app.projectList');
 };
  $scope.goQueuedBuild = function(){
     $state.go('app.queuedBuild');
  };

})

.controller('projectDetailCtrl', function($scope, $stateParams, $http, projectsFactory) {
$scope.href = "/guestAuth/app/rest/projects/id:"
$scope.endpoint = projectsFactory.all()[0].endpoint;
$http.get($scope.endpoint+$scope.href+$stateParams.projectId).then(function(resp) {
    $scope.details = resp.data;
    $scope.buildTypes = resp.data.buildTypes.buildType;
  }, function(err) {
    console.error('ERR', err);
  });

})


.controller('projectListCtrl', function($scope, $http, $ionicLoading, projectsFactory, teamcityRoutes){
//This controller is for projecrtlist.html to show list of projects
$scope.userType = '/guestAuth';
$scope.AllProjectRoute = teamcityRoutes.all()[0].route;
$scope.endpoint = projectsFactory.all()[0].endpoint;
$ionicLoading.show({
        template: 'Loading...'
      });
$http.get($scope.endpoint+$scope.userType+$scope.AllProjectRoute).then(function(resp) {

    $scope.conditions = resp.data;
    $ionicLoading.hide()
  }, function(err) {
    console.error('ERR', err);
  });
$scope.ViewId = function(item){
  };


})

.controller('buildCtrl', function($scope, $http, $ionicLoading, $stateParams, $ionicNavBarDelegate, projectsFactory){

  $scope.endpoint = projectsFactory.all()[0].endpoint;
  $scope.userType = '/guestAuth';
  $scope.success = 0;
  $scope.failure = 0;
  $scope.error = 0;
  $scope.builds = null;
  $scope.buildReport = [];
  $scope.resultObject = {};
  $scope.statusText = null;
  $scope.route = "http://teamcity.codebetter.com/guestAuth/app/rest/buildTypes/id:"+$stateParams.buildId+"/builds/?locator=start:0,count:10000";

  $ionicLoading.show({ template: 'Preparing report...' });
  $http.get($scope.route).then(function(resp) {

    if(resp.data.count >0){
      $scope.builds = resp.data.build;
      for(var i = 0; i< $scope.builds.length; i++)
      {
        if($scope.builds[i].status == "SUCCESS"){

          $scope.success +=1;
        }
        else if ($scope.builds[i].status == "FAILURE")
        {
          $scope.failure +=1;
        }
        else
        {
          $scope.error +=1;
        }
        $scope.routeToBuildId = $scope.builds[i].href;
        $scope.statusText = null;
        $http.get($scope.endpoint+$scope.routeToBuildId).then(function(resp){
           $scope.build = resp.data;
//         console.log($scope.build);
            $scope.navTitle = $scope.build.buildType.name;
           $ionicNavBarDelegate.title($scope.myHeader);
//            console.log($scope.build);
            $scope.resultObject = {
                                           agent: $scope.build.agent,
                                           number: $scope.build.number,
                                           result: $scope.build.statusText,
                                           status: $scope.build.status,
                                           date: $scope.build.finishDate,
                                           type: $scope.build.buildType
                                          }
                    $scope.buildReport.push($scope.resultObject);

        },
        function(err){
           console.error('ERR', err)
         });


      }



    }
    //building pie chart
       $scope.chartDonut = {
         options: {
            plotOptions: {

                   pie: {

                       dataLabels: {
                           enabled: false,

                           style: {
                               fontWeight: 'bold',
                               color: 'white',
                               textShadow: '0px 1px 2px black'
                           }

                       },
                       startAngle: -90,
                       endAngle: 90,
                       center: ['50%', '50%']
                   }
               },
                colors: ['#FF0000', '#228B22', '#FFA500'],
//                height: '100px'
       },



         series: [{
           type: 'pie',
           innerSize: '50%',
           data: [
             ['Fail', $scope.failure],
             ['Pass', $scope.success],
             ['Error', $scope.error]
           ],
           name: '',
           //data:[50,40],
           dataLabels: {
             rotation: 270,
             enabled: false,
             format: ''

           }
         }],

         noData: 'No Build Data',
          title: {
               text: '',
               align: 'center',
               verticalAlign: 'middle',
               y: -60
           },


         credits: {
           enabled: false
         },

         loading: false
       }

       $ionicLoading.hide()

  }, function(err) {
    console.error('ERR', err);
  });





})


.controller('settingsCtrl', function($scope, $ionicModal, projectsFactory, myService){
$scope.availableProjects = [{url: "http://teamcity.codebetter.com/", isChecked: true}];
//This controller is to show the project-settings.html page.
$ionicModal.fromTemplateUrl('templates/add-new-teamcity-project.html',{
  scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });


//  $scope.availableProjects.push({endpoint: projectsFactory.all()[0].endpoint, selected: true});
//  console.log($scope.availableProjects);
// Open the login modal
  $scope.add = function() {
    $scope.modal.show();
  };



  // Triggered in the login modal to close it
    $scope.closeModal = function() {
      $scope.modal.hide();
    };


  // Add project and once you add, it will clear fields
  $scope.AddProject = function(project){
    if(project.isDefault == true)
    {
      $scope.availableProjects.forEach(function(obj) { obj.isChecked = false;  });
    }
    $scope.availableProjects.push({url: project.url, isChecked: project.isDefault});
    $scope.closeModal();
    project.url = "";
    project.isDefault = false;
  }

})

.controller('queuedBuildCtrl', function($scope, $http, $ionicModal, projectsFactory){
$scope.qBuilds = [];
$scope.endpoint = projectsFactory.all()[0].endpoint;
$scope.buildQueueRoute = '/guestAuth/app/rest/buildQueue'
$http.get($scope.endpoint+$scope.buildQueueRoute).then(function(resp){

$scope.queuedBuild = resp.data.build;
$scope.queuedBuild.forEach(function(build){
$http.get($scope.endpoint+build.href).then(function(resp){
$scope.qBuilds.push(resp.data);
//console.log($scope.qBuilds);
},function(ERR){})});

}, function(err) {
      console.error('ERR', err);
    });
})
.service('myService', function() {
      this.xxx = "yyy";
    });
