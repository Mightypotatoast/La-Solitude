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
        YTBsearch = await client.distube.search(music)

        try {
            await client.distube.playVoiceChannel(channel, YTBsearch[0].url, {options: message.user})
        } catch (e) {
            console.log(e)
            message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
        try {


        
        message.editReply({ embeds: [musicEmbed()
                .setTitle(`▶️ | Song added to the queue : `)
                .setDescription(`[${YTBsearch[0].name}](${YTBsearch[0].url})`)
                .setThumbnail(`${YTBsearch[0].thumbnail}`)
                .addField(`Requester`, `${message.user} `, true)
                .addField(`Author`, `[${YTBsearch[0].uploader.name}](${YTBsearch[0].uploader.url})`, true)
                .addField(`Duration`, `${YTBsearch[0].formattedDuration}`, true)
            ],
            ephemeral: true })
        } catch (e) {
            console.log(e)
            message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }

    }
}