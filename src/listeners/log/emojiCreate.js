const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class EmojiCreateListener extends Listener {
    constructor() {
        super('emojiCreate', {
            emitter: 'client',
            event: 'emojiCreate'
        });
    }

    async exec(emoji) {
        
        let emojiDate = emoji.createdAt

        const emojiEmbed = new MessageEmbed()
            .setTitle("Un émoji a été créé")
            .setThumbnail(emoji.url)
            .setColor("#F4D03F")
            .setDescription('**Date** : '+`${emojiDate.getDate()}/${emojiDate.getMonth()+1}/${emojiDate.getFullYear()} à ${emojiDate.getHours()}:${String(emojiDate.getMinutes()).padStart(2, '0')}` )
            .addField('Nom', `:${emoji.name}:`, true)
            .addField('Animé ?', (emoji.animated) ? "Oui":"Non")
            .addField('ID', emoji.id)
            .setTimestamp()

        

        emoji.guild.channels.cache.get(config.channel.logID).send({ embeds : [emojiEmbed] });
    
 
    }
}

module.exports = EmojiCreateListener; 