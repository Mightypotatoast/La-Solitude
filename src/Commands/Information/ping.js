

module.exports = {
    
    name: "ping",
    description: "Retourne le ping du bot",
    permission: "ADMINISTRATOR",
    active:true,

    execute(message, client) {
        try {
            message.reply({embeds: [{color : 0xFFFFFF,description : "Calcul du ping en cours ..."}], ephemeral: true, fetchReply : true})
                .then(m => {
                    message.editReply(
                        {
                            embeds: [
                                {
                                    description: `Latence du Bot : ${m.createdTimestamp - message.createdTimestamp} ms , Latence de l'API : ${client.ws.ping}  ms`
                                }
                            ]
                        }
                    )
                })
            
        }catch (e){
            console.log(e)
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}
