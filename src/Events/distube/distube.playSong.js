const { DisTube } = require("distube")
const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const { musicButtonRow } = require("../../util/buttonLayout")
const config = require('../../config')
const { log } = require("util")

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
            //.setDescription(`**${queue.formattedCurrentTime} ${generateProgressBar(queue.currentTime, song.duration )} ${song.formattedDuration}**`)
            .addField(`Requester`, `${song.member}`, true)
            .addField(`Author`, `[${song.uploader.name}](${song.uploader.url})`, true)
            .addField(`Volume`, `${queue.volume}%`, true)

        try{
            queue.voiceChannel.guild.channels.cache.get((await config(queue.voiceChannel.guild.id)).channel.MusicChannelID).send({ embeds : [embed], components: [musicButtonRow()],
                ephemeral: false  })
        }
        catch(err){
            //console.log(err)
            return console.log("Music channel is not defined")
        }

        
    }
}
