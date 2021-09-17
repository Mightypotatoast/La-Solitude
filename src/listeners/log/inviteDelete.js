const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class InviteDeleteListener extends Listener {
    constructor() {
        super('inviteDelete', {
            emitter: 'client',
            event: 'inviteDelete'
        });
    }

    exec(invite) {
        
        console.log("");
    
    }
}

module.exports = InviteDeleteListener; 