const Discord = require("discord.js");

module.exports.run = async (bot, message, args,channel,prefix) => {

}

module.exports.help = {

  name : "leave"

}


const { Command } = require('discord-akairo');

class JoinCommand extends Command {
    constructor() {
        super('join', {
           aliases: ['join'] 
        });
    }

    async exec(message) {

      if (!message.member.voiceChannel) return message.channel.send({embed :{
          color : 0xff0000 ,
          description : ` ${message.member} \n **Erreur**: \n Vous devez d'abord rejoindre un salon vocal (où le BOT se trouve de préférence).`
      }});
      
      if (!message.guild.me.voiceChannel) return  message.channel.send({embed :{
          
          color : 0xff0000 ,
          description : ` ${message.member} \n **Erreur**: \n Le bot n'est pas connecter dans un salon vocal`

      }})

      if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return  message.channel.send({embed :{
          color : 0xff0000 ,
          description : ` ${message.member} \n **Erreur**: \n Vous n'êtes pas dans le même salon que le bot.`
      }})

      message.guild.me.voiceChannel.leave();

    }
}

module.exports = JoinCommand;
