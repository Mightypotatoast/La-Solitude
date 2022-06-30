const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const { options } = require("snekfetch");
const { errorEmbed, musicEmbed } = require("../../util/Embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Remove")
        .setDescription("Supprime une musique de la file d'attente"),

    async execute(message, client) {
        try {
            const queue = client.distube.getQueue(message);
            if (!queue)
                return message.editReply({
                    embeds: [
                        errorEmbed().setDescription(
                            `La file d'attente est actuellement vide !`
                        ),
                    ],
                    ephemeral: true,
                });
            //numberOfSelectNeeded = math.ceil(queue.songs.length/25)

            //TODO ajouter plusieurs SelectMenu if queue.songs.length-1 >= 25
            //! [EWEN] Si jamais je l'ai deja fait dans le fichier /Commands/Developper/commands.js ligne 84 --> ligne 98

            await message.reply({
                embeds: [musicEmbed().setDescription("⏳ Chargement ...")],
            });

            const optionMenu = await queue.songs.map((song, i) => {
                return {
                    label: song.name,
                    value: i.toString(),
                };
            });

            const row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("remove")
                    .setMaxValues(1)
                    .setPlaceholder("Sélectionnez une musique à supprimer")
                    .addOptions(optionMenu.slice(0, 24))
            );

            message.editReply({
                embeds: [
                    musicEmbed().setDescription(
                        `Sélectionner une ou plusieurs musiques à supprimer ci-dessous ⤵️`
                    ),
                ],
                components: [row],
                ephemeral: true,
            });

            //queue.songs.splice(removeNumber, 1)
        } catch (e) {
            console.log(e);
            message.editReply({
                embeds: [errorEmbed().setDescription(`${e}`)],
                ephemeral: true,
            });
        }
    },
};
