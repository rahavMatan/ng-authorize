angular.module('Authentication', []);
angular.module('Home', []);
angular.module('authApp',['Authentication','Home','ui.router','ngCookies'])
.controller('authCtrl',function($scope, AuthenticationService){
  $scope.encoded;
  $scope.encodedInput;
  this.encode = function(input){
    $scope.encoded = AuthenticationService.encode(input);
  }
  this.decode=function(input){
    $scope.decoded = AuthenticationService.decode(input);
  }
})
