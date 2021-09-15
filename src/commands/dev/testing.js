const { Command } = require('discord-akairo');

class TestingCommand extends Command {
    constructor() {
        super('testing', {
           aliases: ['testing'] 
        });
    }

    exec(message) {

        this.emit("GuildMemberAdd", message.member)

    }
}

module.exports = TestingCommand;