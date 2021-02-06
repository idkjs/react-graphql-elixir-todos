'use strict';

var JwtDecode = require("jwt-decode");
var Storage$Todos = require("./Storage.bs.js");

function useUser(param) {
  var token = Storage$Todos.LocalStorage.getItem(/* Token */0);
  if (token === undefined) {
    return ;
  }
  var decodedToken = JwtDecode(token);
  return {
          email: decodedToken.email,
          sub: decodedToken.sub,
          iat: decodedToken.iat,
          exp: decodedToken.exp
        };
}

function decodeExp(param) {
  var token = Storage$Todos.LocalStorage.getItem(/* Token */0);
  if (token === undefined) {
    return ;
  }
  var decodedToken = JwtDecode(token);
  return {
          email: decodedToken.email,
          sub: decodedToken.sub,
          iat: decodedToken.iat,
          exp: decodedToken.exp
        };
}

exports.useUser = useUser;
exports.decodeExp = decodeExp;
/* jwt-decode Not a pure module */
