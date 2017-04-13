angular.module('Authentication', []);
angular.module('Home', []);
angular.module('authApp',['Authentication','Home','ui.router','ngCookies'])
.controller('authCtrl',function(){
  this.value=77 & 3;
})
