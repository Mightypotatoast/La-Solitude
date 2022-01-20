const { errorEmbed, musicEmbed } = require("../../util/Embeds");

module.exports = {
    //! la commande fonctionne pour des petits nombre mais pas pour les grand (genre 300secondes)

    name: "fastforward",
    aliases: ["ff"],
    description: "Avance la musique d'un certain nombre de secondes",
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "time",
            description: `Le nombre de secondes à avancer`,
            type: "INTEGER",
            required: true,
        },
    ],

    async execute(message, client) {
        try {
            timeToSkip = message.options.getInteger("time");
            const queue = client.distube.getQueue(message);
            if (!queue)
                return message.reply({
                    embeds: [
                        errorEmbed().setDescription(
                            `La file d'attente est actuellement vide !`
                        ),
                    ],
                    ephemeral: true,
                });
            queue.seek(timeToSkip);

            message.reply({
                embeds: [
                    musicEmbed().setDescription(
                        `La musique a été avancée de ${timeToSkip} secondes par ${message.member}!`
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
