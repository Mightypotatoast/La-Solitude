const { Command } = require('discord-akairo');
const { getVoiceConnection } = require('@discordjs/voice');


class LeaveCommand extends Command {
    constructor() {
        super('leave', {
           aliases: ['leave'] 
        });
    }

    async exec(message) {

      if (!message.member.voice.channel) return message.channel.send({embeds :[{
          color : 0xff0000 ,
          title: `**Erreur**:`,
          description : ` ${message.member} \n Vous devez d'abord rejoindre le salon vocal où le BOT se trouve de préférence.`
      }]});
      
      if (!message.guild.me.voice.channel) return  message.channel.send({embeds :[{
          
          color : 0xff0000 ,
          title: `**Erreur**:`,
          description : ` ${message.member} \n Le bot n'est pas connecter dans un salon vocal`

      }]})

      if (message.guild.me.voice.channel.id !== message.member.voice.channel.id) return  message.channel.send({embeds :[{
          color : 0xff0000 ,
          title: `**Erreur**:`,
          description : ` ${message.member} \n Vous n'êtes pas dans le même salon que le bot.`
      }]})

      var connection = getVoiceConnection(message.guild.id)
      connection.destroy();

    }
}

module.exports = LeaveCommand;
