'use strict';
function processMessage(message, client, Discord) {
  // Please only use this area for non-command responses
  // such as replying to DMs.

  // Other files for processing certain types of messages
  var functions = require("./functions.js")
  functions(message, client, Discord)

  // Process other information here like DMs, or mentions.
  if (message.content.includes("@TigerDyno#3832") || message.content.includes("<@626223136047628308>")) {
    let kv = require("keyv")
    let db = new kv("sqlite://prefixes.db")
    let getPrefix = async function(id, database) {
      var guild_prefix = await database.get(String(id))
      if (guild_prefix) {
        return guild_prefix;
      }
      else {
        return require('./config.json').global_prefix;
      }
    }
    getPrefix(message.guild.id, db).then(prefix => {
       message.channel.send("This is TigerDyno, a WIP bot developed by TigerGold59#8729. Use " + prefix + "info for a more complete description.")
    })
  }
}
module.exports = processMessage
