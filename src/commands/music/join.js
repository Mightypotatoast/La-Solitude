const { Command } = require('discord-akairo');

class JoinCommand extends Command {
    constructor() {
        super('join', {
           aliases: ['join'] 
        });
    }

    async exec(message) {
      channel = message.member.voiceChannel;
      //bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
      if (channel){
          channel.join()
            .then(connection => console.log(`\n Connected on channel ${channel.name}!`))
            .catch(console.error);
      }
  
      else{
        message.channel.send({embed :{
          color : 0xff0000 ,
          description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal`
        }});
      }


    }
}

module.exports = JoinCommand;