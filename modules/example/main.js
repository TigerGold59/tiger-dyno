"use strict";
const module_obj = {
  "restrictions": {
    "channels": {
      "blacklist": "542766712785862670" // ID of the General channel in my test server
    }
  },
  "functions": {
    "example": function(message, client, Discord) {
      message.channel.send("This is an example bot function/command")
    }
}
module.exports = module_obj;
