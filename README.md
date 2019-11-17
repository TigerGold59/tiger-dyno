# tiger-discord-dyno
 Flexible bot for Discord, easily customizable and functional
## How to use
**For if you are going to fork this bot, do NOT
run this exact code as a separate bot, just DM me on Discord @ TigerGold59#8729 and I will let you invite it to your server**

Go to [Discord dev portal](https.discordapp.com/developers/applications/) and create your application. Then, go to the 'Bot' tab and add a bot user. Click to reveal your token.

Then, download the latest version of node.js and NPM, and (in this cloned folder) run `npm install`. Once that is done, create a file in this folder called  `token.json` and put the only contents of the file as the JSON for an object with the property token that is a string that contains your token, like this:
```
{"token": "<your-token-here"}
```
If your version of the bot still uses command manuals, you will need to create a file in the main directory called `paste-api-token.json` that contains the token to your paste.ee account API. Use the same formatting as above, however obviously make the token your paste.ee API token.

Finally, run `node main.js` in this cloned folder. Your bot should be online, as long as your forked code works.

## 'restrictions' object format
restrictions: an object that qualifies whether or not an action can be performed (running a command, for example) based on the server, channel, and user that's using it. The restrictions object can contain three other objects: 'servers', 'channels', and 'users'. Each one can have a property 'blacklist and 'whitelist', which should map to the value of an array with not allowed and allowed (respectively) IDs. If the property blacklist has an entry in the array, all other servers will be allowed besides the entries, and vice versa for whitelist. If **both** have an entry in the array, restrictions for that category will all be removed and all will be whitelisted. Example:
```
{
  "restrictions": {
    "users": {
      "blacklist": ["<not allowed user ID>"]
    },
    "channels": {
      "whitelist: [<allowed channel IDs>]
    }
}
```
**NOTE: All IDs of blacklisted and whitelisted servers/channels/users MUST be surrounded by quotes (I.E. be strings)**
This will allow anyone in the whitelisted channels to use the command, as long as they are not the blacklisted user.
**NOTE #2: Even if the restriction is indirect (ex. not being listed on a whitelist), if any of the restrictions for servers/channels/users disqualifies the command from being used, even whitelisted servers/channels/users will not be able to use the command.**

### Bot Administrators
In `config.json`, there is a property called `admins`. If the `message.author.id` of a command is an administrator's ID, `isAllowed` (the function that verifies if a command should be allowed using the restrictions object) will always return true. This means administrators can use all commands anywhere. **BE CAREFUL WITH THIS PROPERTY.**

## How to add modules
In the modules folder, add a folder with the name of your module. Then add a script to that folder called `main.js`. The script's `module.exports` should be an object with properties 'restrictions', 'functions', and 'cmd_manual'.

Functions should be an object with the command name as the key and the function that executes when run as the value (arguments: message, client, Discord, prefix). The prefix will be passed to the command function upon execution.

Restrictions should follow the normal format for a restrictions list (in comment at the top of `functions.js`).

'cmd_manual' should be an object with the keys being the exactly the way you would use the command, but without the prefix and the arguments should be replaced with a description of the argument surrounded by <>. The value should be a string that describes what exactly the command does in as much detail as possible.
Example:
```
{
  "add <number> <number>": "Adds the two specified numbers together and gives the result.",
  "subtract <number>, number>": "Subtracts the second number from the first number and gives the result."
}
```
You may place other files that go with your module in the module folder, such as a database, but note that only `main.js` will be `require()`'d.

Then, in `config.json` in the main bot folder, under the 'use' key, add the name of your module folder to the array. Your module's commands will work just like normal commands.

## How to add event listening processors
In the `events` folder, create a file with the name of the event emitted from client as listed [here](https://discord.js.org/#/docs/main/master/class/Client), followed by `.js` of course. Inside the file, there should be a function that takes either the `client` argument, or none if you do not need to use the client object in your event handling code. This function should return a function that has the arguments that the event has when it is emitted, I.E. if your event is  `messageDelete`, it should have 1 argument called message. Inside this function you may handle the message and you can use client inside it as well. Then, in `config.json`, add the name of the event to the `event_listeners` array. Your code is ready to go, and that function will be called when the event is emitted.

Example event handler file in `events/messageDeleteExample.js`.
