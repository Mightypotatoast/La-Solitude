const { EmbedBuilder, CommandInteraction, SlashCommandBuilder} = require("discord.js");
const { errorEmbed, setChannelEmbed } = require("../../util/Embeds");
const db = require("../../Models/channels");
 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Affiche vos playlist"),

    async execute(message) {
        //! NE SERT A RIEN
    },
};
