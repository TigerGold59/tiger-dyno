'use strict';
function processMessage(message, client, Discord) {
  // Please only use this area for non-command responses
  // such as replying to DMs.

  // Other files for processing certain types of messages
  var functions = require("./functions.js");
  functions(message, client, Discord);

  // Process other information here like DMs, or mentions.
  if (message.mentions.users.has("626223136047628308")) {
    let kv = require("keyv");
    let db = new kv("sqlite://database.sqlite", {"namespace": "prefixes"});
    let getPrefix = async function(id, database) {
      var guild_prefix = await database.get(String(id));
      if (guild_prefix) {
        return guild_prefix;
      }
      else {
        return require('./config.json').global_prefix;
      }
    }
    if (message.guild !== null) { // If the channel isn't a DM
      getPrefix(message.guild, db).then(prefix => {
         message.channel.send("This is TigerDyno, a WIP bot developed by TigerGold59#8729. Use " + prefix + "info (on this server, global prefix is " + require("./config.json").global_prefix + ") for a more complete description.");
      })
    }
    else {
      message.channel.send("This is TigerDyno, a WIP bot developed by TigerGold59#8729. Use " + require("./config.json").global_prefix + "info for a more complete description, and mention me on a server for my prefix..");
    }
  }
}
module.exports = processMessage
