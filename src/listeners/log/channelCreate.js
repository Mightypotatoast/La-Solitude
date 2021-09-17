const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class ChannelCreateListener extends Listener {
    constructor() {
        super('channelCreate', {
            emitter: 'client',
            event: 'channelCreate'
        });
    }

    exec(channel) {
        
        let channelDate = channel.createdAt

        const channelEmbed = new MessageEmbed()
            .setTitle("Un channel a été créé")
            .setColor("#3CE73C")
            .setDescription('**Date** : '+`${channelDate.getDate()}/${channelDate.getMonth()+1}/${channelDate.getFullYear()} à ${channelDate.getHours()}:${String(channelDate.getMinutes()).padStart(2, '0')}` )
            .addField('Nom', `${channel.name}`, true)
            .addField('Type', channel.type,true)
            .addField('ID', channel.id)
            .setTimestamp()

        

        channel.guild.channels.cache.get(config.channel.logID).send({ embeds : [channelEmbed] });


    
    }
}

module.exports = ChannelCreateListener; 