const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class ChannelUpdateListener extends Listener {
    constructor() {
        super('channelUpdate', {
            emitter: 'client',
            event: 'channelUpdate'
        });
    }

    exec(oldChannel, newChannel) {
        
    
    }
}

module.exports = ChannelUpdateListener; 