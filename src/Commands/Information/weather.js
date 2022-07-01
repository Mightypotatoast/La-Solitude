const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const weather = require("weather-js");
const { errorEmbed } = require("../../util/Embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Affiche la météo")
        .addStringOption((option) =>
            option
                .setName("ville")
                .setDescription(`La ville où vous voulez connaître la météo`)
                .setRequired(true)
        ),

    execute(message, client) {
        weather.find(
            { search: message.options.getString("ville"), degreeType: "C" },
            (error, result) => {
                if (error)
                    return message.reply({
                        embeds: [errorEmbed.setDescription(`${error}`)],
                        ephemeral: true,
                    });

                if (result === undefined || result.length === 0)
                    return message.reply({
                        embeds: [
                            errorEmbed().setDescription(
                                `Localisation invalide`
                            ),
                        ],
                        ephemeral: true,
                    });

                let current = result[0].current;
                let location = result[0].location;
                let forecast = result[0].forecast;

                let ressentieEmoji =
                    current.temperature > current.feelslike
                        ? "🥵"
                        : current.temperature > current.feelslike
                        ? "🔸"
                        : "🥶";

                const resultEmbed = new MessageEmbed()
                    .setColor("#111111")
                    .setTitle(
                        `Prévisions météorologiques pour ${current.observationpoint} à ${current.observationtime}`
                    )
                    .setThumbnail(current.imageUrl)
                    .setDescription(`**${current.skytext}**`)
                    .addField(
                        "🕜 Fuseau Horaire :",
                        `UTC ${location.timezone}`,
                        true
                    )
                    .addField("🔹 Type de degrée :", `Celsius`, true)
                    .addField(
                        "🌡️ Température :",
                        `${current.temperature}°C`,
                        true
                    )
                    .addField(
                        `${ressentieEmoji} Ressentie :`,
                        `${current.feelslike}°C`,
                        true
                    )
                    .addField("💨 Vent :", `${current.winddisplay}`, true)
                    .addField("💧 Humidité :", `${current.humidity}%`, true)
                    .setTimestamp();

                message.reply({ embeds: [resultEmbed] });
            }
        );
    },
};
