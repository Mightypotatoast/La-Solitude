const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class ThreadUpdateListener extends Listener {
    constructor() {
        super('threadUpdate', {
            emitter: 'client',
            event: 'threadUpdate'
        });
    }

    exec(oldThread, newThread) {
        
        
    }
}

module.exports = ThreadUpdateListener; 