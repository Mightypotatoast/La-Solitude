const { Command } = require('discord-akairo');


class TestingCommand extends Command {
    constructor() {
        super('testing', {
           aliases: ['testing'],
           ownerOnly: true
           
        });
    }

    exec(message) {

        this.client.emit("guildMemberAdd", message.member)
        this.client.emit("guildMemberRemove", message.member)

    }
}

module.exports = TestingCommand;