const { DisTube } = require("distube");
const { errorEmbed, musicEmbed } = require("../../util/Embeds");
const { musicButtonRow } = require("../../util/buttonLayout");
const config = require("../../config");
const { generateProgressBar } = require("../../util/functions");

module.exports = {
    name: "playSong",
    once: false,

    /**
     * @param {DisTube.Queue} queue
     * @param {DisTube.Song} song
     */
    async execute(queue, song) {
        if (!queue)
            return console.log("La file d'attente est actuellement vide !");
        console.log(
            `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
        );

        const embed = musicEmbed()
            .setTitle(`Musique actuelle : ${song.name}`)
            .setURL(`${song.url}`)
            .setThumbnail(`${song.thumbnail}`)
            .setDescription(
                `**${queue.formattedCurrentTime} ${generateProgressBar(
                    queue.currentTime,
                    song.duration,
                    false
                )} ${song.formattedDuration}**`
            )
            .addField(`Demandé par :`, `${song.member}`, true)
            .addField(
                `Auteur :`,
                `[${song.uploader.name}](${song.uploader.url})`,
                true
            )
            .addField(`Volume :`, `${queue.volume}%`, true);

        try {
            musicChannel = await queue.voiceChannel.guild.channels.cache
                .get(
                    (
                        await config(queue.voiceChannel.guild.id)
                    ).channel.MusicChannelID
                )
                .send({
                    embeds: [embed],
                    components: [musicButtonRow()],
                    ephemeral: false,
                });
        } catch (err) {
            //console.log(err)
            return console.log("Le channel musique n'est pas défini");
        }

        try {
            const ckeckPlayingSong = queue.songs[0];
            var refreshMessage = setInterval(() => {
                if (!queue)
                    return console.log(
                        "La file d'attente est actuellement vide !"
                    );
                let playingSong = queue.songs[0];
                if (!playingSong) {
                    console.log("Mauvaise durée de la musique");
                    musicChannel.delete();
                    return clearInterval(refreshMessage);
                }
                if (ckeckPlayingSong.name != playingSong.name) {
                    musicChannel.delete();
                    return clearInterval(refreshMessage);
                }
                musicChannel.edit({
                    embeds: [
                        musicEmbed()
                            .setTitle(`Musique actuelle : ${playingSong.name}`)
                            .setURL(`${playingSong.url}`)
                            .setThumbnail(`${playingSong.thumbnail}`)
                            .setDescription(
                                `**${
                                    queue.formattedCurrentTime
                                } ${generateProgressBar(
                                    queue.currentTime,
                                    playingSong.duration
                                )} ${playingSong.formattedDuration}**`
                            )
                            .addField(
                                `Demandé par :`,
                                `${playingSong.user}`,
                                true
                            )
                            .addField(
                                `Auteur :`,
                                `[${playingSong.uploader.name}](${playingSong.uploader.url})`,
                                true
                            )
                            .addField(`Volume :`, `${queue.volume}%`, true),
                    ],
                    components: [musicButtonRow()],
                    ephemeral: false,
                });
            }, 3000);
        } catch (err) {
            console.log(err);
        }
    },
};
