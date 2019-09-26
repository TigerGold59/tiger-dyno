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

function function_parser(message, client, Discord) {

  const tiger = require("tiger-script")

  var commands = {
    "xofakind": {"function": function(message, client, Discord) {
      // Syntax: %xofakind <numberOfDice>
      function dice() {
        return (Math.floor(Math.random() * 6) + 1)
      }
      var parts = message.content.split(' ')
      var num = Number(parts[1])
      if (num > 11 && !(message.author.id === '424564535030972426')) {
        message.channel.send("Argument " + parts[1] + " is too high a number of dice, it would take hours for the bot to simulate this and millions of years to roll this yourself.")
        return;
      }
      else {
        if (num > 11 && message.author.id === '424564535030972426') {
          message.channel.send("Warning: executive priviledge has overriden the argument restriction. This command may take hours to process and hang the rest of the bot. Please restart the bot if this was not intended.")
        }
      }
      var tries = 0;
      var diceArr = [1]
      var diceNumbers = 0;
      for (var i = 0; i < num - 1; i++) {
        diceArr.push(0)
      }
      for (var bool = false; bool === false; 6 + 6) {
        for (var j = 0; j < num; j++) {
          diceArr[j] = dice()
        }
        var all = diceArr[0]
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
          diceNumbers = all
        }
      }
      message.channel.send("To roll " + num + " dice that all turn up as " + diceNumbers + " took " + (tries + 1) + " tries.")
    }},
    "progressbar": {"function": function(message, client, Discord) {
      // Syntax: %progressbar <name>,<starting percent>,<note>
      function createBar(percent, note) {
        var buffer = "[~"
        var lbuffer = ""
        var spacebuffer = ""
        for (var i = 0; i < percent; i++) {
          lbuffer += "l"
        }
        for (var i = 0; i < (100 - percent); i++) {
          spacebuffer += ":"
        }
        buffer += (lbuffer + spacebuffer + "~] (" + percent + "%), note: " + note)
        return buffer;
      }
      var parts = message.content.split(' ')
      parts.shift()
      parts = parts.join("")
      parts = parts.split(",")
      var name = parts[0]
      var startingpercent = Number(parts[1])
      var note = parts[2]
      message.channel.send(createBar(startingpercent, note))
        .then(message => tiger.addJSON("./progressbars.json", name, message.id))
    }},
    "progressbaredit": {"function": function(message, client, Discord) {
      // Syntax: %proressbaredit <name,<new percent>,<note>
      function createBar(percent, note) {
        var buffer = "[~"
        var lbuffer = ""
        var spacebuffer = ""
        for (var i = 0; i < percent; i++) {
          lbuffer += "l"
        }
        for (var i = 0; i < (100 - percent); i++) {
          spacebuffer += ":"
        }
        buffer += (lbuffer + spacebuffer + "~] (" + percent + "%), note: " + note)
        return buffer;
      }
      var parts = message.content.split(' ')
      parts.shift()
      parts = parts.join("")
      parts = parts.split(",")
      var name = parts[0]
      var percent = parts[1]
      var note = parts[2]
      var progressbar = createBar(percent, note)
      var messageID = String(require("./progressbars.json")[name])
      message.channel.fetchMessage(messageID).then(bar => bar.edit(progressbar))
      console.log("Progress bar edited successfully")
    }},
    "info": {"function": function(message, client, Discord) {
      // Syntax: %info
      message.channel.send("Hi! I'm TigerGold59's bot. I moderate and sometimes do cool stuff like games. Say '%commands' for commands. Oh also if you type in backwards text I'll translate it.")
    }},
    "rolecount": {"function": function(message, client, Discord) {
      // Syntax: %rolecount
      var roles_array = message.guild.member(message.author).roles.array()
      message.channel.send("Total roles for you (including non-jump-roles): " + String((roles_array.length - 1)))
    }},
    /*"totalroles": function(message, client, Discord) {
    },*/
    "avatarURL": {"function": function(message, client, Discord) {
      // Syntax: %avatarURL
      if (message.author.avatarURL !== null) {
        message.channel.send(message.author.avatarURL)
      }
      else {
        message.channel.send("You have a default avatar.")
      }
    }},
    "username": {"function": function(message, client, Discord) {
      // Syntax: %username
      message.channel.send(message.author.username)
    }},
    "postlogs"; {"function": function(message, client, Discord) {
      'In development';
    }}
  }

  // Read prefix and execute command accordingly

  const fs = require("fs")
  const read = fs.readFile

  read("./config.json", 'utf8', function(err, prefix) {
    if (message.content.indexOf(prefix) === 0) {
      var command = message.content.split(prefix)[1]
      var cmdname = command.split(" ")[0]
      var cmdobj = command[cmdname]
      if (cmdobj["function"]) {
        commands[cmdname]["function"](message, client, Discord)
        tiger.log("green", prefix + command + " executed (" + message.id + ")")
      }
      else {
        tiger.log("red", prefix + command + " is not a command")
      }
    }
  })
}

module.exports = function_parser
