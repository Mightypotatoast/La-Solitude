const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class ChannelUpdateListener extends Listener {
    constructor() {
        super('channelUpdate', {
            emitter: 'client',
            event: 'channelUpdate'
        });
    }

    exec(oldChannel, newChannel) {
        
        const channelEmbed = new MessageEmbed()
            .setTitle("Un channel a été modifié")
            .setColor("#3CE7E7")
            .setTimestamp()
            .setDescription("")

        if (oldChannel.name != newChannel.name) {

            channelEmbed.addField("Changement de **nom**",`\`${oldChannel.name}\` a été renommé en \`${newChannel.name}\` `)
            
        }
        
        if (oldChannel.permissionOverwrites != newChannel.permissionOverwrites) {

           channelEmbed.addField("Changement de **permissions**", "une ou plusieurs permissions ont été changés")
            
        }
        

        
       newChannel.guild.channels.cache.get(config.channel.logID).send({ embeds : [channelEmbed] });
    
    }
}

module.exports = ChannelUpdateListener; 