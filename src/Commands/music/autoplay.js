const { errorEmbed, musicEmbed } = require("../../util/Embeds");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("autoplay")
        .setDescription(
            "Si activé, le Bot jouera une musique recommandée par Youtube quand la file d'attente sera vide"
        ),

    async execute(message, client) {
        try {
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
            const autoplay = queue.toggleAutoplay();
            message.reply({
                embeds: [
                    musicEmbed().setDescription(
                        `♻️ | ${message.user} a défini l'autoplay sur \`${
                            autoplay ? "On" : "Off"
                        }\``
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
