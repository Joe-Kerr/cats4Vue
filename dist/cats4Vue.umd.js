(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cats4Vue"] = factory();
	else
		root["cats4Vue"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./projects/common/cats4Vue/src/index.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
Eg:
const defs = {
	prop: {
		type: "string", default: "NS", required: true
	}
};
*/
function configParser() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var result = {};

  for (var name in defaults) {
    var defProp = defaults[name];
    var actualProp = config[name];
    var defType = defProp.type;

    var actualType = _typeof(actualProp);

    var isRequired = defProp.required;
    var isProvided = name in config;

    if (typeof defType === "undefined") {
      throw new Error("type property on default is missing");
    }

    if (isRequired && !isProvided) {
      throw new Error("Config property '" + name + "' is required but not provided.");
    }

    if (isProvided && defType !== null && actualType !== defType) {
      throw new Error("Config property '" + name + "' must be of type '" + defType + "' but is of type '" + actualType + "'.");
    }

    result[name] = isProvided ? actualProp : defProp.default;
  }

  var mismatch = [];

  for (var _name in config) {
    if (!(_name in defaults)) {
      mismatch.push(_name);
    }
  }

  if (mismatch.length > 0) {
    console.warn("The following config property was / properties were provided for which no defaults exist: " + mismatch.toString());
  }

  return result;
} //https://vuejs.org/v2/style-guide/#Private-property-names-essential

function isValidPrivateProperty(prop) {
  return prop[0] === "$" && prop[1] === "_" && prop.substring(2).indexOf("_") > -1;
}
function componentOptionsWriter(component, componentOptions) {
  for (var name in componentOptions) {
    if (name in component) {
      throw new Error("Tried to write property on component that already exists: " + name);
    }

    if (!isValidPrivateProperty(name)) {
      throw new Error("Private property names should be in the form of: $_namespace_propertyName. This is important especially for plugins in order to avoid name collisions. See also https://vuejs.org/v2/style-guide/#Private-property-names-essential");
    }

    component[name] = componentOptions[name];
  }
}
function renameComponent(component, name) {
  if (typeof name !== "string") {
    throw new Error("'name' parameter must be of type string. Got: " + _typeof(name));
  }

  if (_typeof(component) !== "object" || !("name" in component)) {
    throw new Error("'component' parameter must be an object with the property name.");
  }

  component.name = name;
}
function registerVuexModule(vuex, namespace, vuexModule) {
  if (typeof namespace !== "string") {
    throw new Error("namespace parameter must be of type string.");
  }

  if (_typeof(vuexModule) !== "object") {
    throw new Error("module parameter must be of type object.");
  }

  var haveAtLeastOne = ["state", "getters", "mutations", "actions", "modules"];
  var hasHowMany = 0;
  haveAtLeastOne.forEach(function (prop) {
    if (vuexModule.hasOwnProperty(prop)) {
      hasHowMany++;
    }
  });

  if (hasHowMany === 0) {
    throw new Error("Vuex module is of unexpected structure. Expected to see at least one of: " + haveAtLeastOne.toString(","));
  }

  if (typeof vuex === "undefined" || typeof vuex.dispatch === "undefined") {
    throw new Error("Plugin ".concat(namespace, " requires vuex instance as config parameter: Vue.use(").concat(namespace, ", {vuex: instanceOfVuex})."));
  }

  vuex.registerModule(namespace, vuexModule);
}
var cats4Vue = {
  configParser: configParser,
  isValidPrivateProperty: isValidPrivateProperty,
  componentOptionsWriter: componentOptionsWriter,
  renameComponent: renameComponent,
  registerVuexModule: registerVuexModule
};
/* harmony default export */ var src = (cats4Vue);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport configParser */__webpack_require__.d(__webpack_exports__, "configParser", function() { return configParser; });
/* concated harmony reexport isValidPrivateProperty */__webpack_require__.d(__webpack_exports__, "isValidPrivateProperty", function() { return isValidPrivateProperty; });
/* concated harmony reexport componentOptionsWriter */__webpack_require__.d(__webpack_exports__, "componentOptionsWriter", function() { return componentOptionsWriter; });
/* concated harmony reexport renameComponent */__webpack_require__.d(__webpack_exports__, "renameComponent", function() { return renameComponent; });
/* concated harmony reexport registerVuexModule */__webpack_require__.d(__webpack_exports__, "registerVuexModule", function() { return registerVuexModule; });
/* concated harmony reexport cats4Vue */__webpack_require__.d(__webpack_exports__, "cats4Vue", function() { return cats4Vue; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });
});