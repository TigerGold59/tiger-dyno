'use strict';
const tiger = require("tiger-script");
const fs = require("fs");
const chalk = require("chalk");
const config = require("./config.json");

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

tiger.log("none", chalk.bold.cyan("Client created, initializing bot"));
// The token of your bot - https://discordapp.com/developers/applications/me
// Please create a file called token.txt in the main folder and
// the only contents of the file the token string.
const token = require("./token.json")['token'];

client.on('ready', () => {
  tiger.log('green', `TigerDyno - Ready! Logged in as ${client.user.tag}.`);
  client.removeListener('ready', function(){}); // Don't waste memory listening for a second login
  client.user.setPresence({"game": {"name": "@ for server prefix"}})
});
// Parse message
var parse_messages = require("./messages.js");

tiger.log("none", chalk.cyan("Loading modules..."));

// Message listener
client.on('message', message => {
    parse_messages(message, client, Discord);
});

// Listen and use files for each event, listed in config
for (var i = 0; i < config.event_listeners.length; i++) {
  // Call module.exports from each file which constructs a listening function
  let listener = require("./events/" + config.event_listeners[i] + ".js")(client);
  // Listen for each event with its listening function
  client.on(config.event_listeners[i], listener);
}

// Log the bot in
client.login(token);

process.on("unhandledRejection", error => {
    console.error("Unhandled promise rejection: ", error);
});

process.on("disconnect", () => {
  process.exit()
})
