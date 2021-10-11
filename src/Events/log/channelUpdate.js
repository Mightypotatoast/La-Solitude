const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    
    name: 'channelUpdate',
    once: false,

    execute(oldChannel, newChannel) {

       
        const channelEmbed = new MessageEmbed()
            .setTitle("**Un channel a été modifié !**")
            .addField("Nom Actuel",newChannel.name)
            .setColor("#3CE7E7")
            .setTimestamp()

            .setDescription("")

        if (oldChannel.name != newChannel.name) {

            channelEmbed.addField("Changement de **nom**",`\`${oldChannel.name}\` a été renommé en \`${newChannel.name}\` `)
            
        }
        
        else if (oldChannel.permissionOverwrites.cache !== newChannel.permissionOverwrites.cache) {

           channelEmbed.addField("Changement de **permissions**", "une ou plusieurs permissions ont été changées")
            
        }
        

        
       newChannel.guild.channels.cache.get(config.channel.logID).send({ embeds : [channelEmbed] });
    
    }
}