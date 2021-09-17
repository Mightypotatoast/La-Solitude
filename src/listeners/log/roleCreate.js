const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

class RoleCreateListener extends Listener {
    constructor() {
        super('roleCreate', {
            emitter: 'client',
            event: 'roleCreate'
        });
    }

    exec(role) {
        
        
    }
}

module.exports = RoleCreateListener; 
