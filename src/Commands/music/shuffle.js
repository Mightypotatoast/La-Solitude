const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')
const { errorEmbed, musicEmbed } = require("../../util/Embeds")

module.exports = {
    name: "shuffle",
    description: "Shuffle the queue",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
        
        try {
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            queue.shuffle()

            message.reply({
                embeds: [
                musicEmbed()
                .setDescription(`🔀 | ${message.user} Shuffled the queue !`)
            ]})
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}