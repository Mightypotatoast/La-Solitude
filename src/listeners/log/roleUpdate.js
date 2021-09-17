const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class RoleUpdateListener extends Listener {
    constructor() {
        super('roleUpdate', {
            emitter: 'client',
            event: 'roleUpdate'
        });
    }

    exec(oldRole, newRole) {
        
        
        
    }
}

module.exports = RoleUpdateListener; 