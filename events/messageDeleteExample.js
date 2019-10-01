function createListener(client) {
  return (function(message) {
    // Write code using deleted message object here
    // Example:
    console.log("Message was deleted: \"" + message.content + "\"");
  });
}
module.exports = createListener;
// Then add "messageDeleteExample" to the event_listeners array in config.json.
