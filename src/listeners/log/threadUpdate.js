const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

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