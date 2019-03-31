
var overwatch = require("./data/ow.js");

exports.run = async (bot, message, args, Discord,channel, ops,ffmpeg) => {


      overwatch.getUserGeneralData(message, args[1], args[2]);
      console.log("INFO: Received command: " + message);
    
}
