const { MessageEmbed, CommandInteraction } = require('discord.js')
const config = require('../../config.json')


module.exports = {

  name: "report",
  description: "Use for report an annoying guy",
  permission:"ADMINISTRATOR",
  options: [
    {
      name: 'member',
      description: "Choose the member to report",
      type: 'USER',
      required: true
    },
    
    {
      name: 'reason',
      description: "Why do you report him?",
      type:"STRING",
      required: false
    }
  ],


  async execute(message) {
    
      let rUser = message.options.getMember("member");

      console.log(rUser)

      if(!rUser) return message.channel.send({ embeds :[{
        color : 0xff0000 ,
        description : ` ${message.member} \n **Erreur**: \n Ce membre est introuvable.`
      }]});


    let rreason = message.options.getString('reason');
    if (!rreason) {rreason = "Aucune raison n'a été indiqué"}
    
      let messageDate = message.createdAt
      
        
      let reportEmbed = new MessageEmbed()
              .setTitle(":satellite: Signalement Détecté :satellite:")
              .setColor("#000000")
              .addField("Membre signalé : ", `${rUser} avec comme ID : ${rUser.id}`)
              .addField("Signalé par : ", `${message.user.username} avec comme ID : ${message.user.id}`)
              .addField("Dans le salon : ", message.channel.name)
              .addField("Date : ", `${messageDate.getDate()}/${messageDate.getMonth()+1}/${messageDate.getFullYear()} à ${messageDate.getHours()}h${String(messageDate.getMinutes()).padStart(2, '0')}min${String(messageDate.getSeconds()).padStart(2, '0')}s`)
              .addField("Raison : ", `${rreason}`);

      let reportschannel = message.guild.channels.cache.find(channel => channel.id === config.channel.reportID);

      if(!reportschannel){
        message.channel.send({ embeds :[{
          color : 0xff0000 ,
          description: ` ${message.member} \n **Erreur**: \n le salon "#reports" est introuvable.`
          
        }]
        })
        return;
      }
      else{
        reportschannel.send({ embeds : [reportEmbed] })
      };

      message.reply({content: "Votre report a bien été reçu !", ephemeral : true})
      
  },
};