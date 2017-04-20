angular.module('Authentication', []);
angular.module('Home', []);
angular.module('registration',[])

angular.module('authApp',['Authentication','Home','registration','ui.router','ngCookies'])
.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state('login',{
    url:'/login',
    controller:'LoginController',
    templateUrl:'app\\modules\\authentication\\login.html'
  })
  .state('registration',{
    url:'/registration',
    controller:'registrationController',
    templateUrl:'app/modules/registration/registration.html'
  })
  .state('home',{
    url:'/home',
    controller:'HomeController',
    templateUrl:'app/modules/home/home.html'
  })
  $urlRouterProvider.otherwise('/login');
})

.run(function($rootScope,$transitions, $cookieStore, $http){
  $rootScope.globals= $cookieStore.get('globals') || {};

  if($rootScope.globals.currentUser){
    $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authdata;

  }
  $transitions.onStart( {}, function(trans) {
    //console.log($rootScope.globals.currentUser);
    var restrictedPage = ['login','registration'].indexOf(trans.$to().name) === -1;
    if(restrictedPage && !$rootScope.globals.currentUser){
      return trans.router.stateService.target('login');
    }
  });
})
