const Discord = require("discord.js");

module.exports.run = async (bot, message, args,channel,prefix) => {

    var Kwey = bot.users.get("232110364186247168")

    var logoembed = new Discord.RichEmbed()
       .setTitle("Le Logo de SensÔkami")
       .setAuthor(bot.user.username, bot.user.avatarURL)
       .setColor(0x00b8ff)
       .setFooter('© Designed by Kweyy', Kwey.avatarURL )
       .setImage('./img/Sensokami.png')
       .setTimestamp();

    message.channel.send(logoembed);   
}

module.exports.help = {

   name : "logo"
 
 }