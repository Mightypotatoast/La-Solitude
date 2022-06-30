const { errorEmbed, musicEmbed } = require("../../util/Embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Filters")
        .setDescription("Applique des filtres à la musique")
        .addStringOption((option) =>
            option
                .setName("filtres")
                .setDescription("les filtres disponibles")
                .setRequired(true)
                .addChoices(
                    { name: "Désactiver", value: false },
                    { name: "3D", value: "1" },
                    { name: "BassBoosted", value: "2" },
                    { name: "Echo", value: "3" },
                    { name: "Karaoké", value: "4" },
                    { name: "NightCore", value: "5" },
                    { name: "VaporWave", value: "6" },
                    { name: "Flanger", value: "7" },
                    { name: "Gate", value: "8" },
                    { name: "Haas", value: "9" },
                    { name: "Reverse", value: "10" },
                    { name: "Reverse", value: "11" },
                    { name: "Surround", value: "12" },
                    { name: "Mcompand", value: "13" },
                    { name: "Phaser", value: "14" },
                    { name: "Tremolo", value: "15" },
                    { name: "Earwax", value: "16" }
                )
        ),

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
