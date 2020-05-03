# List Helper for Sketch

This plugin allows you to save time generating and reducing lists. For the moment, it has two features:
- Generate horizontal or vertical list in a symbol from another symbol
- Reduce an instance number of elements to N elements

## Installation

- [Download](https://github.com/malakatonez/sketch-list-helper/archive/master.zip) the latest release of the plugin
- Un-zip
- Double-click on list-helper.sketchplugin

## How to use it

### List generation from item symbol
Create an symbol with your item list. Select Plugins > List Helper > Generate and choose direction. List Helper requires number of elements, creates a new symbol with the list and applies SmartLayout.
You can create instances of the list symbol and reduce the number of elements with the reduction feature (enlace a esa sección)

![](https://github.com/malakatonez/sketch-list-helper/blob/master/assets/generate_vertical.gif?raw=true)
![](https://github.com/malakatonez/sketch-list-helper/blob/master/assets/generate_horizontal.gif?raw=true)

### List reduction to N elements
This feature allows you to hide some items at the same time in an instance that contains a list. They aren't removed from the master symbol, you can show them again on the right toolbar.
Select Plugins > List Helper > Reduce to... and insert the number of elements you want to see on the list. List Helper will hide the rest.

![](https://github.com/malakatonez/sketch-list-helper/blob/master/assets/reduceto_full.gif?raw=true)

## Roadmap & Ideas

List Helper is one of my side projects and I would like to maintain and add new features. Some of my ideas for the future:
- Keyboard shortcuts
- Edit symbol name when creating
- Symbol generation in any page (not only symbols page)
- Integration with Runner
- Change number of visible elements (showing previously hidden)
- JSON data load

If you have an idea to improve List Helper and you know how to develop feel free for opening a PR.
Say hi or help me with new ideas on [twitter](https://twitter.com/malakatonez) or by [mail](mailto:hola@luciagomez.me) :)
