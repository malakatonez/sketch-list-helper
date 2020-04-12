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

const itemName = item => "Item " + (item+1)


function getSelectedSymbolMaster() {
  var layers = doc.selectedLayers
  var artboard = context.document.currentPage().currentArtboard()
  if (layers.length != 0 && artboard != null && isSymbolMaster(artboard)) {
    return layers.layers[0]
  }
  return null
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
          master.layers = createList(direction, symbolMaster, value)

          if (direction == DIR_V) {
            master.frame = new Rectangle(0, 0, symbolMaster.frame.width, symbolMaster.frame.height * value)
            master.smartLayout = SmartLayout.TopToBottom
          } else {
            master.frame = new Rectangle(0, 0, symbolMaster.frame.width * value, symbolMaster.frame.height)
            master.smartLayout = SmartLayout.LeftToRight
          }
        }
      }
    )
  } while (!isValidNumber && !exit);
}


export function generateHorizontal() {
  generateFromSymbol(DIR_H)
}


export function generateVertical() {
  generateFromSymbol(DIR_V)
}
