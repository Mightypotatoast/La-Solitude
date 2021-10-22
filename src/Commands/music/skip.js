const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')
const { errorEmbed, musicEmbed } = require("../../util/Embeds")

module.exports = {
    name: "skip",
    description: "Skip to the next music",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {

        

        try { 
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            if (queue.songs[1] === undefined) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing next in queue right now !`)], ephemeral: true })

            const song = queue.skip()
            
            message.reply({
            embeds: [
            musicEmbed()
            .setDescription(` Song skipped by ${message.user}! Now playing:\n ${song.name}`)
            ]})
        } catch (e) { 
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}
