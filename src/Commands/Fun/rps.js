const { errorEmbed} = require("../../util/Embeds")


module.exports = {

    name: "rps",
    description: "Play Rock Paper Scissors with the bot or someone else",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "user",
            description: "The user to play against",
            type: "USER",
            required: false,
        }
    ],

    async execute(message, client) {
        
        


    }
}
