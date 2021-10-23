const { errorEmbed, musicEmbed} = require("../../util/Embeds")

module.exports = {
    
    //! la commande fonctionne pour des petits nombre mais pas pour les grand (genre 300secondes)

    name: "remove",
    description: "remove a music from the queue",
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "id",
            description: `Nuumber of place the song has in the queue`,
            type: "NUMBER",
            required: true,
        }
    ],
    
    async execute(message, client) {
        try {
            
            let removeNumber = message.options.getNumber("id")
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            if (queue.songs[removeNumber] === undefined) return message.reply({ embeds: [errorEmbed().setDescription(`No song with this id exist !`)], ephemeral: true })
            
            message.reply({
                embeds: [
                musicEmbed()
                .setDescription(`${message.user} removed [${queue.songs[removeNumber].name}](${queue.songs[removeNumber].url}) from the queue!`)
            ]})
            
            queue.songs.splice(removeNumber, 1)
            
           
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }

    }
}