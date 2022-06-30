const { MessageEmbed, CommandInteraction } = require("discord.js");
const { errorEmbed, setChannelEmbed } = require("../../util/Embeds");
const db = require("../../Models/channels");

module.exports = {
    name: "playlist",
    description: "Affiche vos playlist disponible",
    permission: "ADMINISTRATOR",
    active: true,
    /**
     *
     * @param {CommandInteraction} message
     */
    async execute(message) {
        //! NE SERT A RIEN
    },
};
