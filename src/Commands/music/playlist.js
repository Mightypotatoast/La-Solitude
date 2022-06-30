const { MessageEmbed, CommandInteraction } = require("discord.js");
const { errorEmbed, setChannelEmbed } = require("../../util/Embeds");
const db = require("../../Models/channels");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Playlist")
        .setDescription("Affiche vos playlist"),

    async execute(message) {
        //! NE SERT A RIEN
    },
};
