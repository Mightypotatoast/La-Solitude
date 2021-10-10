const Discord = require('discord.js')

module.exports = {

  name: "zap",
  description: "Euuuuh....",
  permission: "VIEW_CHANNEL",
  aliases: ['zap'],


  execute(message) {
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
