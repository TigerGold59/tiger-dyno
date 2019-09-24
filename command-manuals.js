var cmds = {
    "%info": "Bot gives brief explanation of its designed purpose.",
    "%commands": "Links to this always-updating hastebin.",
    "Notify me of new news.": "@s you every time a new news message comes.",
    "Do not notify me of new news.": "Removes you from the new news message notification list.",
    "$pingtoad": "Plays a game of ping pong with Toad713.",
    "m": "Gives you one m. (restricted on some servers to #shitposting)",
    "v": "Takes one m away from you.  (restricted on some servers to #shitposting)",
    "ms": "Tells how many m's you have. (restricted on some servers to #shitposting)",
    "m ranks": "Tells you the rankings of how many m's each person has. (restricted on some servers to #shitposting)",
    "%lottery m <1-4>": "75% chance of giving you 100 m's and 25% chance of taking 300 m's. (restricted on some servers to #shitposting)",
    "%givems <tag> <ms>": "Gives the user with the given tag the given number of ms.",
    "%xofakind <number of dice>": "Simulates rolling the given number of dice until they all come up the same (above 10 crashes the bot).",
    "%progressbar <name>,<start percent>,<note>": "Creates a progress bar with the given properties.",
    "%progressbaredit <name>,<new percent>,<new note>": "Edits the given progress bar to have the given properties.",
    "%rolecount": "Tells you how many roles you have (includes non-jump-roles).",
    "%totalroles": "Tells you how many jump roles there are on the SMO Trickjumping server, which is dependent on the number of roles YAGPDB has, so please update its roles with all new jump roles.",
    "DMing the bot a message ID": "If the message is in #general on SMO Trickjumping, it will react \"SHITPOSTING\" to the message with the corresponding ID.",
    "%subscribe <list-id> <0 for unsub or 1 for sub>": "Subscribes or unsubscribes the user from the given list. Lists are generally roles that will be pinged in certain situations. \r\n Current Lists: \r\n smo-trickjumping-reports: Pings the user whenever a report is made in the SMO Trickjumping server. \r\n smo-trickjumping-autoupdating-nickname: Adds one to the role counter every time you give yourself a role. Name must have be in the format <name> [number/number].",
    "%msdatabase": "Gives a link to a hastebin with the raw data of m ranks so the bot can keep ms across restarts.",
    "%finaltheme": "Links to the SMO Final Theme: Honeylune Ridge Escape music to play with Rhythm."
}
module.exports = cmds
