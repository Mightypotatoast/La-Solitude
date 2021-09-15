const { Command } = require('discord-akairo');
const { joinVoiceChannel} = require('@discordjs/voice');

class JoinCommand extends Command {
    constructor() {
        super('join', {
           aliases: ['join'] 
        });
    }

    async exec(message) {
      var channel = message.member.voice.channel;
      //bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
      if (channel){

        joinVoiceChannel({
          channelId: channel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator
        })

      }
  
      else{
        message.channel.send({embeds :[{
          color : 0xff0000 ,
          description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal`
        }]});
      }


    }
}

module.exports = JoinCommand;