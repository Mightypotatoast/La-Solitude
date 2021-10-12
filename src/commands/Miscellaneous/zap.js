const Discord = require('discord.js')

module.exports = {

  name: "zap",
  description: "Euuuuh....",
  permission: "ADMINISTRATOR",


  execute(message,client) {
    var Kwey = client.users.cache.get("232110364186247168")
    
    message.reply({embeds :[{
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
