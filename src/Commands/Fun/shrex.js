const { errorEmbed, musicEmbed} = require("../../util/Embeds")



function codeblock(code) {
    return `\`\`\`${code}\`\`\``;
}


module.exports = {

    name: "shrex",
    description: "Display Shrex in chat",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
        try{
            message.reply(codeblock("⣿⣿⣿⣿⠋⢩⢹⣿⣿⣿⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⡧⣦⠄⢧⡙⢿⣟⢁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⢿\n⣿⣿⣿⣷⣶⣶⣦⡈⠂⠄⠸⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠉⠰⢠⣼\n⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⢒⣂⠄⠙⢿⣿⣿⡿⠛⢛⣻⣿⣿⡟⢁⣠⣴⣶⣶\n⣿⣿⣿⣿⣿⣿⣿⠇⢇⡄⣆⣤⣀⣦⡄⢈⣉⣛⣭⡀⠙⠭⡛⠿⣿⣻⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⠄⠄⣿⣿⣿⣿⣿⢃⣿⣿⣿⣿⣿⣶⣷⡾⣼⣿⠈⠉⠄⠄⠈\n⣿⣿⣿⣿⣿⣿⡇⠄⠄⢿⣿⣿⣿⣥⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠄⠄⠄⠄\n⣿⣿⣿⣿⡿⠋⠄⠄⠄⢸⣿⡿⠿⠄⠈⠛⢟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠄⠄⠄\n⣿⣿⣿⠟⠁⠄⠄⠄⠄⠄⢠⣄⣀⡲⢦⣤⣼⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠄⠄\n⠛⠋⠄⠄⠄⠄⠄⠄⠄⠄⠈⢿⣟⠻⠿⣿⣿⣿⣷⣾⣿⣿⣿⣿⢿⣿⣿⡇⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠻⣷⣶⣾⣿⣿⣿⣿⣿⣿⠟⢡⣿⣿⣿⡟⠄⠄\n⣦⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣉⣹⣿⣿⣿⣿⠟⠁⣰⣿⣿⣿⣿⡇⠄⠄\n⣿⣧⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠉⠉⠙⠛⠉⠁⢀⣼⣿⣿⣿⣿⡟⠄⠄⠄"))
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}
