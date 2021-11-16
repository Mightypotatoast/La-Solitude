const { CommandInteraction } = require("discord.js");
const { errorEmbed, successEmbed } = require("../../util/Embeds");

module.exports = {
    name: "reload",
    description: "Reloads all commands",
    permission: "ADMINISTRATOR",
    active: true,
    
    /**
     * 
     * @param {CommandInteraction} message 
     */
    async execute(message) {
        
    }
}