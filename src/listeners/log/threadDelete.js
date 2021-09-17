const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class ThreadDeleteListener extends Listener {
    constructor() {
        super('threadDelete', {
            emitter: 'client',
            event: 'threadDelete'
        });
    }

    exec(thread) {
        
        
    }
}

module.exports = ThreadDeleteListener; 