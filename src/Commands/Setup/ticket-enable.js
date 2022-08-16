const {
    CommandInteraction,
    EmbedBuilder,
    Client,
    ActionRowBuilder,
    ButtonBuilder,
} = require("discord.js");
const { errorEmbed, successEmbed } = require("../../util/Embeds");
const db = require("../../Models/channels");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-enable")
        .setDescription("Active le système de tickets."),

    /**
     *
     *
     * @param {CommandInteraction} message
     * @param {Client} client
     *
     */
    async execute(message, client) {
        await message.deferReply();

        const Owner = await message.guild.fetchOwner();
        const { guild } = message;

        if (!message.guild.me.permissions.has("MANAGE_GUILD"))
            return message.editReply({
                embeds: [
                    errorEmbed().setDescription(
                        "Je n'ai pas la permission `MANAGE_GUILD` pour utiliser cette commande."
                    ),
                ],
                ephemeral: true,
            });

        if (message.user.id !== Owner.id)
            return message.editReply({
                embeds: [
                    errorEmbed().setDescription(
                        "Seul le propriétaire du serveur peut utiliser cette commande."
                    ),
                ],
                ephemeral: true,
            });

        db.findOne({ GuildID: message.guild.id }, async (err, res) => {
            if (err)
                return message.editReply({
                    embeds: [
                        errorEmbed().setDescription(
                            `Une erreur est survenue: \`${err}\``
                        ),
                    ],
                    ephemeral: true,
                });

            if (res) {
                if (res.TicketSystem)
                    return message.editReply({
                        embeds: [
                            errorEmbed().setDescription(
                                "Le système de tickets est déjà activé."
                            ),
                        ],
                        ephemeral: true,
                    });
            } else {
                res = new db({
                    GuildID: message.guild.id,
                    TicketSystem: {},
                });
            }

            const ticketParentChannel = await message.guild.channels.create(
                "Système de Ticket",
                {
                    type: 4,
                    position: 0,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            allow: ["VIEW_CHANNEL"],
                            deny: ["SEND_MESSAGES"],
                        },
                        {
                            id: message.guild.roles.everyone,
                            allow: ["VIEW_CHANNEL"],
                            deny: ["SEND_MESSAGES"],
                        },
                    ],
                }
            );

            const openticketChannel = await message.guild.channels.create(
                "open-ticket",
                {
                    type: 0,
                    parent: ticketParentChannel.id,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            allow: ["VIEW_CHANNEL"],
                            deny: ["SEND_MESSAGES"],
                        },
                        {
                            id: message.guild.roles.everyone,
                            allow: ["VIEW_CHANNEL"],
                            deny: ["SEND_MESSAGES"],
                        },
                    ],
                }
            );
            const transcriptChannel = await message.guild.channels.create(
                "transcript",
                {
                    type: 0,
                    parent: ticketParentChannel.id,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            allow: ["VIEW_CHANNEL"],
                        },
                        {
                            id: message.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"],
                        },
                    ],
                }
            );

            res.TicketSystem = {
                ticketParentChannel: ticketParentChannel.id,
                openticketChannel: openticketChannel.id,
                transcriptChannel: transcriptChannel.id,
            };

            const Embed = new EmbedBuilder()
                .setAuthor(
                    `🎫 -- ${guild.name} | Système de Ticket -- 🎫`,
                    guild.iconURL({ dynamic: true, format: "png" })
                )
                .setColor("#0099ff")
                .setDescription(
                    `Ouvrir un ticket pour discuter de l'un des problèmes énumérés par les boutons ci-dessous.`
                )
                .setTimestamp();

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel("Signaler un membre")
                    .setCustomId("ticket-member")
                    .setStyle("Primary")
                    .setEmoji("🎫"),
                new ButtonBuilder()
                    .setLabel("Signaler un bug")
                    .setCustomId("ticket-bug")
                    .setStyle("Secondary")
                    .setEmoji("🐛"),
                new ButtonBuilder()
                    .setLabel("Autres")
                    .setCustomId("ticket-other")
                    .setStyle("Danger")
                    .setEmoji("📝")
            );

            message.guild.channels.cache
                .get(openticketChannel.id)
                .send({ embeds: [Embed], components: [row] });

            message.editReply({
                embeds: [
                    successEmbed().setDescription(
                        "Le système de tickets a été activé."
                    ),
                ],
                ephemeral: true,
            });

            res.save().catch((err) => {
                message.editReply({
                    embeds: [
                        errorEmbed().setDescription(
                            `Une erreur est survenue: \`${err}\``
                        ),
                    ],
                    ephemeral: true,
                });
            });
        });
    },
};
