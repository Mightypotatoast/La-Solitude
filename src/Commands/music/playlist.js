const { MessageEmbed, CommandInteraction } = require("discord.js");
const { errorEmbed, setChannelEmbed } = require("../../util/Embeds");
const db = require("../../Models/channels");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Affiche vos playlist"),

    async execute(message) {
        //! NE SERT A RIEN
    },
};
