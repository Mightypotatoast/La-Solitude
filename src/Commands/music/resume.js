const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')

module.exports = {

    name: "resume",
    description: "Resume music",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
        
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`⛔ **Erreur**: ⛔ | There is nothing in the queue right now!`)
        if (queue.paused) {
            queue.resume()
            return message.reply("Resumed the song for you :)")
        }
        queue.pause()
        message.reply("Paused the song for you :)")
    }
}