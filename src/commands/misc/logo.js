const { Command } = require('discord-akairo');

class LogoCommand extends Command {
    constructor() {
        super('logo', {
           aliases: ['logo'] 
        });
    }

    async exec(message) {
      var Kwey = this.client.users.get("232110364186247168")

      var logoembed = new Discord.MessageEmbed()
         .setTitle("Le Logo de SensÔkami")
         .setAuthor(this.client.user.username, this.client.user.avatarURL)
         .setColor(0xFF6800)
         .setFooter('© Designed by Kweyy', Kwey.avatarURL )
         .setImage('./src/util/img/Sensokami.png')
         .setTimestamp();

      message.channel.send({embeds : [logoembed]});   
    }
}

module.exports = LogoCommand;