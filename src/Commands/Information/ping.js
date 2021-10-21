

module.exports = {
    
    name: "ping",
    description: "Reply the bot ping",
    permission: "ADMINISTRATOR",
    active:true,

    execute(message, client) {
        try {
            message.reply({embeds: [{color : 0xFFFFFF,description : "Calculating ping ..."}], ephemeral: true, fetchReply : true})
                .then(m => {message.editReply({embeds: [{description: `Bot latency : ${m.createdTimestamp - message.createdTimestamp} ms , API Latency : ${client.ws.ping}  ms`}]})})
        }catch (e){
            console.log(e)
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}
