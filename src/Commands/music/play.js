const { Message} = require('discord.js')
const { errorEmbed, musicEmbed, musicButtonRow } = require("../../util/Embeds")
module.exports = {

    name: "play",
    description: "Play a music",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "music",
            description: `Music name or URL`,
            type: "STRING",
            required: true,
        }
    ],
  
    async execute(message, client) {
        
        channel = message.member.voice.channel

        if (!channel) return message.reply({ embeds: [errorEmbed().setDescription(`Please join a voice channel !`)], ephemeral: true })
        
        const music = message.options.getString('music')
        if (music=="") return

        message.reply({
            embeds: [
            musicEmbed()
            .setDescription("⏳ Searching ...")
            ]
        })


        try {
            await client.distube.playVoiceChannel(channel, music)
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
        try {
        const queue = client.distube.getQueue(message)
        let playingSong = queue.songs[0]

        message.editReply({ embeds: [musicEmbed()
                .setTitle(`Playing ${playingSong.name}`)
                .setURL(`${playingSong.url}`)
                .setThumbnail(`${playingSong.thumbnail}`)
                .setDescription(`${queue.formattedCurrentTime} **|-----------------------------|** ${playingSong.formattedDuration}`)
                .addField(`Requester`, `x`, true)
                .addField(`Author`, `x`, true)
                .addField(`Volume`, `x`, true)
            ],
            components: [musicButtonRow()],
            ephemeral: true })
        } catch (e) {
            message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
        



        
    }
}