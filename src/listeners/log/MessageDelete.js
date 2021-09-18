const { Listener } = require('discord-akairo');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const config = require('../../config.json')

class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    exec(message) {

        if (message.channel.id === config.channel.logID) return;
        
        const messageEmbed = new MessageEmbed()
            .setTitle("Un message a été supprimé !")
            .setColor("#E73C3C")
            .addField('Channel', message.channel.name)
            .addField('Message', (message.content == null) ? "`il n'y avait pas de message`" : message.content)
            .addField('Attachment', (message.attachments.size == 0) ? "`il n'y avait pas de d'attachement`" : (message.attachments.size > 1) ? "plusieurs" : "1",)
            .addField('Threaded ?', (message.hasThread) ? "Oui" : "Non", true)
            .addField('TTS ?', (message.tts) ? "Oui" : "Non", true)
            .addField('URL', message.url)
            .setImage((message.attachments.size == 0) ? null : `${message.attachments.first().url}`)
            .setTimestamp()
          
        message.guild.channels.cache.get(config.channel.logID).send({ embeds : [messageEmbed] });

    
    }
}

module.exports = MessageDeleteListener; 