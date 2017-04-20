angular.module('registration')
.service('UserService',function($timeout, $filter, $q){
  var service={};
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
    var filtered = $filter('$filter')(GetUsers(),{username:username});
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
    return deferred.promise;
  }
  service.create=function(user){
    console.log(user);
    var deferred = $q.defer();
    $timeout(function(){
      GetByUsername(user.username)
      .then(function(existingUser){
        if(existingUser !== null){
          deferred.resolve({success:false,
            message: 'Username "' + user.username + '" is already taken'});
        } else {
          var users=GetUsers();
        }
      })
    },1000)
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
