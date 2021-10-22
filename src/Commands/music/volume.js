const { Message} = require('discord.js')
const { errorEmbed, musicEmbed, musicButtonRow } = require("../../util/Embeds")
module.exports = {

    name: "volume",
    description: "change the volume",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "value",
            description: `default is 50%`,
            type: 4,
            required: true,
        }
    ],
  
    async execute(message, client) {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
        try {
            const volume = message.options.getInteger('value')
            if (isNaN(volume)) return message.reply({ embeds: [errorEmbed().setDescription(`Please enter a valid number!`)], ephemeral: true })
            queue.setVolume(volume)
            
            message.reply({
                embeds: [
                musicEmbed()
                .setDescription(`${message.user}has set volume to ${volume}`)
                ]
            })

        } catch (e){
            console.log(e)
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}