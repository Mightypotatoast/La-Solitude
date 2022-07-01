const {
    MessageEmbed,
    Util,
    CommandInteraction,
    Client,
} = require("discord.js");
const delay = require("delay");
const { errorEmbed } = require("../../util/Embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("emoji-steal")
        .setDescription("Vole un emoji venant d'un autre serveur")
        .addUserOption((option) =>
            option
                .setName("emoji")
                .setDescription(`Mettez vos émoji | Maximum : 10`)
                .setRequired(true)
        ),
    /**
     *
     * @param {CommandInteraction} message
     * @param {Client} client
     */

    async execute(message, client) {
        if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.reply({
                embeds: [
                    errorEmbed().setDescription(
                        "Vous n'avez pas la permission d'utiliser cette commande"
                    ),
                ],
            });

        let argsEmoji = message.options.getString("emoji");
        let emoji = [];

        emoji = argsEmoji.split("<");
        emoji.shift();

        for (let i = 0; i < emoji.length; i++) {
            emoji[i] = "<" + emoji[i];
        }

        let embedCreate = new MessageEmbed()
            .setColor("#25E325")
            .setTitle("Nouveaux émojis ")
            .setDescription(
                `**${emoji.length}** émojis ajoutés au serveur. (${
                    message.guild.emojis.cache.size + emoji.length
                }/50)`
            )
            .setTimestamp();

        try {
            await message.reply({
                embeds: [
                    {
                        description: "⏳ Envoie des émojis en cours ...",
                        color: 0xff6800,
                    },
                ],
            });

            if (emoji.length == 0) throw "Ce n'est pas un emoji valide";
            if (emoji.length >= 11)
                throw "Choose a maximum of 10 emojis per command";

            for (const rawEmoji of emoji) {
                const parsedEmoji = Util.parseEmoji(rawEmoji);

                if (
                    rawEmoji !== `<:${parsedEmoji.name}:${parsedEmoji.id}>` &&
                    rawEmoji !== `<a:${parsedEmoji.name}:${parsedEmoji.id}>`
                )
                    throw rawEmoji + " n'est pas un emoji valide";

                if (parsedEmoji.id) {
                    const extension = parsedEmoji.animated ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/emojis/${
                        parsedEmoji.id + extension
                    }`;

                    await message.guild.emojis.create(url, parsedEmoji.name);
                    await embedCreate.addField(
                        parsedEmoji.name,
                        `<${parsedEmoji.animated ? "a" : ""}:${
                            parsedEmoji.name
                        }:${parsedEmoji.id}>`,
                        true
                    );
                }
            }
            await delay("2000");
            await message.editReply({ embeds: [embedCreate] });
        } catch (e) {
            message.editReply({
                embeds: [errorEmbed().setDescription(`${e}`)],
            });
        }
    },
};
