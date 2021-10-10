

module.exports = {
    
    name: "ping",
    description: "Reply the bot ping",
    permission: "VIEW_CHANNEL",
    aliases: ['ping'],


    async execute(message) {
       var pingMessage = await message.reply({embeds: [{

            color : 0xFF6800,
            description : "Calculating ping ..."

       }]}).then( (resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

           resultMessage.edit({embeds:[{description : `Bot latency : ${ping} ms , API Latency : ${this.client.ws.ping}  ms`}]})
       });


    }
}
