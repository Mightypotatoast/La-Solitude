const { SlashCommandBuilder } = require("@discordjs/builders");
const { ContextMenuCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Hot Combien ... tu suce ton père ?"),

    async execute(interaction) {
        const target = await interaction.guild.members.fetch(
            interaction.targetId
        );

        const userMessage = new EmbedBuilder()
            .setAuthor(
                "Avatar de " + target.user.tag,
                target.user.displayAvatarURL({ format: "png" })
            )
            .setImage(target.user.avatarURL({ dynamic: true, format: "png" }))
            .setTimestamp();

        interaction.reply({ embeds: [userMessage], ephemeral: true });
    },
};
