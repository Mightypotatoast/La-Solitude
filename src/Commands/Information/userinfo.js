const { SlashCommandBuilder } = require("@discordjs/builders");
const { ContextMenuCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Affiche les informations de l'utilisateur"),

    async execute(interaction) {
        const target = await interaction.guild.members.fetch(
            interaction.targetId
        );

        const userMessage = new EmbedBuilder()
            .setColor("AQUA")
            .setAuthor(
                target.user.tag,
                target.user.avatarURL({ dynamic: true, size: 512 })
            )
            .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription("Informations sur " + target)
            .addFields(
                {
                    name: "ID :",
                    value: `${target.user.id}`
                },
                {
                    name :"Rôles :",
                    value: `${
                        target.roles.cache
                            .map((r) => r)
                            .join(" ")
                            .replace("@everyone", "") || "`Rien`"
                        }`
                },
                {
                    name: "Membre depuis :",
                    value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
                    inline: true
                },
                {
                    name: "Utilise Discord depuis :",
                    value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
                    inline: true
                }
            );

        interaction.reply({ embeds: [userMessage], ephemeral: true });
    },
};
