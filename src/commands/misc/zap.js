const { Command } = require('discord-akairo');
const Discord = require('discord.js')

class ZapCommand extends Command {
    constructor() {
        super('zap', {
           aliases: ['zap'] 
        });
    }

    exec(message) {
      var Kwey = this.client.users.cache.get("232110364186247168")
      
      message.channel.send({embeds :[{
            color : 0xFF6800 ,
            title :'**Chignon = Pneu**',
            description : "",
            footer : {
              icon_url: Kwey.avatarURL,
              text : '© Created by Kweyy'
            }   
          }]});
    }
}

module.exports = ZapCommand;