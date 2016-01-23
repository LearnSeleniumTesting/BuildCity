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



.controller('loginCtrl', function($scope, $state, projectsFactory){
 //This controller is for login.html where you can click on button to login as guest.
 $scope.activeProject = projectsFactory.all()[0].endpoint;
 $scope.guestUrl = null;
 $scope.GoToSetting = function(){
 $state.go('app.settings');
 }
 $scope.setGuest = function(){
    $state.go('app.projectList');
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


.controller('projectListCtrl', function($scope, $http, projectsFactory, teamcityRoutes){
//This controller is for projecrtlist.html to show list of projects
$scope.userType = '/guestAuth';
$scope.AllProjectRoute = teamcityRoutes.all()[0].route;
$scope.endpoint = projectsFactory.all()[0].endpoint;
$http.get($scope.endpoint+$scope.userType+$scope.AllProjectRoute).then(function(resp) {
    $scope.conditions = resp.data;
  }, function(err) {
    console.error('ERR', err);
  });

$scope.ViewId = function(item){

};
})


.controller('settingsCtrl', function($scope, $ionicModal, projectsFactory){
//This controller is to show the project-settings.html page.
$ionicModal.fromTemplateUrl('templates/add-new-teamcity-project.html',{
  scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $scope.availableProjects = [];
  $scope.availableProjects.push({endpoint: projectsFactory.all()[0].endpoint, selected: true});
  console.log($scope.availableProjects);
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
      $scope.availableProjects.forEach(function(obj) { obj.selected = false;  });
    }

    $scope.availableProjects.push({url: project.url, selected: project.isDefault});




    $scope.closeModal();
    project.url = "";
    project.isDefault = false;
  }

});
