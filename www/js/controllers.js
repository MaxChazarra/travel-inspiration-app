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
  $scope.location = "NCE";

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
    console.log('Doing login', $scope.loginData);

    $scope.loginData.username = "Max Chazarra";

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.service('travelsService', function(){
  var travels = [
    { title: 'Wonderful week-end in Roma', id: 1, author: 'Max Chazarra', profil_pic: 'img/profil/max.jpg', travel_pic: 'img/destination/roma.jpg', days:2, destination: 'Roma, Italy', likes: 104, comments: 56,
      flights: [{from: "NCE", to: "ROM", airline: "AZ"}, {from: "ROM", to: "NCE", airline: "AZ"}],
      activities: [{type:"restaurant",name:"Pizza at ...", link: "http://"}]
    },
    { title: 'Roadtrip in Brasil!', id: 2, author: 'Diane Crawford', profil_pic: 'img/profil/diane.jpg', travel_pic: 'img/destination/rio.jpg', days:14, destination: 'Brasil', likes: 740, comments: 1124 },
    { title: 'Peacefull stay in Bali', id: 3, author: 'Roy Duncan', profil_pic: 'img/profil/roy.jpg', travel_pic: 'img/destination/bali.jpg', days:10, destination: 'Bali, Indonesia', likes: 57, comments: 95 },
    { title: 'Crazy week with mates', id: 4, author: 'Max Chazarra', profil_pic: 'img/profil/max.jpg', travel_pic: 'img/destination/ibiza.jpg', days:7, destination: 'Ibiza, Spain', likes: 247, comments: 145 }
  ];

  return {
      getTravels: function(){ return travels; },
      setTravels: function(value){ travels = value; }
  };

})

.controller('TravelsCtrl', function($scope, travelsService) {
  $scope.travels = travelsService.getTravels();
})

.controller('TravelCtrl', function($scope, $stateParams, $filter, travelsService) {
  $scope.date = $filter("date")(Date.now(), 'yyyy-MM-dd');

  $scope.travel = travelsService.getTravels().filter(function(element) {
      return element.id == $stateParams.travelId;
  })[0];
});
