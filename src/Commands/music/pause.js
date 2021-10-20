const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')
const { errorEmbed, musicEmbed } = require("../../util/Embeds")

module.exports = {

    name: "pause",
    description: "Pause/Resume music",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
        
        try{
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            if (queue.paused) {
                queue.resume()
                return message.reply({
                    embeds: [
                    musicEmbed()
                    .setDescription(`${message.user} Resumed the song...`)
                    ]})
            }
            queue.pause()
            
            message.reply({
            embeds: [
            musicEmbed()
            .setDescription(`${message.user} Paused the song...`)
            ]})

        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}