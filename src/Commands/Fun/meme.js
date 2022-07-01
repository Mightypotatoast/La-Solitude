const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
const delay = require("delay");
const { errorEmbed } = require("../../util/Embeds");

const MAX_MEME = 5;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Renvoie un meme")
        .addIntegerOption((option) =>
            option
                .setName("combien")
                .setDescription(
                    `Combien de meme voulez-vous ? | Maximum : ${MAX_MEME}`
                )
                .setRequired(false)
        ),

    async execute(message) {
        let memeNumber =
            message.options.getNumber("combien") === null
                ? 1
                : Math.floor(message.options.getNumber("combien"));

        if (memeNumber > MAX_MEME || memeNumber <= 0)
            return message.reply({
                embeds: [
                    errorEmbed().setDescription(
                        `Choisissez un nombre entre 1 et ${MAX_MEME}`
                    ),
                ],
                ephemeral: true,
            });

        for (let i = 0; i < memeNumber; i++) {
            let messageMeme;

            let data = await fetch(
                "http://meme-api.herokuapp.com/gimme/memes"
            ).then((res) => res.json());

            let embedReponse = new MessageEmbed()
                .setTitle(data.title)
                .setURL(data.postLink)
                .setColor("#00D7FF")
                .setFooter(data.ups + " Upvotes")
                .setTimestamp()
                .setImage(data.url);
            if (i == 0) {
                messageMeme = await message.reply({
                    embeds: [embedReponse],
                    fetchReply: true,
                });
            } else {
                messageMeme = await message.channel.send({
                    embeds: [embedReponse],
                    fetchReply: true,
                });
            }
            try {
                await messageMeme.react(
                    message.guild.emojis.cache.find(
                        (emoji) => emoji.name === "upvote"
                    )
                );
                await messageMeme.react(
                    message.guild.emojis.cache.find(
                        (emoji) => emoji.name === "downvote"
                    )
                );
            } catch (e) {
                console.log("Le serveur n'a pas les émojis !");
            }
        }
    },
};
