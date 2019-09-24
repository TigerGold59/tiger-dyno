function functionparser(message, client, Discord) {
  //

  tiger = require("tiger-script")

  var commands = {
    /*"givems": function(message, client, Discord) {
    // Syntax: %givems <usertag> <amount>
      file = require("./m.json")
      if (message.author.id == "424564535030972426") {
        parts = message.content.split(' ')
        var name = parts[1]
        var points = parts[2]
        if (!file[name]) {
          tiger.addJSON("./m.json", name, 0)
        }
        tiger.addJSON("./m.json", name, file[name] + Number(points))
        message.channel.send("Fine")
      }
      else {
        message.channel.send("You do not have the big permission")
      }
    },*/
    "xofakind": function(message, client, Discord) {
      // Syntax: %xofakind <numberOfDice>
      function dice() {
        return (Math.floor(Math.random() * 6) + 1)
      }
      parts = message.content.split(' ')
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
    },
    "progressbar": function(message, client, Discord) {
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
      parts = message.content.split(' ')
      parts.shift()
      parts = parts.join("")
      parts = parts.split(",")
      var name = parts[0]
      var startingpercent = Number(parts[1])
      var note = parts[2]
      message.channel.send(createBar(startingpercent, note))
        .then(message => tiger.addJSON("./progressbars.json", name, message.id))
    },
    "progressbaredit": function(message, client, Discord) {
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
    },
    "info": function(message, client, Discord) {
      // Syntax: %info
      message.channel.send("Hi! I'm TigerGold59's bot. I moderate and sometimes do cool stuff like games. Say '%commands' for commands. Oh also if you type in backwards text I'll translate it.")
    },
    "rolecount": function(message, client, Discord) {
      // Syntax: %rolecount
      var roles_array = message.guild.member(message.author).roles.array()
      message.channel.send("Total roles for you (including non-jump-roles): " + String((roles_array.length - 1)))
    },
    "totalroles": function(message, client, Discord) {
      // Syntax: %totalroles
      if ((message.guild.id === "469869605570084886") === false) {
        message.channel.send("This command is not available in this server. Here's the invite to the server you can use this in: https://discord.gg/WYVZZF4")
        return;
      }
      function handleUser(user, message, client, Discord) {
        var roles_array = message.guild.member(user).roles.array()
        message.channel.send("Total number of jump roles: " + (roles_array.length - 7) + " (remember to give YAGPDB new jump roles to keep this count accurate)")
      }
      client.fetchUser('204255221017214977').then(user => handleUser(user, message, client, Discord))
    },
    "avatarURL": function(message, client, Discord) {
      // Syntax: %avatarURL
      if (message.author.avatarURL !== null) {
        message.channel.send(message.author.avatarURL)
      }
      else {
        message.channel.send("You have a default avatar.")
      }
    },
    "username": function(message, client, Discord) {
      // Syntax: %username
      message.channel.send(message.author.username)
    }
  }

  //


  if (message.content.indexOf("%") === 0) {
    var command = message.content.split("%")[1]
    var cmdname1 = command.split(" ")
    var cmdname = cmdname1[0]
    if (commands[cmdname]) {
      commands[cmdname](message, client, Discord)
      tiger.log("green", "%" + command + " executed")
    }
    else {
      tiger.log("green", "%" + command + " is not a command")
    }
  }
}

module.exports = functionparser
