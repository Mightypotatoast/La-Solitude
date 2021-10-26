const { errorEmbed, musicEmbed} = require("../../util/Embeds")

module.exports = {
    name: "repeat",
    aliases: ["loop"],
    description: "Repeat mode",
    type : 1,
    inVoiceChannel: true,
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "mode",
            description: `Type of repeat mode (0 is disabled, 1 is repeating a song, 2 is repeating all the queue).`,
            type: 4,
            required: true,
            choices: [

                {
                    name: "Disabled",
                    value: 0
                },
                {
                    name: "Song only",
                    value: 1
                },
                {
                    name: "whole Queue",
                    value: 2
                }
            ]

        }
    ],
    async execute(message, client) {
        try {
            mode = message.options.getInteger('mode')
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing to play :( !`)], ephemeral: true })
            mode = queue.setRepeatMode(mode)
            mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"

            message.reply({
                    embeds: [
                    musicEmbed()
                    .setDescription(`🔁 | ${message.user} has set repeat mode to ${mode}`)
                ]})
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}