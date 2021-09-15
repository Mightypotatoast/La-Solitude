const { Command } = require('discord-akairo');
const Discord = require('discord.js')

class ServerInfoCommand extends Command {
    constructor() {
        super('serverinfo', {
           aliases: ['serverinfo'] 
        });
    }

    async exec(message) {

        let CreatedDate = message.guild.createdAt;
        let Joindate = message.member.joinedAt;

        let icon = message.guild.iconURL;

        let servemb = new Discord.MessageEmbed()
            .setTitle(":clipboard: INFORMATION SUR LE SERVEUR :clipboard:")
            .setColor("#FF6800")
            .setThumbnail(icon)
            .addField("Nom du Serveur : ", `${message.guild.name}`)
            .addField("Crée le : ", `${CreatedDate.getDate()}/${CreatedDate.getMonth()+1}/${CreatedDate.getFullYear()} à ${CreatedDate.getHours()}h${CreatedDate.getMinutes()}min${CreatedDate.getSeconds()}s`)
            .addField("Par : ", `${ await message.guild.fetchOwner() }`)
            .addField("Tu as rejoins le : ", `${Joindate.getDate()}/${Joindate.getMonth()+1}/${Joindate.getFullYear()} à ${Joindate.getHours()}h${Joindate.getMinutes()}min${Joindate.getSeconds()}s`)
            .addField("Total des membres :", `${message.guild.memberCount} `)
            
    
        return message.channel.send({embeds : [servemb]})

    }
}

module.exports = ServerInfoCommand;