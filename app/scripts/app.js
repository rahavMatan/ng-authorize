angular.module('Authentication', []);
angular.module('Home', []);
angular.module('authApp',['Authentication','Home','ui.router','ngCookies'])
.controller('authCtrl',function($scope, AuthenticationService){
  $scope.encoded;
  this.encode = function(input){
    var keyStr = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='];
    $scope.encoded = AuthenticationService.encode(input);
  }
})
