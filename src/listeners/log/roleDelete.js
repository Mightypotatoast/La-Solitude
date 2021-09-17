const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class RoleDeleteListener extends Listener {
    constructor() {
        super('roleDelete', {
            emitter: 'client',
            event: 'roleDelete'
        });
    }

    exec(role) {
        
        
        
    }
}

module.exports = RoleDeleteListener; 