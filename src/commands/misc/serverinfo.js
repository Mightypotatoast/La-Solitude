const { Command } = require('discord-akairo');

class ServerInfoCommand extends Command {
    constructor() {
        super('serverinfo', {
           aliases: ['serverinfo'] 
        });
    }

    exec(message) {
       
        let icon = message.guild.iconURL;
        let servemb = new Discord.MessageEmbed()
            .setTitle(":clipboard: INFORMATION SUR LE SERVEUR :clipboard:")
            .setColor("#FF6800")
            .setThumbnail(icon)
            .addField(`Nom du Serveur : ${message.guild.name}`)
            .addField(`Crée le : ${message.guild.createdAt}`)
            .addField(`Par : ${message.guild.members.cache.get(message.guild.ownerId).name}`)
            .addField(`Tu as rejoins le : ${message.member.joinedAt}`)
            .addField(`Total des membres : ${message.guild.memberCount} / ${message.guild.maximumMembers}`)
    
        return message.channel.send({embeds : [servemb]})

    }
}

module.exports = ServerInfoCommand;