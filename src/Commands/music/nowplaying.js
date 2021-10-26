const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const { musicButtonRow } = require("../../util/buttonLayout")

module.exports = {

    name: "nowplaying",
    aliases: ["now"],
    description: "Display current playing music",
    permission: "ADMINISTRATOR",
    active: true,
 
    async execute(message, client) {
        
        channel = message.member.voice.channel

        if (!channel) return message.reply({ embeds: [errorEmbed().setDescription(`Please join a voice channel !`)], ephemeral: true })
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`Nothing is playing right now !`)], ephemeral: true })

        try {
        let playingSong = queue.songs[0]
        console.log(playingSong.uploader.name);
        message.reply({ embeds: [musicEmbed()
                .setTitle(`Playing ${playingSong.name}`)
                .setURL(`${playingSong.url}`)
                .setThumbnail(`${playingSong.thumbnail}`)
                .setDescription(`${queue.formattedCurrentTime} **|-----------------------------|** ${playingSong.formattedDuration}`)
                .addField(`Requester`, `${playingSong.member}`, true)
                .addField(`Author`, `[${playingSong.uploader.name}](${playingSong.uploader.url})`, true)
                .addField(`Volume`, `${queue.volume}%`, true)
            ],
            components: [musicButtonRow()],
            ephemeral: true })
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
        



        
    }
}