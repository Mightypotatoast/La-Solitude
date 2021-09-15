const { Command } = require('discord-akairo');

class ZapCommand extends Command {
    constructor() {
        super('zap', {
           aliases: ['zap'] 
        });
    }

    async exec(message) {
      var Kwey = this.client.users.get("232110364186247168")
      message.channel.send({embed :[{
            color : 0xFF6800 ,
            title :'**Chignon = Pneu**',
            footer : {
              icon_url: Kwey.avatarURL,
              text : '© Created by Kweyy'
            }   
          }]});
    }
}

module.exports = ZapCommand;