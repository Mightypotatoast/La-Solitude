const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class ChannelDeleteListener extends Listener {
    constructor() {
        super('channelDelete', {
            emitter: 'client',
            event: 'channelDelete'
        });
    }

    exec(channel) {
        
    
    }
}

module.exports = ChannelDeleteListener; 