const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Joue à pile ou face"),

    async execute(message) {
        try {
            let coin = Math.floor(Math.random() * 2);

            const coinEmbed = new EmbedBuilder()
                .setColor("#E1A741")
                .setAuthor({
                    name: "Pile ou Face",
                    iconURL: "https://www.pngall.com/wp-content/uploads/4/Dollar-Gold-Coin-PNG.png"
                })
                .setDescription(
                    `${message.user} a lancé une pièce et a obtenu un ${
                        coin === 0 ? "Pile" : "Face"
                    }`
                )
                .setTimestamp();

            message.reply({ embeds: [coinEmbed] });
        } catch (error) {
            console.log(error);
            message.reply({
                embeds: [errorEmbed().setDescription(`${error}`)],
                ephemeral: true,
            });
        }
    },
};
