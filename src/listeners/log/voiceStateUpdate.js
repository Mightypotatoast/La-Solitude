const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

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