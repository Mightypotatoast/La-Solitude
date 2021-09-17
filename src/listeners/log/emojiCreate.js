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
            .setDescription('**Créer par** : '+`${await emoji.author.username}`+'\n'+' **Date** : '+`${emojiDate.getDate()}/${emojiDate.getMonth()+1}/${emojiDate.getFullYear()} à ${emojiDate.getHours()}:${emojiDate.getMinutes()}` )
            .addField('Nom', emoji.name)
            .addField('Animé ?', (emoji.animated) ? "Oui":"Non")
            .addField('ID', emoji.id)
            .setTimestamp()

        

        emoji.guild.channels.cache.get(config.channel.logID).send({ embeds : [emojiEmbed] });
    
 
    }
}

module.exports = EmojiCreateListener; 