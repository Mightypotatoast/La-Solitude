  
 exports.run = async (bot, message, args, Discord,channel,ops) => {

    var Kwey = bot.users.get("232110364186247168")

    var logoembed = new Discord.RichEmbed()
       .setTitle("Le Logo de SensÔkami")
       .setAuthor(bot.user.username, bot.user.avatarURL)
       .setColor(0x00b8ff)
       .setFooter('© Designed by Kweyy', Kwey.avatarURL )
       .setImage('https://cdn.discordapp.com/icons/235816886259023872/51ba8016e293c38926644606ddb9ecd4.jpg')
       .setTimestamp();

    message.channel.send(logoembed);   
}