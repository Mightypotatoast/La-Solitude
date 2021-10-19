const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')

module.exports = {
    name: "repeat",
    aliases: ["loop"],
    description: "Repeat mode",
    inVoiceChannel: true,
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "mode",
            description: `Type of repeat mode (0 is disabled, 1 is repeating a song, 2 is repeating all the queue).`,
            type: "INTEGER",
            required: true,
        }
    ],
    async execute(message, client) {
        mode = message.options.getInteger('mode')
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`⛔ **Erreur**: ⛔ | There is nothing playing!`)
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        message.reply(`🔁 | Set repeat mode to \`${mode}\``)
    }
}