const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class MessageUpdateListener extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    exec(oldMessage, newMessage) {
        
        if (newMessage.channel.id === config.channel.logID) return;
        if (oldMessage.content === newMessage.content) return;
        

        const messageEmbed = new MessageEmbed()
            .setTitle("Un message a été modifié !")
            .setColor("#3CE7E7")
            .addField('Auteur', newMessage.member.user.username)
            .addField('Channel', newMessage.channel.name,true)
            .addField('Ancien Message', (oldMessage.content == null || oldMessage.content == "") ? "`il n'y a pas de message`" : oldMessage.content)
            .addField('Nouveau Message', (newMessage.content == null || newMessage.content == "") ? "`il n'y a pas de message`" : newMessage.content)
            .addField('URL', newMessage.url)
            .setTimestamp()
          
        
        
        
        newMessage.guild.channels.cache.get(config.channel.logID).send({ embeds : [messageEmbed] });
    
    }
}

module.exports = MessageUpdateListener;