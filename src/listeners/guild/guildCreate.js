const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class guildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    exec(guild) {
        
    
    }
}

module.exports = guildCreateListener; 