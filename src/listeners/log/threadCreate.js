const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class ThreadCreateListener extends Listener {
    constructor() {
        super('threadCreate', {
            emitter: 'client',
            event: 'threadCreate'
        });
    }

    exec(thread) {
        
        
    }
}

module.exports = ThreadCreateListener; 