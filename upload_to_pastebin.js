async function uploadToPastebin(text, callback) {
  let paste = require("paste.ee")
  let posted = await paste(text, require("./paste-api-token.json")["token"])
  // Calls callback function with ID, NOT link
  callback(posted.id);
}
uploadToPastebin("qwerty", data => {
  console.log(data)
})
module.exports = uploadToPastebin;
