const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    
    name: 'emojiUpdate',
    once: false,

    execute(oldEmoji, newEmoji) {

       const emojiEmbed = new MessageEmbed()
            .setTitle("**Un émoji a été modifié !**")
            .setColor("#3CE7E7")
            .setThumbnail(newEmoji.url)
            .addField('Changements : ', `L'émoji \`:${oldEmoji.name}:\` a été renommé en \`:${newEmoji.name}:\``)
            .setTimestamp()
        
        
        newEmoji.guild.channels.cache.get(config.channel.logID).send({ embeds : [emojiEmbed] });
    }
}