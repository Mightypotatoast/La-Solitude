const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

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