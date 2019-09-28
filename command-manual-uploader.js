'use strict';
function get_text() {
  const config = require("./config.json")

  // Get all modules
  var modules = config["use"]
  var module_manuals = []
  // Get native function manuals located in command-manuals.json
  var manuals_object = require("./command-manuals.json")
  // Add all manual objects to module_manuals
  for (var i = 0; i < modules.length; i++) {
    let manual = require("./modules/" + modules[i] + "/main.js")["cmd_manual"]
    module_manuals.push(manual)
  }
  // Merge all manuals into one object
  while (module_manuals.length > 0) {
    Object.assign(manuals_object, module_manuals[module_manuals.length - 1])
    module_manuals = module_manuals.pop()
  }
  // Construct text buffer based on that one object
  var text_buffer = "TigerDyno Command List\r\n======================\r\n\r\n"
  var names = Object.keys(manuals_object)
  for (var i = 0; i < names.length; i++) {
    text_buffer += config.prefix + names[i] + ": "
    text_buffer += manuals_object[names[i]] + "\r\n"
  }
  return text_buffer;
}
module.exports = get_text
