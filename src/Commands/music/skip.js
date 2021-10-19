const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')

module.exports = {

    name: "skip",
    description: "Skip to the next music",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
        
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`⛔ **Erreur**: ⛔ | There is nothing in the queue right now!`)
        try {
            const song = queue.skip()
            message.reply(` Song skipped by ${message.user}! Now playing:\n${song.name}`)
        } catch (e) {
            message.reply(`⛔ **Erreur**: ⛔ | ${e}`)
        }
    }
}
