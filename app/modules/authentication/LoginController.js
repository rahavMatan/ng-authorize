angular.module('Authentication')
.controller('LoginController', function($scope, $rootScope, $state, AuthenticationService){
  //AuthenticationService.ClearCredentials();
  $scope.login=function(){
    AuthenticationService.ClearCredentials();
    $scope.dataLoading=true;
    $scope.error = "";
    AuthenticationService.Login($scope.username, $scope.password,function(response){
      if(response.success){
        AuthenticationService.SetCredentials($scope.username, $scope.password);
        $state.go('home');
      } else {
        $scope.error = response.message;
        $scope.dataLoading = false;
      }
    })
  }
})
