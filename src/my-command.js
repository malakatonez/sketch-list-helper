const sketch = require('sketch')
const UI = require('sketch/ui')
const SymbolMaster = require('sketch/dom').SymbolMaster
const SymbolInstance = require('sketch/dom').SymbolInstance
const Rectangle = require('sketch/dom').Rectangle
const SmartLayout = require('sketch').SmartLayout

const doc = sketch.Document.getSelectedDocument()
var symbolsPage = sketch.Page.getSymbolsPage(doc)

const DIR_V = 1
const DIR_H = 2

const isSymbolMaster = layer => layer.class() == 'MSSymbolMaster'
const isSymbolInstace = layer => layer.class() == 'MSSymbolInstance'
const isRootElement = element => element != null && element.id.search('/') == -1

const itemName = item => "Item " + (item + 1)

//TODO: Control number of selected layers
function getSelectedSymbolMaster() {
  var selectedLayers = doc.selectedLayers
  var selectedObject = context.selection.firstObject();
  if (selectedLayers.length != 0 && selectedObject != null && isSymbolMaster(selectedObject)) {
    return selectedLayers.layers[0]
  }
  return null
}

//TODO: Control number of selected layers
function getSelectedSymbolInstance() {
  var selectedLayers = doc.selectedLayers
  var selectedObject = context.selection.firstObject();
  if (selectedLayers.length != 0 && selectedObject != null && isSymbolInstace(selectedObject)) {
    return selectedLayers.layers[0]
  }
  return null
}


//TODO: AÑADIR CONTROLES DE ERROR
// function getSelectedLayer() {
//   var layers = doc.selectedLayers
//   if (layers.length == 1) {
//     return layers.layers[0]
//   } else {
//     UI.message("Please select only one symbol")
//   }
// }


function createList(direction, symbolMaster, items) {
  var _width, _height
  if (direction == DIR_V) {
    _width = 0
    _height = symbolMaster.frame.height
  } else {
    _width = symbolMaster.frame.width
    _height = 0
  }

  var instances = new Array()
  for (var item = 0; item < items; item++) {
    var currentSymbol = symbolMaster.createNewInstance()
    currentSymbol.frame.x = item * _width
    currentSymbol.frame.y = item * _height
    currentSymbol.name = itemName(item)
    instances.push(currentSymbol)
  }
  return instances.reverse()
}


function generateFromSymbol(direction) {
  const symbolMaster = getSelectedSymbolMaster()
  if (symbolMaster == null) {
    UI.message("Please select a symbol")
    return
  }
  if (!symbolsPage) {
    symbolsPage = sketch.Page.createSymbolsPage()
    symbolsPage.parent = context.document
  }

  var isValidNumber = false,
    exit = false;
  do {
    UI.getInputFromUser(
      "Number of items for the list", {},
      (err, value) => {
        if (err) {
          exit = true
        } else if (value == null || isNaN(value) || value <= 0) {
          UI.message('Value must be a number')
        } else {
          isValidNumber = true

          var master = new SymbolMaster({
            name: "List from " + symbolMaster.name
          })
          master.parent = symbolsPage

          if (direction == DIR_V) {
            master.frame = new Rectangle(0, 0, symbolMaster.frame.width, symbolMaster.frame.height * value)
            master.smartLayout = SmartLayout.TopToBottom
          } else {
            master.frame = new Rectangle(0, 0, symbolMaster.frame.width * value, symbolMaster.frame.height)
            master.smartLayout = SmartLayout.LeftToRight
          }

          master.layers = createList(direction, symbolMaster, value)
        }
      }
    )
  } while (!isValidNumber && !exit);
}



function hideLastElements (instance, numberToHide) {
  if (instance == null || numberToHide <= 0) {
    return
  }

  var hidden = 0
  var overrides = instance.overrides
  var length = overrides.length

  for (var item = length-1; item>=0 && hidden!=numberToHide; item--) {
      var currentElement = overrides[item]
      // if (currentElement.id.search('/') == -1) { //rootSymbol
      if (isRootElement(currentElement)) {
        instance.setOverrideValue(currentElement, '')
        hidden++
      }
  }
}

function countRoot (instance) {
  if (instance == null) {
    return
  }

  var count = 0
  var overrides = instance.overrides
  for (var i=0; i<overrides.length; i++) {
    var currentElement = overrides[i]
    if (isRootElement(currentElement)) {
      count++
    }
  }
  return count
}


// EXPORT METHODS
export function generateHorizontal() {
  generateFromSymbol(DIR_H)
}


export function generateVertical() {
  generateFromSymbol(DIR_V)
}

//TODO Comprobar que es una lista de elementos (mirando el id de los root)
//TODO Comprobar que count es mayor que 1
export function reduceListTo() {
  var instance = getSelectedSymbolInstance()
  if (instance == null) {
    return
  }

  var rootElements = countRoot(instance)

  var isValidNumber = false,
    exit = false;
  do {
    UI.getInputFromUser(
      "Number of elements to keep:", {},
      (err, value) => {
        if (err) {
          exit = true
        } else if (value == null || isNaN(value) || value <= 0) {
          UI.message('Value must be a number greater than zero')
        } else if (value >= rootElements) {
          UI.message('Value must be less than ' + rootElements + '(elements on the list)')
        } else {
          isValidNumber = true
          hideLastElements(instance, rootElements-value)
          instance.resizeWithSmartLayout()
        }
      }
    )
  } while (!isValidNumber && !exit);
}

//Unused mehtod
export function hideListElements() {
  var instance = getSelectedSymbolInstance()
  if (instance == null) {
    return
  }

  var isValidNumber = false,
    exit = false;
  do {
    UI.getInputFromUser(
      "How many items do you want to hide?", {},
      (err, value) => {
        if (err) {
          exit = true
        } else if (value == null || isNaN(value) || value <= 0) {
          UI.message('Value must be a number greater than zero')
        } else {
          isValidNumber = true
          hideLastElements(instance, value)
          //Hay que comprobar que no sean más que los que tiene la instancia??
          instance.resizeWithSmartLayout()
        }
      }
    )
  } while (!isValidNumber && !exit);
}
