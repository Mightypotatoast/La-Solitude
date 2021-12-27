const { DisTube } = require("distube")
const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const { musicButtonRow } = require("../../util/buttonLayout")
const config = require('../../config')

function generateProgressBar(currentTime, duration) {
        
    //make a ASCII progress bar |------🔴--------|
        let progressBar = "|"
        let progressBarLength = 25
        let progressBarMax = duration
        let progressBarCurrent = currentTime
        let progressBarPercent = (progressBarCurrent / progressBarMax) * 100
        let progressBarPercentRounded = Math.round(progressBarPercent/(100/progressBarLength))
        for (let i = 0; i < progressBarLength; i++) {
            if (i < progressBarPercentRounded) {
                progressBar = progressBar.concat("─")
            } else  if (i == progressBarPercentRounded) {
                progressBar = progressBar.concat("🔹")
            } else {
                progressBar = progressBar.concat("─")
            }
        }
        progressBar = progressBar.concat("|")
        return progressBar

}

module.exports = {
    
    name: 'playSong',
    once: false,

    
/**
 * @param {DisTube.Queue} queue
 * @param {DisTube.Song} song
 */
    async execute(queue,song) {
        if (!queue) return console.log("Queue is not defined")
        console.log(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
        
        const embed = musicEmbed()
            .setTitle(`Playing ${song.name}`)
            .setURL(`${song.url}`)
            .setThumbnail(`${song.thumbnail}`)
            .setDescription(`**${queue.formattedCurrentTime} ${generateProgressBar(queue.currentTime, song.duration )} ${song.formattedDuration}**`)
            .addField(`Requester`, `${song.member}`, true)
            .addField(`Author`, `[${song.uploader.name}](${song.uploader.url})`, true)
            .addField(`Volume`, `${queue.volume}%`, true)

        try{
            musicChannel = await queue.voiceChannel.guild.channels.cache.get((await config(queue.voiceChannel.guild.id)).channel.MusicChannelID).send({ embeds : [embed], components: [musicButtonRow()],
                ephemeral: false  })   
        }
        catch(err){
            //console.log(err)
            return console.log("Music channel is not defined")
        }

        try{
            const ckeckPlayingSong = queue.songs[0]
            var refreshMessage = setInterval(() => {
                if (!queue) return console.log("nothing in the queue")
                let playingSong = queue.songs[0]
                if (!playingSong) {
                    console.log("wrong duration");
                    return clearInterval(refreshMessage)
                }
                if (ckeckPlayingSong.name != playingSong.name) return clearInterval(refreshMessage)
                console.log(`${queue.formattedCurrentTime} **${generateProgressBar(queue.currentTime, playingSong.duration )}** ${playingSong.formattedDuration}`)
                musicChannel.edit({ embeds: [musicEmbed()
                .setTitle(`Playing ${playingSong.name}`)
                .setURL(`${playingSong.url}`)
                .setThumbnail(`${playingSong.thumbnail}`)
                .setDescription(`**${queue.formattedCurrentTime} ${generateProgressBar(queue.currentTime, playingSong.duration )} ${playingSong.formattedDuration}**`)
                .addField(`Requester`, `${playingSong.user}`, true)
                .addField(`Author`, `[${playingSong.uploader.name}](${playingSong.uploader.url})`, true)
                .addField(`Volume`, `${queue.volume}%`, true)
                ],
                components: [musicButtonRow()],
                ephemeral: false })
            }, 3000)
        } catch (err) {
            console.log(err)
        }
        
    }
}
