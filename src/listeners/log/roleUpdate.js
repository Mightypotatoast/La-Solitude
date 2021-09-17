const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

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