const { Message} = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice');
const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const { musicButtonRow } = require("../../util/buttonLayout")
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

        var channel = message.member.voice.channel;
        await joinVoiceChannel({
          channelId: channel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator
        })

        if (music.startsWith('http')) {
            try{
                await client.distube.playVoiceChannel(channel, music, {options: message.user})
                const queue = client.distube.getQueue(message)
                numberSongs = queue.songs.length-1
                addedSong = queue.songs[numberSongs]

            } catch (e) {
                console.log(e)
                message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
            }

        } else {
            try {
                YTBsearch = await client.distube.search(music)
                addedSong = YTBsearch[0]
                await client.distube.playVoiceChannel(channel, YTBsearch[0].url, {options: message.user})

                
            } catch (e) {
                console.log(e)
                message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
            }
        }

        try{
            message.editReply({ 
                    embeds: [musicEmbed()
                        .setTitle(`▶️ | Song added to the queue : `)
                        .setDescription(`[${addedSong.name}](${addedSong.url})`)
                        .setThumbnail(`${addedSong.thumbnail}`)
                        .addField(`Requester`, `${message.user} `, true)
                        .addField(`Author`, `[${addedSong.uploader.name}](${addedSong.uploader.url})`, true)
                        .addField(`Duration`, `${addedSong.formattedDuration}`, true)],
                    components: [musicButtonRow()], ephemeral: true })
        } catch (e) {
                console.log(e)
                message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
        

    }
}