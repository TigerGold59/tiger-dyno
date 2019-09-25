function log(message) {
  var fs = require("fs")
  var date = new Date()
  var date_string = date.getMonth() + "_" + date.getDate() + "_" +  date.getYear() + ".txt"
  if (!(fs.existsSync("./logs/" + date_string))) {
    fs.writeFileSync("./logs/" + date_string, message)
  }
  else {
    var file = fs.readFileSync("./logs/" + date_string)
    fs.writeFileSync("./logs/" + date_string, file + "\r\n" + message)
  }
}
module.exports = log
