angular.module('Home')
.controller('HomeController',function($scope,AuthenticationService){
  $scope.logout=function(){
    AuthenticationService.ClearCredentials();
  }
})
