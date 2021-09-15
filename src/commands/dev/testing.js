const { Command } = require('discord-akairo');

class TestingCommand extends Command {
    constructor() {
        super('testing', {
           aliases: ['testing'],
           ownerOnly: false
           
        });
    }

    exec(message) {

        this.client.emit("guildMemberAdd", message.member)

    }
}

module.exports = TestingCommand;