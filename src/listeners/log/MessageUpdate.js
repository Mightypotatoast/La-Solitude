const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class MessageUpdateListener extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    exec(oldMessage, newMessage) {
        
        
    
    }
}

module.exports = MessageUpdateListener;