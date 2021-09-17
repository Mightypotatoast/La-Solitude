const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    exec(message) {
        

    
    }
}

module.exports = MessageDeleteListener; 