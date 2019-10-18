'use strict';
/* Function Structure

Key
===
Command phrase to activate command

Value
======
Object
  ||
  \/
Object
------

"function": function with arguments message, client, Discord to
handle the command functionality
"restrictions": object with keys servers, channels, and users
Each (servers, channels, users) has properties blacklist and whitelist
which are an array of IDs that are either restricted or allowed
(respectively) and if whitelisted IDs are listed, default is
blacklisted for all other servers/channels/users. (coming soon)

Please list the description and possible arguments in ./command-manuals.json

*/

async function getPrefix(id, database) {
  var guild_prefix = await database.get(String(id));
  if (guild_prefix) {
    return guild_prefix;
  }
  else {
    return require('./config.json').global_prefix;
  }
}

function is_allowed(restrictions, message) {
  const config = require('./config.json')
  // Process restrictions
  if (restrictions) {
    var is_allowed = true;
    var server_id = String(message.guild.id);
    var channel_id = String(message.channel.id);
    var user_id = String(message.author.id);
    var servers = restrictions["servers"];
    var channels = restrictions["channels"];
    var users = restrictions["users"];
    if (servers) {
      if (servers.blacklist && servers.whitelist) {
        tiger.log("magenta", "Invalid restrictions: servers has a whitelist and blacklist.");
      }
      else if (servers.whitelist) {
        if (!servers.whitelist.includes(server_id)) {
          is_allowed = false;
        }
      }
      else if (servers.blacklist) {
        if (servers.blacklist.includes(server_id)) {
          is_allowed = false;
        }
      }
    }
    if (is_allowed === true && channels) {
      if (channels.blacklist && channels.whitelist) {
        tiger.log("magenta", "Invalid restrictions: channels has a whitelist and blacklist.");
      }
      else if (channels.whitelist) {
        if (!channels.whitelist.includes(channel_id)) {
          is_allowed = false;
        }
      }
      else if (channels.blacklist) {
        if (channels.blacklist.includes(channel_id)) {
          is_allowed = false;
        }
      }
    }
    if (is_allowed === true && users) {
      if (users.blacklist && users.whitelist) {
        tiger.log("magenta", "Invalid restrictions: users has a whitelist and blacklist.");
      }
      else if (users.whitelist) {
        if (!users.whitelist.includes(user_id)) {
          is_allowed = false;
        }
      }
      else if (users.blacklist) {
        if (users.blacklist.includes(user_id)) {
          is_allowed = false;
        }
      }
    }
    // Override all restrictions for admins
    if (config.admins.includes(String(message.author.id))) {
      var is_allowed = true;
    }
    return is_allowed;
  }
  else {
    return true;
  }
}

