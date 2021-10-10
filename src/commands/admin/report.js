const Discord = require('discord.js')


module.exports = {

  name: "report",
  aliases: ['report', 'rep'],
  description: "Use for report an annoying guy",
  category: "admin",
  permission:"ADMINISTRATOR",
  cooldown: 5,
  args: [
    { id: 'member', type : 'member' },
    { id: 'reason', match: 'rest' , default: "Aucune raison n'a été indiqué"}
  ],


  async execute(message, args) {
    
      let rUser = args.member;

      console.log(rUser)

      if(!rUser) return message.channel.send({ embeds :[{
        color : 0xff0000 ,
        description : ` ${message.member} \n **Erreur**: \n Ce membre est introuvable.`
      }]});


      let rreason = args.reason;
      let messageDate = message.createdAt
      
      let reportEmbed = new Discord.MessageEmbed()
              .setTitle(":satellite: Signalement Détecté :satellite:")
              .setColor("#000000")
              .addField("Membre signalé : ", `${rUser} avec comme ID : ${rUser.id}`)
              .addField("Signalé par : ", `${message.author} avec comme ID : ${message.author.id}`)
              .addField("Dans le salon : ", message.channel.name)
              .addField("Date : ", `${messageDate.getDate()}/${messageDate.getMonth()+1}/${messageDate.getFullYear()} à ${messageDate.getHours()}h${String(messageDate.getMinutes()).padStart(2, '0')}min${String(messageDate.getSeconds()).padStart(2, '0')}s`)
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

      message.delete()

  },
};