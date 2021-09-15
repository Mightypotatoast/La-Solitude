const { Command } = require('discord-akairo');
const Discord = require('discord.js')

class ReportCommand extends Command {
    constructor() {
        super('report', {
           aliases: ['report'],
           args: [
             { id: 'member', type : 'member' },
             { id: 'reason', match: 'rest' , default: "Aucune raison n'a été indiqué"}
           ]
        });
    }

    async exec(message,args) {
       
      let rUser = args.member;

      if(!rUser) return message.channel.send({ embeds :[{
        color : 0xff0000 ,
        description : ` ${message.member} \n **Erreur**: \n Ce membre est introuvable.`
      }]});


      let rreason = args.reason;

      let reportEmbed = new Discord.MessageEmbed()
              .setTitle(":satellite: Signalement Détecté :satellite:")
              .setColor("#000000")
              .addField("Membre signalé : ", `${rUser} avec comme ID : ${rUser.id}`)
              .addField("Signalé par : ", `${message.author} avec comme ID : ${message.author.id}`)
              .addField("Dans le salon : ", message.channel.name)
              .addField("Date : ", `${message.createdAt}`)
              .addField("Raison : ", `${rreason}`);

      let reportschannel = message.guild.channels.cache.find(channel => channel.name === 'reports');

      if(!reportschannel){
        message.channel.send({ embeds :[{
          color : 0xff0000 ,
          description : ` ${message.member} \n **Erreur**: \n le salon "#reports" est introuvable.`
        }]})
      }
      else{
        reportschannel.send({ embeds : [reportEmbed] })
      };

  



    }
}

module.exports = ReportCommand;