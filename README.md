# tiger-discord-dyno
 Flexible bot for Discord, easily customizable and functional
## How to use
**For if you are going to fork this bot, do NOT
run this exact code as a separate bot**

Go to [Discord dev portal](https.discordapp.com/developers/applications/) and create your application. Then, go to the 'Bot' tab and add a bot user. Click to reveal your token.

Then, download the latest version of node.js and NPM, and (in this cloned folder) run `npm install`. Once that is done, create a file in this folder called  `token.json` and put the only contents of the file as the JSON for an object with the property token that is a string that contains your token.

Finally, run `node main.js` in this cloned folder. Your bot should be online, as long as your forked code works.

## How to add modules
In the modules folder, add a folder with the name of your module. Then add a script to that folder called `main.js`. The script's `module.exports` should be an object with properties 'restrictions' and 'functions'. Functions should be an object with the command name as the key and the function that executes when run as the value (arguments: message, client, Discord). Restrictions should follow the normal format for a restrictions list (in comment at the top of `functions.js`). You may place other files that go with your module in the module folder, such as a database, but note that only `main.js` will be `require()`'d.

Then, in `config.json` in the main bot folder, under the 'use' key, add the name of your module folder to the array. Your module's commands will work just like normal commands.
