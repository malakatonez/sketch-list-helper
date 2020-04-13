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

const itemName = item => "Item " + (item + 1)


function getSelectedSymbolMaster() {
  var selectedLayers = doc.selectedLayers
  var selectedObject = context.selection.firstObject();
  if (selectedLayers.length != 0 && selectedObject != null && isSymbolMaster(selectedObject)) {
    return selectedLayers.layers[0]
  }
  return null
}

function getSelectedSymbolInstance() {
  var selectedLayers = doc.selectedLayers
  var selectedObject = context.selection.firstObject();
  if (selectedLayers.length != 0 && selectedObject != null && isSymbolInstace(selectedObject)) {
    return selectedLayers.layers[0]
  }
  return null
}


//TODO: AÑADIR CONTROLES DE ERROR
function getSelectedLayer() {
  var layers = doc.selectedLayers
  if (layers.length == 1) {
    return layers.layers[0]
  } else {
    UI.message("Please select only one symbol")
  }
}


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



function hideLastElements (elements, numberToHide) {
  if (elements == null || numberToHide <= 0) {
    return
  }

  // var hidden = 0

  var reverseElements = elements.reverse()
  for (var item = 0; item < 3; item++) {
    var currentElement = reverseElements[item]

    if (currentElement.id.search('/') == -1) { //rootSymbol
      currentElement.value = "null"
    }
  }
}


// EXPORT METHODS
export function generateHorizontal() {
  generateFromSymbol(DIR_H)
}


export function generateVertical() {
  generateFromSymbol(DIR_V)
}

export function hideListElements() {
  var instance = getSelectedSymbolInstance()
  if (instance == null) {
    return
  }

//PRUEBA CON 3 (elimina solo el ultimo)
  hideLastElements(instance.overrides, 3)
  instance.resizeWithSmartLayout()
  
}
