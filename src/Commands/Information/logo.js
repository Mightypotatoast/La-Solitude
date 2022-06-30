const { MessageAttachment, MessageEmbed } = require('discord.js')

module.exports = {
          
    name: "logo",
    description: "Affiche le logo du serveur",
    permission: "ADMINISTRATOR",
    active:true,
   
    async execute(message,client) {

      let logoembed = new MessageEmbed()
         .setTitle(`Le Logo de ${message.guild.name}`)
         .setColor(0xFF6800)
         .setImage(message.guild.iconURL({ dynamic: true, format: "png" }))
         .setTimestamp();

      await message.deferReply()

      await message.editReply({embeds : [{description : "⏳ Chargement", color:0xFF6800}]})
          .then(async (resultMessage) => {
              resultMessage.edit({ embeds: [logoembed]})
      });
      
    }
}

