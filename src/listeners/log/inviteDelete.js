const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

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