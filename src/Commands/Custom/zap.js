const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder().setName("zap").setDescription("Euuuuh...."),

    execute(message, client) {
        var Kwey = client.users.cache.get("232110364186247168");

        message.reply({
            embeds: [
                {
                    color: 0xff6800,
                    title: "**Chignon = Pneu**",
                    description: "",
                    footer: {
                        icon_url: Kwey.avatarURL,
                        text: "© Created by Kweyy",
                    },
                },
            ],
        });
    },
};
