const { MessageEmbed } = require('discord.js')
const config = require('../../config')


module.exports = {
    
    name: 'channelCreate',
    once: false,

    async execute(channel) {

        let channelDate = channel.createdAt

        const channelEmbed = new MessageEmbed()
            .setTitle("**Un channel a été créé !**")
            .setColor("#3CE73C")
            .setDescription('**Date** : '+`${channelDate.getDate()}/${channelDate.getMonth()+1}/${channelDate.getFullYear()} à ${channelDate.getHours()}:${String(channelDate.getMinutes()).padStart(2, '0')}` )
            .addField('Nom', `${channel.name}`, true)
            .addField('Type', channel.type,true)
            .addField('ID', channel.id)
            .setTimestamp()

        

        try {       
            channel.guild.channels.cache.get((await config(channel.guild.id)).channel.logID).send({ embeds : [channelEmbed] });
        } catch (e) {
            console.log(e);
        }

       
    }
}