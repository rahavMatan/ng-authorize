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

angular.module('Home')
.controller('HomeController',function($scope,AuthenticationService, UserService){
  $scope.logout=function(){
    AuthenticationService.ClearCredentials();
  }
  $scope.GetUsers=function(){
    UserService.GetAll()
    .then(function(users){
      $scope.users=users;
    })
  }
  $scope.GetUsers();
  $scope.deleteUser=function(id){
    UserService.delete(id)
    .then(function(){
      $scope.GetUsers();
    })
  }
})

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

angular.module('Authentication')
.factory('AuthenticationService',function(Base64,$http,$cookieStore, $rootScope, $timeout,UserService){
  var service ={};
  service.Login = function (username, password, callback) {
    $timeout(function () {
      var response;
      UserService.GetByUsername(username)
        .then(function(user){
          if(user !== null && user.password == password){
            response = {success:true};
          } else {
            response = {success:false, message: 'username or password is incorrect'};
          }
          callback(response);
        })

    }, 1000);
  };

  service.SetCredentials = function(username,password){
    var authdata = Base64.encode(username+':'+password);
    $rootScope.globals = {
      currentUser:{
        username:username,
        authdata:authdata
      }
    }
    $http.defaults.headers.common['Authorization'] = 'Basic' + authdata;
    $cookieStore.put('globals',$rootScope.globals)

  }
  service.ClearCredentials=function(){
    $rootScope.globals={};
    $cookieStore.remove('globals');
    $http.defaults.headers.common.Authorization='Basic ';
  }
  return service;
})
.factory('Base64',function(){
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  return {
    encode:function(input){
      var result =[];
      var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
      for(var i=0;i<input.length;){
        chr1=input.charCodeAt(i++);
        chr2=input.charCodeAt(i++)
        chr3=input.charCodeAt(i++)

        enc1 = chr1 >> 2;
        enc2 = (chr1 & 3) << 4 | (chr2 >> 4);
        enc3 = (chr2 & 15) << 2 | (chr3 >> 6);
        enc4 = chr3 & 63;

        if(isNaN(chr2)){
          enc3=enc4=64;
        } else if (isNaN(chr3)){
          enc4=64;
        }

        result.push(keyStr.charAt(enc1),keyStr.charAt(enc2),keyStr.charAt(enc3),keyStr.charAt(enc4));


      }
      return result.join("");
    },
    decode:function(input){
      var result =[];
      var chr1,chr2,chr3,enc1,enc2,enc3,enc4;

      //var base64Test = /[A-Za-z0-9\+\/\=]/g;
      //input = input.replace(/=/g, "");
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      for(var i=0;i<input.length;){
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2>>4)
        chr2 = ((enc2 & 15)<<4) | enc3>>2
        chr3 = ((enc3 & 3) << 6) | enc4

        result.push(String.fromCharCode(chr1));
        if(enc3!=64){
          result.push(String.fromCharCode(chr2));
        }
        if(enc4!=64){
          result.push(String.fromCharCode(chr3));
        }

      }
      return result.join("");
    }
  }
})

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

angular.module('registration')
.service('UserService',function($timeout, $filter, $q){
  var service={};
  service.GetUsers = GetUsers;
  function GetUsers(){
    if(!localStorage.users){
      localStorage.users=JSON.stringify([]);
    }
    return JSON.parse(localStorage.users);
  }
  function setUsers(users){
    localStorage.users = JSON.stringify(users);
  }
  service.GetAll=function(){
    var deferred = $q.defer();
    deferred.resolve(GetUsers());
    return deferred.promise;
  }
  service.GetById=function(id){
    var deferred = $q.defer();
    var filtered = $filter('$filter')(GetUsers(),{id:id});
    var user = filtered.length?filtered[0]:null;
    deferred.resolve(user);
    return deferred.promise;
  }
  service.GetByUsername=function(username){
    var deferred=$q.defer();
    var filtered = $filter('filter')(GetUsers(),{username:username});
    var user = filtered.length ? filtered[0] : null;
    console.log(user);
    deferred.resolve(user);
    return deferred.promise;
  }
  service.create=function(user){
    var self=this;
    var deferred = $q.defer();
    $timeout(function(){
      self.GetByUsername(user.username)
      .then(function(existingUser){
        if(existingUser !== null){
          deferred.resolve({success:false,
                            message: 'Username "' + user.username + '" is already taken'});
        } else {
          var users=GetUsers();
          var lastUser = users[users.length-1] || {id:0};
          user.id = lastUser.id+1;
          users.push(user);
          setUsers(users);
          deferred.resolve({success:true});
        }
      })
    },1000)
    return deferred.promise;
  }
  service.update=function(user){
    var deferred = $q.defer();
    var users = GetUsers();
    for(var i=0;i<user.length;i++){
      if(users[i].id == user.id){
          users[i] = user;
          break;
      }
    }
    setUsers(users);
    deferred.resolve();
    return deferred.promise();
  }
  service.delete=function(id){
    var deferred= $q.defer();
    var users = GetUsers();
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (user.id === id) {
            users.splice(i, 1);
            break;
        }
    }
    setUsers(users);
    deferred.resolve();

    return deferred.promise;
  }
  return service;
})
