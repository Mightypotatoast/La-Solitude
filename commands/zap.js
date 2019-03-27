  
 exports.run = async (bot, message, args, Discord,channel,ops) => {  
    
  var Kwey = bot.users.get("232110364186247168")
  message.channel.send({embed :{
        color : 0x00b8ff ,
        title :'**Chignon = Pneu**',
        footer : {
          icon_url: Kwey.avatarURL,
          text : '© Created by Kweyy'
        }   
      }});
}