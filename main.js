
tiger = require("tiger-script")

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = '<insert token here>';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  tiger.log('green', `Tiger\'s Sceptile - Ready! Logged in as ${client.user.tag}.`);
});

client.on('guildMemberAdd', member => {
  ruleser = member.guild.channels.find('name', 'rules')
  /*if (member.guild.id === "469869605570084886") {
    ruleser = member.guild.channels.find('name', 'welcome')
    channel = member.guild.channels.find('name', 'general')
    channel.send(`Welcome to the server, ${member}. Please read ${ruleser}.`);
  }*/
  if (!(member.guild.id === "469869605570084886")) {
    channel = member.guild.channels.find('name', 'general')
    channel.send(`Welcome to the server, ${member}. Please read the ${ruleser}.`);
  }
  if (member.guild.id === "469869605570084886") {
    var userRegex = /[A-Z][a-z]+[0-9]+#[0-9]{4}/
    if (userRegex.test(member.user.tag) === true) {
      var userAvatar = member.avatarURL
      if (member.avatarURL == null) {
        var trickjumping = client.guilds.find("id", '469869605570084886')
        var general = trickjumping.channels.find("name", "mod-commands")
        var role = trickjumping.roles.find("name", "BotBusters").id
        content = `<@&${role}>`
        general.send(content + ", a suspected bot user has joined the server (" + member.user.tag + "). Please look into it and ban it if it appears it is a self-bot.")
      }
    }
  }
});

client.on('guildMemberUpdate', function(oldMember, newMember){
  var object = [oldMember, newMember]
  require("./process-member-updates.js")(object, client, Discord)
})

/*
client.on('emojiCreate', emoji => {
  if (emoji.guild.id === '446921997658750976') {
    emoji.guild.channels.find('name','news').send("A new emoji has been added!!! :grin: Here it is: <:" + emoji.name + ":" + emoji.id + ">")
  }
})
*/

// Parse message
var parse_messages = require("./messages.js")

client.on('message', message => {
    parse_messages(message, client, Discord)
});

// Log our bot in
client.login(token);
