const { MessageAttachment, MessageEmbed } = require('discord.js')

module.exports = {
          
    name: "logo",
    description: "Display the logo of SensÔkami",
    permission: "ADMINISTRATOR",
   
   
    async execute(message,client) {
      var Kwey = client.users.cache.get("232110364186247168")

      const logoImg = new MessageAttachment('./src/util/img/Sensokami.png', 'Sensokami.png');

      let logoembed = new MessageEmbed()
         .setTitle("Le Logo de SensÔkami")
         //.setAuthor(client.user.username, client.user.avatarURL)
         .setColor(0xFF6800)
         .setImage('attachment://Sensokami.png')

         .setFooter('© Designed by Kweyy', Kwey.displayAvatarURL() )
         .setTimestamp();

      await message.deferReply()

      await message.editReply({embeds : [{description : "Loading Image ...", color:0xFF6800}]})
          .then(async (resultMessage) => {
              resultMessage.edit({ embeds: [logoembed], files: [logoImg] })
      });
      
    }
}

