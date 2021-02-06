'use strict';

var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Jsonwebtoken = require("jsonwebtoken");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

function tokenToJs(param) {
  return {
          clientId: param.clientId
        };
}

function tokenFromJs(param) {
  return {
          clientId: param.clientId
        };
}

var InvalidJWT = Caml_exceptions.create("Jwt-Todos.InvalidJWT");

function verify(token, cert, options) {
  var value;
  try {
    value = Jsonwebtoken.verify(token, cert, options);
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    return {
            TAG: /* Error */1,
            _0: {
              RE_EXN_ID: InvalidJWT,
              _1: e
            }
          };
  }
  return {
          TAG: /* Ok */0,
          _0: {
            clientId: value.clientId
          }
        };
}

function getKeyId(token) {
  return Belt_Option.flatMap(Caml_option.nullable_to_opt(Jsonwebtoken.decode(token, {
                      complete: true
                    })), (function (result) {
                return Belt_Option.flatMap(Caml_option.nullable_to_opt(result.header), (function (header) {
                              return Caml_option.nullable_to_opt(header.kid);
                            }));
              }));
}

function decodeJwt(token) {
  return Belt_Option.flatMap(Caml_option.nullable_to_opt(Jsonwebtoken.decode(token, {
                      complete: true
                    })), (function (result) {
                return Belt_Option.flatMap(Caml_option.nullable_to_opt(result.header), (function (header) {
                              return Caml_option.nullable_to_opt(header.kid);
                            }));
              }));
}

exports.tokenToJs = tokenToJs;
exports.tokenFromJs = tokenFromJs;
exports.InvalidJWT = InvalidJWT;
exports.verify = verify;
exports.getKeyId = getKeyId;
exports.decodeJwt = decodeJwt;
/* jsonwebtoken Not a pure module */
