const { EmbedBuilder } = require("discord.js");
const phewist = require("../../util/phewistLists");
const { SlashCommandBuilder } = require("@discordjs/builders");
//const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("phewist")
        .setDescription("Générer une phrase que pourrait dire Phewist"),

    async execute(message) {
        let rndSujet =
            phewist.sujet[Math.floor(Math.random() * phewist.sujet.length)];
        let rndVerbs =
            phewist.verbs[Math.floor(Math.random() * phewist.verbs.length)];
        let rndObjet =
            phewist.objet[Math.floor(Math.random() * phewist.objet.length)];

        let phewistID = message.guild.members.cache.get("178851979332812801");

        let phewistEmbed = new EmbedBuilder()
            .setColor("#666699")
            .setDescription(`**Moi, ${rndSujet}, ${rndVerbs} ${rndObjet}.**`)
            .setAuthor({ 
                name : phewistID ? `${phewistID.user.tag}` : "Phewist",
                iconURL : phewistID
                    ? `${phewistID.user.displayAvatarURL()}`
                    : "https://cdn.discordapp.com/avatars/178851979332812801/473cdeb49f6293a18b7c449a7774db4c.webp"
            })
            .setTimestamp();

        message.reply({ embeds: [phewistEmbed] });
    },
};
