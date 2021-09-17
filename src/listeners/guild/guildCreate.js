const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class guildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    exec(guild) {
        
        console.log('--------------------------------------------------------')
        console.log('!!!! LE BOT A REJOINT UN NOUVEAU SERVEUR !!!!\n')
        console.log(`NOM : ${guild.name}`)
        console.log(`NOMBRE DE MEMBRES : ${guild.membersCount}`)
        console.log('--------------------------------------------------------')

    }
}

module.exports = guildCreateListener; 