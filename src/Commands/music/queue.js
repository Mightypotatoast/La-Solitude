const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')
const { errorEmbed, musicEmbed, musicButtonRow } = require("../../util/Embeds")

module.exports = {

    name: "queue",
    description: "Display the queue",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
    
        

        try {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")

        let playingEmbed =  musicEmbed()
            .addField(`Queue:`, `${q}`, true)
    
        message.reply({ embeds: [playingEmbed],components: [musicButtonRow()] , ephemeral: true })
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }



        
    }
}