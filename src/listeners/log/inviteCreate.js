const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

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