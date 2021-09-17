const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class ChannelCreateListener extends Listener {
    constructor() {
        super('channelCreate', {
            emitter: 'client',
            event: 'channelCreate'
        });
    }

    exec(channel) {
        
    
    }
}

module.exports = ChannelCreateListener; 