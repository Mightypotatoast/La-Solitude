const { errorEmbed, musicEmbed } = require("../../util/Embeds");

module.exports = {
    name: "filters",
    description: "Applique des filtres à la musique",
    type: 1,
    inVoiceChannel: true,
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "filter",
            description: `Le filtre à appliquer`,
            type: 4,
            required: true,
            choices: [
                {
                    name: "Désactiver",
                    value: 0,
                },
                {
                    name: "3D",
                    value: 1,
                },
                {
                    name: "BassBoosted",
                    value: 2,
                },
                {
                    name: "Echo",
                    value: 3,
                },
                {
                    name: "Karaoké",
                    value: 4,
                },
                {
                    name: "NightCore",
                    value: 5,
                },
                {
                    name: "VaporWave",
                    value: 6,
                },
                {
                    name: "Flanger",
                    value: 7,
                },
                {
                    name: "Gate",
                    value: 8,
                },
                {
                    name: "Haas",
                    value: 9,
                },
                {
                    name: "Reverse",
                    value: 10,
                },
                {
                    name: "Surround",
                    value: 11,
                },
                {
                    name: "Mcompand",
                    value: 12,
                },
                {
                    name: "Phaser",
                    value: 13,
                },
                {
                    name: "Tremolo",
                    value: 14,
                },
                {
                    name: "Earwax",
                    value: 15,
                },
            ],
        },
    ],
    async execute(message, client) {
        try {
            filterList = [
                false,
                "3d",
                "bassboost",
                "echo",
                "karaoke",
                "nightcore",
                "vaporwave",
                "flanger",
                "gate",
                "haas",
                "reverse",
                "surround",
                "mcompand",
                "phaser",
                "tremolo",
                "earwax",
            ];

            filterNumber = message.options.getInteger("filter");
            const queue = client.distube.getQueue(message);
            if (!queue)
                return message.reply({
                    embeds: [
                        errorEmbed().setDescription(
                            `Aucune musique n'est joué actuellement 😕 !`
                        ),
                    ],
                    ephemeral: true,
                });
            queue.setFilter(filterList[filterNumber]);

            message.reply({
                embeds: [
                    musicEmbed().setDescription(
                        `🔊 | ${message.user} a appliqué le filtre \`${
                            filterList[filterNumber] || "Désactiver"
                        }\` à la musique !`
                    ),
                ],
            });
        } catch (e) {
            message.reply({
                embeds: [errorEmbed().setDescription(`${e}`)],
                ephemeral: true,
            });
        }
    },
};
