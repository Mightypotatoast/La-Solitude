const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Affiche les informations de l'utilisateur"),

    async execute(interaction) {
        const target = await interaction.guild.members.fetch(
            interaction.targetId
        );

        const userMessage = new MessageEmbed()
            .setColor("AQUA")
            .setAuthor(
                target.user.tag,
                target.user.avatarURL({ dynamic: true, size: 512 })
            )
            .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription("Informations sur " + target)
            .addField("ID :", `${target.user.id}`)
            .addField(
                "Rôles :",
                `${
                    target.roles.cache
                        .map((r) => r)
                        .join(" ")
                        .replace("@everyone", "") || "`Rien`"
                }`
            )
            .addField(
                "Membre depuis :",
                `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
                true
            )
            .addField(
                "Utilise Discord depuis :",
                `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
                true
            );

        interaction.reply({ embeds: [userMessage], ephemeral: true });
    },
};
