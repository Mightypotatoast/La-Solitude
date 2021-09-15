const Discord = require("discord.js");

module.exports.run = async (bot, message, args,channel,prefix) => { 
    
    let icon = message.guild.iconURL;
    let servemb = new Discord.RichEmbed()
        .setTitle(":clipboard: INFORMATION SUR LE SERVEUR :clipboard:")
        .setColor("#15f153")
        .setThumbnail(icon)
        .addField("Nom du Serveur :", message.guild.name)
        .addField("Crée le :", message.guild.createdAt)
        .addField("Tu as rejoins le :", message.member.joinedAt)
        .addField("Total des membres :", message.guild.memberCount)
    
        return message.channel.send(servemb)
}

module.exports.help = {

    name : "serverinfo"
  
}