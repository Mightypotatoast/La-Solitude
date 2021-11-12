const { MessageEmbed } = require('discord.js')
const config = require('../../config')

module.exports = {
    
    name: 'channelDelete',
    once: false,

    execute(channel) {

        let channelDate = channel.createdAt
        let channelDeleteDate = new Date()

        const channelEmbed = new MessageEmbed()
            .setTitle("**Un channel a été supprimé !**")
            .setColor("#E73C3C")
            .setDescription('**Date de création** : '+`${channelDate.getDate()}/${channelDate.getMonth()+1}/${channelDate.getFullYear()} à ${channelDate.getHours()}:${String(channelDate.getMinutes()).padStart(2, '0')}` )
            .addField('Nom', `${channel.name}`, true)
            .addField('Type', channel.type, true)
            .addField('ID', channel.id)
            .addField('Supprimé le : ', `${channelDeleteDate.getDate()}/${channelDeleteDate.getMonth()+1}/${channelDeleteDate.getFullYear()} à ${channelDeleteDate.getHours()}:${String(channelDeleteDate.getMinutes()).padStart(2, '0')}`)
            .setTimestamp()

        

        try {       
            channel.guild.channels.cache.get(config(channel.guild.id).channel.logID).send({ embeds : [channelEmbed] });
        } catch (e) {
            console.log(e);
        }
       
    }
}