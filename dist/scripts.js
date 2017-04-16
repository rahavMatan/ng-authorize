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

angular.module('Authentication')
.service('AuthenticationService',function(Base64){
  this.encode=function(input){
    return Base64.encode(input);
  }
})
.factory('Base64',function(){
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  return {
    encode:function(input){
      var chars = [...input];
      var binaries = [];
      var indexes=[];
      chars.forEach(function(char,index){
        binaries.push( toEightDigits(char.charCodeAt(0).toString(2)));

      })

      toSixDigits(binaries.join(""));

      function toSixDigits(string){
        for(var i=0;i<string.length;i+=6){
          var binary="";
          for(var j=0;j<6;j++){
            binary+=string[i+j];
          }
         indexes.push(parseInt(String(index),2));
        }

      }
      function toEightDigits(bin){
        if(bin.length<8){
          var times = 8-bin.length;
          var padding="";
          for(var i=0;i<times;i++){
            padding+='0';
          }
          return padding+bin;
        }
      }

    },
    decode:function(input){

    }
  }
})
