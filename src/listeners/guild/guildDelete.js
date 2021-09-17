const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    exec(guild) {
        
    
    }
}

module.exports = GuildDeleteListener; 