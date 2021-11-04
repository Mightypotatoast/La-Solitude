const { errorEmbed, musicEmbed} = require("../../util/Embeds")

module.exports = {
    name: "filters",
    description: "Enable sound filter (bassboost for exemple)",
    type : 1,
    inVoiceChannel: true,
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "filter",
            description: `What filter to enable.`,
            type: 4,
            required: true,
            choices: [

                {
                    name: "Disabled",
                    value: 0
                },
                {
                    name: "3d",
                    value: 1
                },
                {
                    name: "bassboost",
                    value: 2
                },
                {
                    name: "echo",
                    value: 3
                },
                {
                    name: "karaoke",
                    value: 4
                },
                {
                    name: "Nightcore",
                    value: 5
                },
                {
                    name: "VaporWave",
                    value: 6
                },
                {
                    name: "Flanger",
                    value: 7
                },
                {
                    name: "Gate",
                    value: 8
                },
                {
                    name: "Haas",
                    value: 9
                },
                {
                    name: "Reverse",
                    value: 10
                },
                {
                    name: "Surround",
                    value: 11
                },
                {
                    name: "Mcompand",
                    value: 12
                },
                {
                    name: "Phaser",
                    value: 13
                },
                {
                    name: "tremolo",
                    value: 14
                },
                {
                    name: "Earwax",
                    value: 15
                },
            ]

        }
    ],
    async execute(message, client) {
        try {
            filterList = [false, "3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave",
             "flanger", "gate", "haas", "reverse", "surround", "mcompand", "phaser", "tremolo", "earwax"]

            filterNumber = message.options.getInteger('filter')
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing to play :( !`)], ephemeral: true })
            queue.setFilter(filterList[filterNumber])
            

            message.reply({
                    embeds: [
                    musicEmbed()
                    .setDescription(`🔊 | ${message.user} has set filter to ${filterList[filterNumber]}`)
                ]})
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}