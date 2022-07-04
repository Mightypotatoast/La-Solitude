const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { connection } = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Affiche le statut du Bot et de la base de données"),

    /**
     *
     * @param {CommandInteraction} message
     * @param {Client} client
     */
    async execute(message, client) {
        const Response = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("🤖 --- Statut du Bot --- 🤖")
            .addField(
                "Client :",
                `\`🟢 EN LIGNE\` - \`${client.ws.ping} ms\``,
                true
            )
            .addField(
                "Base de Donnée :",
                `\`${getStatus(connection.readyState)}\``,
                true
            )
            .addField(
                "Temps de Fonctionnement",
                `<t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                true
            )
            .setTimestamp();

        message.reply({ embeds: [Response] });
    },
};

function getStatus(val) {
    let status = "";

    switch (val) {
        case 0:
            status = `🔴 HORS LIGNE`;
            break;
        case 1:
            status = `🟢 CONNECTÉ`;
            break;
        case 2:
            status = `🟠 EN ATTENTE DE CONNEXION`;
            break;
        case 3:
            status = `🔵 EN ATTENTE DE DECONNEXION`;
            break;
    }
    return status;
}
