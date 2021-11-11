const { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {

    name: "kick",
    description: "Kick a user from the server.",
    permission: "KICK_MEMBERS",

    options: [
        {
            name: "user",
            description: "The user to kick.",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "The reason for the kick.",
            type: "STRING",
            required: false
        }
    ],
    
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

    async execute(interaction) {
        
    }
}