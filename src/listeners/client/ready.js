const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec(bot) {
        var memberCount = bot.users.cache.size;
        var guildCount = bot.guilds.cache.size;
        console.log("--------------------------------------");
        console.log('[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Le préfix actuelle:  ' + process.env.PREFIX + "\n[!]Nombre de serveurs: " + guildCount + "\n[!]Nombre de membres: " + memberCount + '\n');
    }
}

module.exports = ReadyListener;