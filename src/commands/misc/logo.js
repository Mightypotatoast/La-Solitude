const Discord = require('discord.js')

module.exports = {
          
    name: "logo",
    description: "Display the logo of SensÔkami",
    permission: "VIEW_CHANNEL",
    aliases: ['logo'], 
   

    async execute(message) {
      var Kwey = this.client.users.cache.get("232110364186247168")

      const logoImg = new Discord.MessageAttachment('./src/util/img/Sensokami.png', 'Sensokami.png');

      let logoembed = new Discord.MessageEmbed()
         .setTitle("Le Logo de SensÔkami")
         .setAuthor(this.client.user.username, this.client.user.avatarURL)
         .setColor(0xFF6800)
         .setImage('attachment://Sensokami.png')

         .setFooter('© Designed by Kweyy', Kwey.displayAvatarURL() )
         .setTimestamp();

      message.channel.send({ embeds : [logoembed], files : [logoImg] });  
    }
}

