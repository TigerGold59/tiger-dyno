'use strict';
function log(message) {
  // Change the date object to a normal clock time, date is already listed in the file name
  function time(date) {
   let [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
   if (String(hours).length === 1) {
     hours = "0" + hours;
   }
   if (String(minutes).length === 1) {
     minutes = "0" + minutes;
   }
   if (String(seconds).length === 1) {
     minutes = "0" + seconds;
   }
   return `${hours}:${minutes}:${seconds}`
  }
  let fs = require("fs");
  let date = new Date();
  message = "[" + time(date) + "] " + message; // Add date in front of message to append to log
  let date_string = date.getMonth() + "_" + date.getDate() + "_" +  date.getFullYear() + ".txt";
  if (!(fs.existsSync("./logs/" + date_string))) {
    fs.writeFile("./logs/" + date_string, message, 'utf8', function (err) {
      if (err) {
        console.log(err);
      }
    })
  }
  else {
    var file = fs.readFile("./logs/" + date_string, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      }
       fs.writeFile("./logs/" + date_string, data + "\r\n" + message, 'utf8', function(err) {
         if (err) {
           console.log(err);
         }
       })
    })
  }
}
module.exports = log;
