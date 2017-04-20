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
