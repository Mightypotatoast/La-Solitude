const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')
const { errorEmbed, musicEmbed } = require("../../util/Embeds")

module.exports = {

    name: "previous",
    description: "Skip to the previous music",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
        
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
        if (queue.previousSongs[0] === undefined) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing next in queue right now !`)], ephemeral: true })
        try {

            
            const song = queue.previous()
            message.reply(` Song skipped by ${message.user}! Now playing:\n${song.name}`)
        } catch (e) {
            message.reply(`⛔ **Erreur**: ⛔ | ${e}`)
        }
    }
}
