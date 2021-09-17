const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {
        
        console.log(`\t---> ${message.author.username} says "${message.content}" in #${message.channel.name}`)
    
    }
}

module.exports = MessageListener;