const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')


class EmojiDeleteListener extends Listener {
    constructor() {
        super('emojiDelete', {
            emitter: 'client',
            event: 'emojiDelete'
        });
    }

    exec(emoji) {
        
        let emojiDate = emoji.createdAt
        let emojiDeleteDate = new Date()
    

        const emojiEmbed = new MessageEmbed()
            .setTitle("Un émoji a été supprimé")
            .setThumbnail(emoji.url)
            .setColor("#E73C3C")
            .setDescription( '**Date de création** : ' + `${emojiDate.getDate()}/${emojiDate.getMonth()+1}/${emojiDate.getFullYear()} à ${emojiDate.getHours()}:${String(emojiDate.getMinutes()).padStart(2, '0')}` )
            .addField('Nom', `:${emoji.name}:`, true)
            .addField('Animé ?', (emoji.animated) ? "Oui":"Non")
            .addField('ID', emoji.id)
            .addField('Supprimé le : ', `${emojiDeleteDate.getDate()}/${emojiDeleteDate.getMonth()+1}/${emojiDeleteDate.getFullYear()} à ${emojiDeleteDate.getHours()}:${String(emojiDeleteDate.getMinutes()).padStart(2, '0')}`)
            .setTimestamp()

        

        emoji.guild.channels.cache.get(config.channel.logID).send({ embeds : [emojiEmbed] });
    
    }
}

module.exports = EmojiDeleteListener; 