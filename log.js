'use strict';
function log(message) {
  var fs = require("fs")
  var date = new Date()
  var date_string = date.getMonth() + "_" + date.getDate() + "_" +  date.getYear() + ".txt"
  if (!(fs.existsSync("./logs/" + date_string))) {
    fs.writeFile("./logs/" + date_string, message, 'utf8', function (err) {
      if (err) {
        console.log(err)
      }
    })
  }
  else {
    var file = fs.readFile("./logs/" + date_string, 'utf8', function(err, data) {
      if (err) {
        console.log(err)
      }
       fs.writeFile("./logs/" + date_string, data + "\r\n" + message, 'utf8', function(err) {
         if (err) {
           console.log(err)
         }
       })
    })
  }
}
module.exports = log
