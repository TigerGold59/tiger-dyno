
tiger = require("tiger-script")
fs = require("fs")

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
// Please create a file called token.txt in the main folder and 
// the only contents of the file the token string.
const token = fs.readFileSync("./token.txt", 'utf8');

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  tiger.log('green', `Tiger\'s Sceptile - Ready! Logged in as ${client.user.tag}.`);
});

// Parse message
var parse_messages = require("./messages.js")

client.on('message', message => {
    parse_messages(message, client, Discord)
});

// Log our bot in
client.login(token);
