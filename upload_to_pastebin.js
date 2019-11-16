async function uploadToPastebin(text, callback) {
  let pastebinAPI = require("pastebin-js")
  let pastebin = new pastebinAPI(require("./pastebin-dev-token.json")['token'])
  let data = await pastebin.createPaste(text)
  // Calls callback function with ID, NOT link
  callback(data.split("https://pastebin.com/")[1]);
}
module.exports = uploadToPastebin;
