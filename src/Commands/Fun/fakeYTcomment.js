const { errorEmbed } = require("../../util/Embeds");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args)); // eslint-disable-line
const {
    MessageEmbed,
    CommandInteraction,
    Client,
    MessageAttachment,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fakecomment")
        .setDescription("Créer un faux commentaire Youtube")
        .addStringOption((option) =>
            option
                .setName("commentaire")
                .setDescription("Que voulez-vous commenter sur Youtube ?")
                .setRequired(true)
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Le membre qui va commenter.")
                .setRequired(false)
        ),

    /**
     *
     * @param {CommandInteraction} message
     * @param {Client} client
     */

    async execute(message, client) {
        try {
            await message.deferReply().catch(() => {});

            let comment = message.options.getString("comment");
            let Target = message.options.getMember("user");

            if (!Target) Target = message.member;

            const fetchAPI = async () => {
                const response = await fetch(
                    `https://some-random-api.ml/canvas/youtube-comment?avatar=${Target.displayAvatarURL(
                        { format: "png" }
                    )}&username=${Target.user.username}&comment=${comment}`,
                    {
                        method: "GET",
                    }
                );
                return await response;
            };

            const data = await fetchAPI();

            const attach = new MessageAttachment(data.body, "img.png");

            const embed = new MessageEmbed()
                .setDescription(`**Le commentaire Youtube de ${Target}**`)
                .setColor("RED")
                .setImage(`attachment://img.png`)
                .setFooter(
                    `Requested by ${message.member.user.tag}`,
                    message.member.displayAvatarURL()
                )
                .setTimestamp();

            await message.editReply({ embeds: [embed], files: [attach] });
        } catch (err) {
            console.log(err);
            return message.editReply({
                embeds: [
                    errorEmbed().setDescription(`Une erreur est survenue`),
                ],
                ephemeral: true,
            });
        }
    },
};
