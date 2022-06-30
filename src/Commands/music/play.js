const { Message} = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice');
const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const { musicButtonRow } = require("../../util/buttonLayout")
module.exports = {

    name: "play",
    description: "Joue une musique",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "music",
            description: `Le nom ou l'URL de la musique à jouer`,
            type: "STRING",
            required: true,
        }
    ],
  
    async execute(message, client) {
        
        channel = message.member.voice.channel
        if (!channel) return message.reply({ embeds: [errorEmbed().setDescription(`Vous devez rejoindre un salon vocal !`)], ephemeral: true })
        
        const music = message.options.getString('music')
        if (music=="") return


        message.deferReply({ ephemeral: false })

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
                        .setTitle(`▶️ | Une musique a été ajouté à la file d'attente : `)
                        .setDescription(`[${addedSong.name}](${addedSong.url})`)
                        .setThumbnail(`${addedSong.thumbnail}`)
                        .addField(`Demandé par :`, `${message.user} `, true)
                        .addField(`Auteur :`, `[${addedSong.uploader.name}](${addedSong.uploader.url})`, true)
                        .addField(`Durée :`, `${addedSong.formattedDuration}`, true)],
                    components: [musicButtonRow()], ephemeral: true })
        } catch (e) {
                console.log(e)
                message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
        

    }
}