const { Message, SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { errorEmbed, musicEmbed } = require("../../util/Embeds");
const { musicButtonRow, musicButtonRow2 } = require("../../util/buttonLayout");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription(
            "Joue une musique ou une playlist depuis Youtube ou une URL"
        )
        .addStringOption((option) =>
            option
                .setName("musique")
                .setDescription("url ou nom de la musique a jouer")
                .setRequired(true)
        ),

    async execute(message, client) {
        await message.deferReply({ ephemeral: false });
        channel = message.member.voice.channel;
        if (!channel)
            return message.reply({
                embeds: [
                    errorEmbed().setDescription(
                        `Vous devez rejoindre un salon vocal !`
                    ),
                ],
                ephemeral: true,
            });

        const music = message.options.getString("musique");
        if (music == "") return;

        await client.distube.play(channel, music);

        queue = await client.distube.getQueue(message);
        const addedSong = queue.songs.slice(-1)[0];

        try {
            await message.editReply({
                embeds: [
                    musicEmbed()
                        .setTitle(
                            `▶️ | Une musique a été ajouté à la file d'attente : `
                        )
                        .setDescription(`[${addedSong.name}](${addedSong.url})`)
                        .setThumbnail(`${addedSong.thumbnail}`)
                        .addFields(
                            {
                                name: `Demandé par :`,
                                value: `${addedSong.user} `,
                                inline: true,
                            },
                            {
                                name: `Auteur :`,
                                value: `[${addedSong.uploader.name}](${addedSong.uploader.url})`,
                                inline: true,
                            },
                            {
                                name: `Durée :`,
                                value: `${addedSong.formattedDuration}`,
                                inline: true,
                            }
                        ),
                ],
                components: [musicButtonRow(), musicButtonRow2()],
                ephemeral: false,
            });
        } catch (e) {
            console.log(e);
            message.editReply({
                embeds: [errorEmbed().setDescription(`${e}`)],
                ephemeral: true,
            });
        }
    },
};
