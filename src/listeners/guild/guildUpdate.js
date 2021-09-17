const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class guildUpdateListener extends Listener {
    constructor() {
        super('guildUpdate', {
            emitter: 'client',
            event: 'guildUpdate'
        });
    }

    exec(oldGuild,newGuild) {
        
    client.on('ready', () => {
        console.log(null);
    });
    }
}

module.exports = guildUpdateListener; 