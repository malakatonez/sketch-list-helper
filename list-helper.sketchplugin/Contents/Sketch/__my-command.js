var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: generateHorizontal, generateVertical, reduceListTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateHorizontal", function() { return generateHorizontal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateVertical", function() { return generateVertical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduceListTo", function() { return reduceListTo; });
var sketch = __webpack_require__(/*! sketch */ "sketch");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var SymbolMaster = __webpack_require__(/*! sketch/dom */ "sketch/dom").SymbolMaster;

var SymbolInstance = __webpack_require__(/*! sketch/dom */ "sketch/dom").SymbolInstance;

var Rectangle = __webpack_require__(/*! sketch/dom */ "sketch/dom").Rectangle;

var SmartLayout = __webpack_require__(/*! sketch */ "sketch").SmartLayout;

var doc = sketch.Document.getSelectedDocument();
var symbolsPage = sketch.Page.getSymbolsPage(doc);
var DIR_V = 1;
var DIR_H = 2;

var isSymbolMaster = function isSymbolMaster(layer) {
  return layer.class() == 'MSSymbolMaster';
};

var isSymbolInstace = function isSymbolInstace(layer) {
  return layer.class() == 'MSSymbolInstance';
};

var isRootElement = function isRootElement(element) {
  return element != null && element.id.search('/') == -1;
};

var itemName = function itemName(item) {
  return "Item " + (item + 1);
}; //TODO: Control number of selected layers


function getSelectedSymbolMaster() {
  var selectedLayers = doc.selectedLayers;
  var selectedObject = context.selection.firstObject();

  if (selectedLayers.length != 0 && selectedObject != null && isSymbolMaster(selectedObject)) {
    return selectedLayers.layers[0];
  }

  return null;
} //TODO: Control number of selected layers


function getSelectedSymbolInstance() {
  var selectedLayers = doc.selectedLayers;
  var selectedObject = context.selection.firstObject();

  if (selectedLayers.length != 0 && selectedObject != null && isSymbolInstace(selectedObject)) {
    return selectedLayers.layers[0];
  }

  return null;
}

function createList(direction, symbolMaster, items) {
  var _width, _height;

  if (direction == DIR_V) {
    _width = 0;
    _height = symbolMaster.frame.height;
  } else {
    _width = symbolMaster.frame.width;
    _height = 0;
  }

  var instances = new Array();

  for (var item = 0; item < items; item++) {
    var currentSymbol = symbolMaster.createNewInstance();
    currentSymbol.frame.x = item * _width;
    currentSymbol.frame.y = item * _height;
    currentSymbol.name = itemName(item);
    instances.push(currentSymbol);
  }

  return instances.reverse();
}

function generateFromSymbol(direction) {
  var symbolMaster = getSelectedSymbolMaster();

  if (symbolMaster == null) {
    UI.message("Please select a symbol");
    return;
  }

  if (!symbolsPage) {
    symbolsPage = sketch.Page.createSymbolsPage();
    symbolsPage.parent = context.document;
  }

  var isValidNumber = false,
      exit = false;

  do {
    UI.getInputFromUser("Number of items for the list", {}, function (err, value) {
      if (err) {
        exit = true;
      } else if (value == null || isNaN(value) || value <= 0) {
        UI.message('Value must be a number');
      } else {
        isValidNumber = true;
        var master = new SymbolMaster({
          name: "List from " + symbolMaster.name
        });
        master.parent = symbolsPage;

        if (direction == DIR_V) {
          master.frame = new Rectangle(0, 0, symbolMaster.frame.width, symbolMaster.frame.height * value);
          master.smartLayout = SmartLayout.TopToBottom;
        } else {
          master.frame = new Rectangle(0, 0, symbolMaster.frame.width * value, symbolMaster.frame.height);
          master.smartLayout = SmartLayout.LeftToRight;
        }

        master.layers = createList(direction, symbolMaster, value);
      }
    });
  } while (!isValidNumber && !exit);
}

function hideLastElements(instance, numberToHide) {
  if (instance == null || numberToHide <= 0) {
    return;
  }

  var hidden = 0;
  var overrides = instance.overrides;
  var length = overrides.length;

  for (var item = length - 1; item >= 0 && hidden != numberToHide; item--) {
    var currentElement = overrides[item];

    if (isRootElement(currentElement)) {
      instance.setOverrideValue(currentElement, '');
      hidden++;
    }
  }
}

function countRoot(instance) {
  if (instance == null) {
    return;
  }

  var count = 0;
  var overrides = instance.overrides;

  for (var i = 0; i < overrides.length; i++) {
    var currentElement = overrides[i];

    if (isRootElement(currentElement)) {
      count++;
    }
  }

  return count;
} // EXPORT METHODS


function generateHorizontal() {
  generateFromSymbol(DIR_H);
}
function generateVertical() {
  generateFromSymbol(DIR_V);
} //TODO Comprobar que es una lista de elementos (mirando el id de los root)
//TODO Comprobar que count es mayor que 1

function reduceListTo() {
  var instance = getSelectedSymbolInstance();

  if (instance == null) {
    return;
  }

  var rootElements = countRoot(instance);
  var isValidNumber = false,
      exit = false;

  do {
    UI.getInputFromUser("Number of elements to keep:", {}, function (err, value) {
      if (err) {
        exit = true;
      } else if (value == null || isNaN(value) || value <= 0) {
        UI.message('Value must be a number greater than zero');
      } else if (value >= rootElements) {
        UI.message('Value must be less than ' + rootElements + '(elements on the list)');
      } else {
        isValidNumber = true;
        hideLastElements(instance, rootElements - value);
        instance.resizeWithSmartLayout();
      }
    });
  } while (!isValidNumber && !exit);
} //Unused mehtod
// export function hideListElements() {
//   var instance = getSelectedSymbolInstance()
//   if (instance == null) {
//     return
//   }
//
//   var isValidNumber = false,
//     exit = false;
//   do {
//     UI.getInputFromUser(
//       "How many items do you want to hide?", {},
//       (err, value) => {
//         if (err) {
//           exit = true
//         } else if (value == null || isNaN(value) || value <= 0) {
//           UI.message('Value must be a number greater than zero')
//         } else {
//           isValidNumber = true
//           hideLastElements(instance, value)
//           //Hay que comprobar que no sean más que los que tiene la instancia??
//           instance.resizeWithSmartLayout()
//         }
//       }
//     )
//   } while (!isValidNumber && !exit);
// }
//TODO: AÑADIR CONTROLES DE ERROR
// function getSelectedLayer() {
//   var layers = doc.selectedLayers
//   if (layers.length == 1) {
//     return layers.layers[0]
//   } else {
//     UI.message("Please select only one symbol")
//   }
// }

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['generateVertical'] = __skpm_run.bind(this, 'generateVertical');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['generateHorizontal'] = __skpm_run.bind(this, 'generateHorizontal');
globalThis['reduceListTo'] = __skpm_run.bind(this, 'reduceListTo')

//# sourceMappingURL=__my-command.js.map