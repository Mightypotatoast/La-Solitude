const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class InviteCreateListener extends Listener {
    constructor() {
        super('inviteCreate', {
            emitter: 'client',
            event: 'inviteCreate'
        });
    }

    exec(invite) {
        
        console.log("");
    
    }
}

module.exports = InviteCreateListener; 