async function function_parser(message, client, Discord) {

  const tiger = require("tiger-script");

  var commands = {
    "xofakind": {"function": function(message, client, Discord) {
      // Syntax: %xofakind <numberOfDice>
      function dice() {
        return (Math.floor(Math.random() * 6) + 1);
      }
      var parts = message.content.split(' ');
      var num = Number(parts[1]);
      if (num > 11 && !(message.author.id === '424564535030972426')) {
        message.channel.send("Argument " + parts[1] + " is too high a number of dice, it would take hours for the bot to simulate this and millions of years to roll this yourself.");
        return;
      }
      else {
        if (num > 11 && message.author.id === '424564535030972426') {
          message.channel.send("Warning: executive priviledge has overriden the argument restriction. This command may take hours to process and hang the rest of the bot. Please restart the bot if this was not intended.");
        }
      }
      var tries = 0;
      var diceArr = [1];
      var diceNumbers = 0;
      for (var i = 0; i < num - 1; i++) {
        diceArr.push(0);
      }
      for (var bool = false; bool === false; 6 + 6) {
        for (var j = 0; j < num; j++) {
          diceArr[j] = dice();
        }
        var all = diceArr[0];
        var allEqual = false;
        for (var j = 0; j < num; j++) {
          if (!(diceArr[j] === all)) {
            allEqual = false;
            j = num;
          }
          else {
            allEqual = true;
          }
        }
        if (allEqual === false) {
          tries++;
        }
        else {
          bool = true;
          diceNumbers = all;
        }
      }
      message.channel.send("To roll " + num + " dice that all turn up as " + diceNumbers + " took " + (tries + 1) + " tries.");
    }},
    "progressbar": {"function": function(message, client, Discord) {
      // Syntax: %progressbar <name>,<starting percent>,<note>
      function createBar(percent, note) {
        var buffer = "[~";
        var lbuffer = "";
        var spacebuffer = "";
        for (var i = 0; i < percent; i++) {
          lbuffer += "l";
        }
        for (var i = 0; i < (100 - percent); i++) {
          spacebuffer += ":";
        }
        buffer += (lbuffer + spacebuffer + "~] (" + percent + "%), note: " + note);
        return buffer;
      }
      var parts = message.content.split(' ');
      parts.shift();
      parts = parts.join("");
      parts = parts.split(",");
      var name = parts[0];
      var startingpercent = Number(parts[1]);
      var note = parts[2];
      message.channel.send(createBar(startingpercent, note))
        .then(message => tiger.addJSON("./progressbars.json", name, message.id));
    }},
    "info": {"function": function(message, client, Discord) {
      // Syntax: %info
      var config = require("./config.json");
      var kv = require("keyv");
      var db = new kv("sqlite://database.sqlite", {"namespace": "prefixes"});
      getPrefix(message.guild.id, db).then(prefix => {
        message.channel.send("TigerDyno is an in-development project that will have many useful built-in commands and be easily customizable.");
        message.channel.send("Use " + prefix + "commands for a list of commands and their uses.");
      })
    }},
    "rolecount": {"function": function(message, client, Discord) {
      // Syntax: %rolecount
      var roles_array = message.guild.member(message.author).roles.array();
      message.channel.send("Total roles for you: " + String((roles_array.length - 1)));
    }},
    /*"totalroles": function(message, client, Discord) {
    },*/
    "avatarURL": {"function": function(message, client, Discord) {
      // Syntax: %avatarURL
      if (message.author.avatarURL !== null) {
        message.channel.send(message.author.avatarURL);
      }
      else {
        message.channel.send("You have a default avatar.");
      }
    }},
    "username": {"function": function(message, client, Discord) {
      // Syntax: %username
      message.channel.send(message.author.username);
    }},
    "commands": {"function": function(message, client, Discord) {
      var cmd_manual_txt = require("./command-manual-uploader.js")(message.guild.id);
      tiger.uploadToHastebin(cmd_manual_txt, function(url) {
        message.channel.send("Command manual here: " + url);
      })
    }},
    "prefix": {"function": function(message, client, Discord) {
      var kv = require("keyv");
      var db = new kv("sqlite://database.sqlite", {"namespace": "prefixes"});
      var args = message.content.split(" ");
      if (args.length === 1) {
        getPrefix(String(message.guild.id), db).then(prefix => {
          message.channel.send("Prefix for " + message.guild.name +  " is " + prefix + ".");
        })
      }
      else if (args.length === 2) {
        if (!(["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "?", ".", "-", "+", "=", ":"].includes(args[1]))) {
          getPrefix(String(message.guild.id), db).then((prefix) => {
            message.channel.send("Incorrect formatting. Correct usage is either \"" + prefix + "prefix\" for getting the prefix of this server, or \"" + prefix + "prefix <char>\" for setting the prefix of this server.");
          })
        }
        else {
          db.set(String(message.guild.id), args[1]).then(() => {
            message.channel.send("Set prefix for " + message.guild.name + " to " + args[1] + ".");
          })
        }
      }
      else {
        getPrefix(String(message.guild.id), db).then((prefix) => {
          message.channel.send("Incorrect formatting. Correct usage is either \"" + prefix + "prefix\" for getting the prefix of this server, or \"" + prefix + "prefix <char>\" for setting the prefix of this server.");
        })
      }
    }}
  }

  // Read prefix and execute command accordingly

  const fs = require("fs");
  const read = fs.readFile;
  const config = require("./config.json");
  var kv = require("keyv");
  var db = new kv("sqlite://database.sqlite", {"namespace": "prefixes"});

  var prefix = await getPrefix(message.guild.id, db);
  if (message.content.indexOf(prefix) === 0) {
    var command = message.content.split(prefix)[1];
    var cmdname = command.split(" ")[0];
    var cmdobj = commands[cmdname];
    if (cmdobj) {
      if (cmdobj["function"] && is_allowed(cmdobj["restrictions"], message)) {
        commands[cmdname]["function"](message, client, Discord);
        tiger.log("green", "\"" + prefix + command + "\" executed (" + message.id + ")");
        var is_module_cmd = true;
      }
      else if (cmdobj["function"] && !(is_allowed(cmdobj["restrictions"], message))) {
        message.channel.send("This command is restricted here.");
        var is_module_cmd = true;
        tiger.log("magenta", prefix + command + " was attempted and is restricted (" + message.id + ")");
      }
    }
    else {
      var is_module_cmd = false;
    }
  }

  // Read modules
  var modules = config["use"];
  for (let i = 0; i < modules.length; i++) {
    // Get each individual module file and check function
    let active_module_path = "./modules/" + modules[i] + "/main.js";
    let module_obj = require(active_module_path);
    if (!module_obj) {
      continue;
    }
    let keys = Object.keys(module_obj["functions"]);
    // Check if the command run was a command from this active module
    if (module_obj["functions"][cmdname] && is_allowed(module_obj["restrictions"], message)) {
      tiger.log("green", "[Module " + modules[i] + "] \"" + prefix + command + "\" executed (" + message.id + ")");
      module_obj["functions"][cmdname](message, client, Discord, prefix);
      is_module_cmd = true;
    }
    else if (module_obj["functions"][cmdname] && !(is_allowed(module_obj["restrictions"], message))) {
      message.channel.send("This command is restricted here.");
      is_module_cmd = true;
      tiger.log("magenta", "[Module " + modules[i] + "] " + prefix + command + " was attempted and is restricted (" + message.id + ")");
    }
    if (is_module_cmd === false) {
      message.channel.send("Sorry, that is not a recognized command. Please use " + prefix + "commands for a list of commands.");
      tiger.log("red", prefix + command + " is not a command (" + message.id + ")");
    }
  }

}

module.exports = function_parser
