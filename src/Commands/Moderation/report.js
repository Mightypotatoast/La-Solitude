const { MessageEmbed, CommandInteraction } = require('discord.js')
const conf  = require('../../config');
const { errorEmbed } = require('../../util/Embeds');


module.exports = {

  name: "report",
  description: "Use for report an annoying guy",
  permission: "ADMINISTRATOR",
  active:true,

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
    let config = await conf(message.guild.id);
    
      let rUser = message.options.getMember("member");

      //console.log(rUser)

      if(!rUser) return message.channel.send({ embeds :[{
        color : 0xff0000 ,
        description : ` ${message.member} \n **Erreur**: \n Ce membre est introuvable.`
      }]});


    let rreason = message.options.getString('reason');
    if (!rreason) {rreason = "Aucune raison n'a été indiqué"}
         
        
      let reportEmbed = new MessageEmbed()
              .setTitle(":satellite: Signalement Détecté :satellite:")
              .setColor("#000000")
              .addField("Membre signalé : ", `${rUser}`, true)
              .addField("Signalé par : ", `${message.user}`, true)
              .addField("Dans le salon : ", `<#${message.channel.id}>`, true)
              .addField("Date : ", `<t:${parseInt(message.createdAt / 1000)}:R>`, true)
              .addField("Raison : ", `${rreason}`);

      let reportschannel = (!config(message.guild.id).channel.reportID) ? null : message.guild.channels.cache.get(config(message.guild.id).channel.reportID);

      console.log(config.channel.reportID);
      console.log(reportschannel);
    
      if(!reportschannel){
        return message.reply({
          embeds: [
            errorEmbed()
              .setDescription(`le salon de "report" n'est pas initialisé. \n\n _Pour l'initialiser vous pouvez utiliser la commande_ \`/set-channel report\`\n_**ADMIN ONLY**_`)
          ], ephemeral: true
        })
        
      }
      else{
        reportschannel.send({ embeds : [reportEmbed] })
      };

      message.reply({content: "Votre report a bien été reçu !", ephemeral : true})
      
  },
};