const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')

module.exports = {

    name: "shuffle",
    description: "Shuffle the queue",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
        
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`⛔ **Erreur**: ⛔ | There is nothing in the queue right now!`)
        queue.shuffle()
        message.reply(` 🔀 The queue has been shuffled :)`)
    }
}