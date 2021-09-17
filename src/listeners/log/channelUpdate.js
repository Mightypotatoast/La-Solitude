const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

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