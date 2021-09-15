const { Command } = require('discord-akairo');

class ReportCommand extends Command {
    constructor() {
        super('report', {
           aliases: ['report'] 
        });
    }

    async exec(message) {
       
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!rUser) return message.channel.send({embed :{
        color : 0xff0000 ,
        description : ` ${message.member} \n **Erreur**: \n Ce membre est introuvable.`
      }});


      let rreason = args.join(" ").slice(22);

      let reportEmbed = new Discord.MessageEmbed()
              .setTitle(":satellite: Signalement Détecté :satellite:")
              .setColor("#15f153")
              .addField("Membre signalé : ", `${rUser} avec comme ID : ${rUser.id}`)
              .addField("Signalé par : ", `${message.author} avec comme ID : ${message.author.id}`)
              .addField("Dans le salon : ", message.channel)
              .addField("Date : ", message.createdAt)
              .addField("Raison : ", rreason);

      let reportschannel = message.guild.channels.cache.find(`name`, "reports");

      if(!reportschannel){
        message.channel.send({embed :[{
          color : 0xff0000 ,
          description : ` ${message.member} \n **Erreur**: \n le salon "#reports" est introuvable.`
        }]})
    };

  



    }
}

module.exports = ReportCommand;