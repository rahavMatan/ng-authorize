angular.module('Authentication', []);
angular.module('Home', []);
angular.module('authApp',['Authentication','Home','ui.router','ngCookies'])
.run(function($rootScope, $location, $cookieStore, $http){
  $http.defaults.headers.common['Auth-Token'] = 'login YmVlcDpi';
  $rootScope.user = { username: 'username', authenticationid:'id'};
  //Setting Cookie
  $cookieStore.put( 'yourmodule', $rootScope.user );

})
