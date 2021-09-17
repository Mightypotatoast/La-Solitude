const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class EmojiUpdateListener extends Listener {
    constructor() {
        super('emojiUpdate', {
            emitter: 'client',
            event: 'emojiUpdate'
        });
    }

    exec(oldEmoji, newEmoji) {
        
        const emojiEmbed = new MessageEmbed()
            .setTitle("Un émoji a été modifié")
            .setColor("#E7A13C")
            .setThumbnail(newEmoji.url)
            .addField('Changements : ', `L'émoji \`:${oldEmoji.name}:\` a été renommé en \`:${newEmoji.name}:\``)
            .setTimestamp()
    
        newEmoji.guild.channels.cache.get(config.channel.logID).send({ embeds : [emojiEmbed] });
    }
}

module.exports = EmojiUpdateListener; 