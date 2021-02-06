'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function toString(x) {
  return "auth-token";
}

var StoreItems = {
  toString: toString
};

function getItem(key) {
  return Caml_option.null_to_opt(localStorage.getItem("auth-token"));
}

function setItem(key, value) {
  localStorage.setItem("auth-token", value);
  
}

function removeItem(key) {
  localStorage.removeItem("auth-token");
  
}

var LocalStorage = {
  getItem: getItem,
  setItem: setItem,
  removeItem: removeItem
};

function useStorage(key) {
  var match = React.useState(function () {
        var v = Caml_option.null_to_opt(localStorage.getItem("auth-token"));
        if (v !== undefined) {
          return /* LoadedValue */{
                  _0: v
                };
        } else {
          return /* LoadedValue */{
                  _0: undefined
                };
        }
      });
  var setValue = match[1];
  var handleValue = function (value) {
    if (value !== undefined && value !== "") {
      return value;
    }
    
  };
  var handleSet = function (value) {
    if (value !== undefined) {
      Curry._1(setValue, (function (param) {
              return /* LoadedValue */{
                      _0: handleValue(value)
                    };
            }));
      return setItem(key, value);
    }
    
  };
  return [
          match[0],
          handleSet
        ];
}

exports.StoreItems = StoreItems;
exports.LocalStorage = LocalStorage;
exports.useStorage = useStorage;
/* react Not a pure module */
