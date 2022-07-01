const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const { musicEmbed, errorEmbed } = require("../../util/Embeds"); //!provisoir, a retirer quand Handler pour Select menu sera présent

module.exports = {
    name: "interactionCreate",

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @returns
     */
    async execute(interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        } else if (interaction.isSelectMenu()) {
            //TODO a modifer/mettre en place un handler pour les SelectMenu
            try {
                if (interaction.customId !== "remove") return;
                await interaction.deferReply();
                const queue = client.distube.getQueue(interaction);
                const songId = interaction.values[0];
                queue.songs.splice(songId, 1);

                await interaction.followUp({
                    embeds: [
                        musicEmbed().setDescription(
                            `${interaction.user} a supprimé la musique [${queue.songs[songId].name}](${queue.songs[songId].url}) de la file d'attente`
                        ),
                    ],
                });

                interaction.message.delete();
                //interaction.message.resolveComponent(interaction.customId).setDisabled(true) //!wtf pk ca marche pas
            } catch (e) {
                console.error(e);
                interaction.editReply({
                    embeds: [errorEmbed().setDescription(`ALED : \n${e}`)],
                    ephemeral: true,
                });
            }
        }
    },
};
