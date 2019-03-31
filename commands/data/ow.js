//Require base modules
const discord = require("discord.js");
const owjs = require('overwatch-js');
const moment = require('moment');
const duration = require("moment-duration-format");


var self = module.exports = {

  getUserGeneralData: function (message, username, mode) {

    // check if mode are uppercase and covert to lowercase
    if (/[A-Z]/.test(mode)) {
      mode = mode.toString().toLowerCase();
      console.log("uppercase");
    }

    if (mode === undefined) {
      mode = 'competitive';
    }
    else if (mode == 'competitive' || mode == 'comp' || mode == 'c' || mode == 'ranked' || mode == 'rank' || mode == 'r') {
      mode = 'competitive';
    }
    else if (mode == 'quickplay' || mode == 'quick' || mode == 'q') {
      mode = 'quickplay';
    }
    else {
      message.reply("we couldn't find a gamemode **" + mode + "**.\nYou can choose between **Competitive** or **Quickplay**.");
      console.error("ERROR: Got request with wrong mode set");
      console.error("Mode:" + mode);
      return;
    }
    // call function to get username
    getUser(username, message, function(userID) {
      if(userID === undefined){return;}

      // fetch general user data
      owjs.getOverall(userID.platform, userID.region, userID.userid).then(function(data) {

        // create array with all needed values
        userData = [
          { property: "displayName", value: userID.displayName },
          { property: "avatar", value: data.profile.avatar },
          { property: "profileURL", value: data.profile.url },
          { property: "rankPicture", value: data.profile.rankPicture },
          { property: "Mode", value: mode },
          { property: "Level", value: data.profile.level },
          { property: "Rank", value: data.profile.rank },
          { property: "Games played", value: data[mode].global.games_played },
          { property: "Games won", value: data[mode].global.games_won },
          { property: "Time played", value: moment.duration(data[mode].global.time_played).format("h [hours]") },
          { property: "Objective time", value: moment.duration(data[mode].global.objective_time).format("d[d] h:mm:ss")},
          { property: "Eliminations", value: data[mode].global.eliminations },
          { property: "Environmental kills", value: data[mode].global.environmental_kills },
          { property: "Deaths", value: data[mode].global.deaths },
          { property: "Damage done", value: data[mode].global.damage_done },
          { property: "Healing done", value: data[mode].global.healing_done },
          { property: "Medals - Total", value: data[mode].global.medals },
          { property: "Gold medals", value: data[mode].global.medals_gold },
          { property: "Silver medals", value: data[mode].global.medals_silver },
          { property: "Bronze medals", value: data[mode].global.medals_bronze },
          { property: "Eliminations - Average", value: data[mode].global.eliminations_average },
          { property: "Damage done - Average", value: data[mode].global.damage_done_average },
          { property: "Deaths - Average", value: data[mode].global.deaths_average },
          { property: "Healing done - Average", value: data[mode].global.healing_done_average },
          { property: "Objective kills - Average", value: data[mode].global.objective_kills_average },
          { property: "Solo kills - Average", value: data[mode].global.solo_kills_average }
        ];

        // pass it to sendUserEmbedMessage
        sendUserEmbedMessage(message, userData);
        console.log("SUCCESS: Got user data from Overwatch user " + userID.displayName + " on " + userID.platform + " on mode " + mode);
      });
    });
  }
};

function getUser(username, message, callback) {

  if (username === undefined) {
    console.error("ERROR: Command was missing Overwatch username");
    message.reply("your command is missing the Overwatch username.");
    return;
  }

  // check if username has an # and replace with -
  if(username.includes("#")) {
    username = username.replace(/(#)/g, "-");
  }

  // throw error when discord mention is used
  if (username.startsWith('<@') === true){
    console.error("ERROR: Tried getting Overwatch user from Discord user name. This is not possible without an userbot.");
    message.reply("It is not possible to fetch the Overwatch user name from your Discord account because of security restrictions.");
    return;
  }

    // search overwatch api for username
    owjs.search(username).then(function(data) {

        // if no result
        if (data[0] === undefined) {
            message.reply("Couldn't find the account **" + username.replace(/(-)/g, "#") + "**. \nDid you check if the unique identifier number (Username#1234) is missing?");
            console.error("ERROR: Could not find account from string:");
            console.error(username);
        }

        // check if user is from psn or xbl
        else if (data[0].region == 'psn' || data[0].region == 'xbl') {
            var regexp = /(?:\/career\/)(.*?)(?:\/)(.*?)$/g;
            var match = regexp.exec(data[0].careerLink);

            // store results as object
            userID = {
                platform: match[1],
                userid: match[2],
                displayname: data[0].platformDisplayName
            };
            console.log("SUCCESS: Found Overwatch user " + userID.displayName + " on " + userID.platform);
            callback(userID);
        }

        // check if user is from pc
        else if (data[0].region == 'pc') {
            var regexpPC = /(?:\/career\/)(.*?)(?:\/)(.*?)(?:\/)(.*?)$/g;
            var matchPC = regexpPC.exec(data[0].careerLink);

            // store results as object
            userID = {
                platform: matchPC[1],
                region: matchPC[2],
                userid: matchPC[3],
                displayName: data[0].platformDisplayName
            };
            console.log("SUCCESS: Found Overwatch user " + userID.displayName + " on " + userID.platform);
            callback(userID);
        } else {
            return;
        }
    });
}

function sendUserEmbedMessage(message, userData) {

    // set color of message
    var color = '0xFF9C00';

    // set mode as string
    if (userData[4].value == 'competitive') {
      mode = "Competitive/Ranked";
    } else {
      mode = "Quickplay/Normal";
      userData[7].value = 'Not available on Quickplay';
    }

    // use RichEmbed to create embed message
    const owEmbed = new discord.RichEmbed();

    // slice userData to split up the different sections
    var userDataGeneral = userData.slice(5, 11);
    var userDataCombat = userData.slice(11, 16);
    var userDataMedals = userData.slice(16, 20);
    var userDataAverage = userData.slice(20, userData.length);

    owEmbed.setAuthor(userData[0].value + " - " + mode , userData[3].value);
    owEmbed.setThumbnail(userData[1].value);
    owEmbed.setURL(userData[2].value);
    owEmbed.setColor(color);
    owEmbed.addField("General stats:", userDataGeneral.map(function(item){
        return "**" + item.property + "**: " + item.value;
    }).join("\n"));
    owEmbed.addField("Combat and match rewards:", userDataCombat.map(function(item){
        return "**" + item.property + "**: " + item.value;
    }).join("\n"));
    owEmbed.addField("Medals:", userDataMedals.map(function(item){
        return "**" + item.property + "**: " + item.value;
    }).join("\n"));
    owEmbed.addField("Averages:", userDataAverage.map(function(item){
        return "**" + item.property + "**: " + item.value;
    }).join("\n"));

    // send message to channel
    message.channel.send({embed: owEmbed});
}