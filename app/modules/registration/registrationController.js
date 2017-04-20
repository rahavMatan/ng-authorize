angular.module('registration')
.controller('registrationController',function($scope,UserService, $state, $rootScope){
  $scope.register = function(){
    $scope.dataLoading=true;
    UserService.create($scope.user)
    .then(function(response){
      console.log(response);
      if(response.success){
        $state.go('login');
      } else {
        $scope.msg= response.message;
        $scope.dataLoading=false;
      }
    })
  }
})
