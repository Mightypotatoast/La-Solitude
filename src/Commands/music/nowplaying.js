const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const { musicButtonRow } = require("../../util/buttonLayout")



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

    name: "nowplaying",
    aliases: ["now"],
    description: "Affiche les informations de la musique en cours",
    permission: "ADMINISTRATOR",
    active: true,
 
    async execute(message, client) {
        
        const channel = message.member.voice.channel
        if (!channel) return message.reply({ embeds: [errorEmbed().setDescription(`Vous devez rejoindre le Bot en vocal !`)], ephemeral: true })
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`La file d'attente est actuellement vide !`)], ephemeral: true })

        try {
            message.deferReply({ ephemeral: false })
            var refreshTimout = queue.songs[0].duration - queue.songs[0].currentTime
            var count = 0
            var refreshMessage = setInterval(() => {
                count ++
                if(count > refreshTimout) clearInterval(refreshMessage)
                let playingSong = queue.songs[0]
                //console.log(`${queue.formattedCurrentTime} **${generateProgressBar(queue.currentTime, playingSong.duration )}** ${playingSong.formattedDuration}`)
                message.editReply({ embeds: [musicEmbed()
                .setTitle(`Musique jouée : ${playingSong.name}`)
                .setURL(`${playingSong.url}`)
                .setThumbnail(`${playingSong.thumbnail}`)
                .setDescription(`**${queue.formattedCurrentTime} ${generateProgressBar(queue.currentTime, playingSong.duration )} ${playingSong.formattedDuration}**`)
                .addField(`Demandé par :`, `${playingSong.user}`, true)
                .addField(`Auteur :`, `[${playingSong.uploader.name}](${playingSong.uploader.url})`, true)
                .addField(`Volume :`, `${queue.volume}%`, true)
                ],
                components: [musicButtonRow()],
                ephemeral: false })
            }, 1000)
            

        } catch (e) {
            message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
        



        
    }
}