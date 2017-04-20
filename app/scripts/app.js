angular.module('Authentication', []);
angular.module('Home', []);
angular.module('authApp',['Authentication','Home','ui.router','ngCookies'])
.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state('login',{
    url:'/login',
    controller:'LoginController',
    templateUrl:'app\\modules\\authentication\\login.html'
  })
  .state('home',{
    url:'/home',
    controller:'HomeController',
    templateUrl:'app/modules/home/home.html'
  })
  $urlRouterProvider.otherwise('/login');
})
.run(function($rootScope, $state,$transitions, $cookieStore, $http){
  $rootScope.globals= $cookieStore.get('globals') || {};

  if($rootScope.globals.currentUser){
    $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authdata;

  }
  console.log($http.defaults.headers);
  $transitions.onStart( {}, function(trans) {
      if(trans.$to().name !== 'login' && !$rootScope.globals.currentUser){
        console.log('not logged-in, should re direct');
      }
  });
})
