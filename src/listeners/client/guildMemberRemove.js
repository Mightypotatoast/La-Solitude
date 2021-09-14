const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member) {
        console.log(`${member.username} a quitté le serveur` );
    }
}

module.exports = ReadyListener;