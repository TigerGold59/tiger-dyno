
function processMessage(message, client, Discord) {
  // Please only use this area for non-command responses
  // such as replying to DMs.

  // Other files for processing certain types of messages
  var functions = require("./functions.js")
  functions(message, client, Discord)

  // Process other information here like DMs.
}
module.exports = processMessage
