const Discord = require("discord.js");

module.exports.run = async (bot, message, args,channel,prefix) => {

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!rUser) return message.channel.send({embed :{
    color : 0xff0000 ,
    description : ` ${message.member} \n **Erreur**: \n Ce membre est introuvable.`
  }});


  let rreason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
          .setTitle(":satellite: Signalement Détecté :satellite:")
          .setColor("#15f153")
          .addField("Membre signalé : ", `${rUser} avec comme ID : ${rUser.id}`)
          .addField("Signalé par : ", `${message.author} avec comme ID : ${message.author.id}`)
          .addField("Dans le salon : ", message.channel)
          .addField("Date : ", message.createdAt)
          .addField("Raison : ", rreason);

  let reportschannel = message.guild.channels.find(`name`, "reports");
  if(!reportschannel) return message.channel.send({embed :{
    color : 0xff0000 ,
    description : ` ${message.member} \n **Erreur**: \n le salon "#reports" est introuvable.`
  }});

  

  return;

}

module.exports.help = {

  name : "report"

}
