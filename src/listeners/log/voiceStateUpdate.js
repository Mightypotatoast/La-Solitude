const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class VoiceStateUpdateListener extends Listener {
    constructor() {
        super('voiceStateUpdate', {
            emitter: 'client',
            event: 'voiceStateUpdate'
        });
    }

    exec(oldState, newState) {
        
        
    }
}

module.exports = VoiceStateUpdateListener; 