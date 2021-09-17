const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    exec(guild) {
        
        console.log('--------------------------------------------------------')
        console.log('<3 <3 <3 LE BOT A QUITTE UN SERVEUR <3 <3 <3\n')
        console.log(`NOM : ${guild.name}`)
        console.log(`NOMBRE DE MEMBRES : ${guild.membersCount}`)
        console.log('--------------------------------------------------------')

    }
}

module.exports = GuildDeleteListener; 