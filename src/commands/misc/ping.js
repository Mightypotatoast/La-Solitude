

module.exports = {
    
    name: "ping",
    description: "Reply the bot ping",
    permission: "ADMINISTRATOR",


    async execute(message, client) {

        const messagePing = await message.reply({embeds: [{

            color : 0xFFFFFF,
            description : "Calculating ping ..."

       }]})

       const ping = Date.now() - message.createdTimestamp

        await message.editReply({

            embeds: [{
                description: `Bot latency : ${ping} ms , API Latency : ${client.ws.ping}  ms`
            }]

        })
       


    }
}
