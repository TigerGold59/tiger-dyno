"use strict";
import * as fs from "fs";
import * as chalk from "chalk";
import { log_console } from "./log";

const config = require("./config.json") as { [key: string]: any };

// Import the discord.js module
import * as Discord from "discord.js";

// Create an instance of a Discord client
const client = new Discord.Client();

log_console(chalk.bold.cyan("Client created, initializing bot"));

// The token of your bot - https://discordapp.com/developers/applications/me
// Please create a file called token.txt in the main folder and
// the only contents of the file the token string.

const token = require("./token.json")["token"] as string;

client.on("ready", () => {
  log_console(
    chalk.green(`TigerDyno - Ready! Logged in as ${client.user.tag}.`)
  );
  client.removeListener("ready", function () {}); // Don't waste memory listening for a second login
  client.user.setPresence({ game: { name: "@ for server prefix" } });
});

// Parse message
var parse_messages = require("./messages.js");

log_console(chalk.cyan("Loading modules..."));

// Message listener
client.on("message", message => {
  parse_messages(message, client, Discord);
});

client.on("shardError", () => {
  log_console(
    chalk.magenta("Restarting due to a WebSocket connection hiccup.")
  );
  process.exit(0);
});

client.on("shardDisconnect", () => {
  log_console(
    chalk.magenta("Restarting due to a WebSocket connection hiccup.")
  );
  process.exit(0);
});

client.on("shardReconnecting", () => {
  log_console(
    chalk.magenta("Restarting due to a WebSocket connection hiccup.")
  );
  process.exit(0);
});

// Listen and use files for each event, listed in config
for (const listener_name of config.event_listeners) {
  // Call module.exports from each file which constructs a listening function
  let listener = require("./events/" + listener_name + ".js")(client);
  // Listen for each event with its listening function
  client.on(listener_name, listener);
}

// Log the bot in
client.login(token);

process.on("unhandledRejection", error => {
  console.error("Unhandled promise rejection: ", error);
});

process.on("disconnect", () => {
  process.exit();
});
