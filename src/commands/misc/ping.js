const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'] 
        });
    }

    async exec(message) {
       var pingMessage = await message.reply({embeds: [{

            color : 0xFF6800,
            description : "Calculating ping ..."

       }]}).then( (resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

           resultMessage.edit({embeds:[{description : `Bot latency : ${ping} ms , API Latency : ${this.client.ws.ping}  ms`}]})
       });


    }
}

module.exports = PingCommand;