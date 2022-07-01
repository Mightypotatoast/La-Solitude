const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Hot Combien ... tu suce ton père ?"),

    async execute(interaction) {
        const target = await interaction.guild.members.fetch(
            interaction.targetId
        );

        const userMessage = new MessageEmbed()
            .setAuthor(
                "Avatar de " + target.user.tag,
                target.user.displayAvatarURL({ format: "png" })
            )
            .setImage(target.user.avatarURL({ dynamic: true, format: "png" }))
            .setTimestamp();

        interaction.reply({ embeds: [userMessage], ephemeral: true });
    },
};
