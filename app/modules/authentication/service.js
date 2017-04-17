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
      var sixDigitsBinaries = [];
      var encoded = [];

      chars.forEach(function(char,index){
        binaries.push( toEightDigits(char.charCodeAt(0).toString(2)));
      })

      toSixDigits(binaries.join(""));
      toIndexes(sixDigitsBinaries);
      toEncoded(binaries);
    //  console.log(sixDigitsBinaries);
    //  console.log(indexes);

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

      function toSixDigits(string){
        for(var i=0;i<string.length;i+=6){
          var binary="";
          for(var j=0;j<6;j++){
            var char = string[i+j] || '0';
            binary+=char;
          }
          sixDigitsBinaries.push(binary)
        }
      }

      function toIndexes(arr){
        arr.forEach(function(bin){
          indexes.push(parseInt(bin,2));
        })
      }
      function toEncoded(bins){
        bins.forEach(function(bin){
          var index = parseInt(bin,2)
          console.log(index);
          encoded.push( )
        })
      }


    },
    decode:function(input){

    }
  }
})
var Base64={
   _keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
   encode:function(e){
     var t="";
     var n,r,i,s,o,u,a;
     var f=0;
     e=Base64._utf8_encode(e);
     while(f<e.length){
       n=e.charCodeAt(f++);
       r=e.charCodeAt(f++);
       i=e.charCodeAt(f++);
       s=n>>2;
       o=(n&3)<<4|r>>4;
       u=(r&15)<<2|i>>6;
       a=i&63;
       if(isNaN(r)){
         u=a=64
       }
       else if(isNaN(i)){
         a=64
       }
       t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},
   decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
