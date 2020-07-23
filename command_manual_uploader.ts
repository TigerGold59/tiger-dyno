"use strict";

export const make_manual = function () {
  const config = require("./config.json") as { [key: string]: any };

  // Get all modules
  var modules = config["use"] as string[];
  var module_manuals = [];
  // Get native function manuals located in command_manuals.json
  var manuals_object = require("./command_manuals.json");
  // Add all manual objects to module_manuals
  for (const module of modules) {
    let manual = require(`./modules/${module}/main.js`)["cmd_manual"];
    module_manuals.push(manual);
  }
  // Merge all manuals into one object
  while (module_manuals.length > 0) {
    Object.assign(manuals_object, module_manuals[module_manuals.length - 1]);
    module_manuals = module_manuals.pop();
  }
  // Construct text buffer based on that one object
  var text_buffer =
    "TigerDyno Command List\r\n======================\r\n\r\nGlobal Prefix: % (use individual server prefix on that server, mention bot to learn server prefix)\r\n\r\n";
  var names = Object.keys(manuals_object);
  var prefix = config.global_prefix;
  for (var i = 0; i < names.length; i++) {
    text_buffer += prefix + names[i] + ": ";
    text_buffer += manuals_object[names[i]] + "\r\n\r\n";
  }
  return text_buffer;
};
