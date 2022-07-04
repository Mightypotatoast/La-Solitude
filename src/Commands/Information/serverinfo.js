const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Affiche les informations du serveur"),

    async execute(message) {
        let CreatedDate = message.guild.createdAt;
        let Joindate = message.member.joinedAt;

        let icon = message.guild.iconURL();

        let servemb = new Discord.MessageEmbed()
            .setTitle(":clipboard: INFORMATION SUR LE SERVEUR :clipboard:")
            .setColor("#FF6800")
            .setThumbnail(icon)
            .addField("Nom du Serveur : ", `${message.guild.name}`)
            .addField(
                "Crée le : ",
                `<t:${parseInt(message.guild.createdAt / 1000)}:R>`
            )
            .addField("Propriétaire : ", `${await message.guild.fetchOwner()}`)
            .addField(
                "Tu as rejoins le : ",
                `<t:${parseInt(message.member.joinedAt / 1000)}:R>`
            )
            .addField("Total des membres :", `${message.guild.memberCount} `);

        return message.reply({ embeds: [servemb] });
    },
};
