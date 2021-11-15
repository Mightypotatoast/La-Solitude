const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { connection } = require("mongoose");

module.exports = {
    name: "status",
    description: "Get the status of the bot and the database connection.",
    permission: "ADMINISTRATOR",
    active: true,

    /**
     * 
     * @param {CommandInteraction} message 
     * @param {Client} client
     */
    async execute(message, client) {
        const Response = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("🤖 --- Bot Status --- 🤖")
            .addField("Client :", `\`🟢 ONLINE\` - \`${client.ws.ping} ms\``, true)
            .addField("Database :", `\`${getStatus(connection.readyState)}\``, true)
            .addField("Uptime", `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, true)
            .setTimestamp()
        
        message.reply({ embeds: [Response] });
     }
}

function getStatus(val) {
    let status = ""

    switch (val) {
        case 0:
            status = `🔴 DISCONNECTED`;
            break;
        case 1:
            status = `🟢 CONNECTED`;
            break;
        case 2:
            status = `🟠 CONNECTING`;
            break;
        case 3:
            status = `🔵 DISCONNECTING`;
            break;
        
    }
    return status;
}