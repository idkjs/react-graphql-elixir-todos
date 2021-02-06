'use strict';

var RescriptReactRouter = require("@rescript/react/src/RescriptReactRouter.bs.js");

function fromString(x) {
  if (!x) {
    return /* NotFoundRoute */3;
  }
  switch (x.hd) {
    case "home" :
        var match = x.tl;
        if (match && match.hd === "/" && !match.tl) {
          return /* HomeRoute */0;
        } else {
          return /* NotFoundRoute */3;
        }
    case "login" :
        if (x.tl) {
          return /* NotFoundRoute */3;
        } else {
          return /* LoginRoute */1;
        }
    case "sign-up" :
        if (x.tl) {
          return /* NotFoundRoute */3;
        } else {
          return /* SignupRoute */2;
        }
    default:
      return /* NotFoundRoute */3;
  }
}

function toString(x) {
  switch (x) {
    case /* HomeRoute */0 :
        return "/";
    case /* LoginRoute */1 :
        return "/login";
    case /* SignupRoute */2 :
        return "/sign-up";
    case /* NotFoundRoute */3 :
        return "/404";
    
  }
}

function go(route) {
  return RescriptReactRouter.push(toString(route));
}

exports.fromString = fromString;
exports.toString = toString;
exports.go = go;
/* RescriptReactRouter Not a pure module */
