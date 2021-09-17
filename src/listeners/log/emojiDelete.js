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
        let emojiDeleleDate = new Date().now()

        const emojiEmbed = new MessageEmbed()
            .setTitle("Un émoji a été supprimé")
            .setThumbnail(emoji.url)
            .setColor("#E73C3C")
            .setDescription('**Créer par** : '+`${emoji.author.username}`+'\n'+' **Date de création** : '+`${emojiDate.getDate()}/${emojiDate.getMonth()+1}/${emojiDate.getFullYear()} à ${emojiDate.getHours()}:${emojiDate.getMinutes()}` )
            .addField('Nom', `:${emoji.name}:`)
            .addField('Animé ?', (emoji.animated) ? "Oui":"Non", true)
            .addField('ID', emoji.id)
            .addField('Supprimé le : ', `${emojiDeleteDate.getDate()}/${emojiDeleteDate.getMonth()+1}/${emojiDeleteDate.getFullYear()} à ${emojiDeleteDate.getHours()}:${emojiDeleteDate.getMinutes()}`)
            .setTimestamp()

        

        emoji.guild.channels.cache.get(config.channel.logID).send({ embeds : [emojiEmbed] });
    
    }
}

module.exports = EmojiDeleteListener; 