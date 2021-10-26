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
                    name: "Bass Boost",
                    value: 1
                },
                {
                    name: "Echo",
                    value: 2
                },
                {
                    name: "Karaoke",
                    value: 3
                },
                {
                    name: "Nightcore",
                    value: 4
                },
                {
                    name: "VaporWave",
                    value: 5
                },
                {
                    name: "Flanger",
                    value: 6
                },
                {
                    name: "Gate",
                    value: 7
                },
                {
                    name: "Haas",
                    value: 8
                },
                {
                    name: "Reverse",
                    value: 9
                },
                {
                    name: "Surround",
                    value: 10
                },
                {
                    name: "Mcompand",
                    value: 11
                },
                {
                    name: "Phaser",
                    value: 12
                },
                {
                    name: "Earwax",
                    value: 13
                },
            ]

        }
    ],
    async execute(message, client) {
        try {
            filterList = [false, "bassboost", "echo", "3d", "karaoke", "nightcore", "vaporwave",
             "flanger", "gate", "haas", "reverse", "surrond", "mcompand", "phaser", "tremolo", "earwax"]

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