const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const { musicButtonRow } = require("../../util/buttonLayout")

module.exports = {

    name: "queue",
    description: "Display the queue",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
    
        

        try {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })

        const numberSongs = queue.songs.length;
        const previousNumberSongs = queue.previousSongs.length;
        const tracks = queue.songs.map((song, i) => `**${i+previousNumberSongs}** - [${song.name}](${song.url}) - ${song.formattedDuration}`);
        const previousTracks = queue.previousSongs.map((song, i) => `**${i}** - [${song.name}](${song.url}) - ${song.formattedDuration}`);
       
        const nextSongs = `**${previousNumberSongs}** out of **${numberSongs}** song(s) in the playlist`;
        
        let playingEmbed =  musicEmbed()
            .setDescription(`${previousTracks.slice(-6).join('\n')}\n⤵️\n**${previousNumberSongs} Current [${queue.songs[0].name}](${queue.songs[0].url})**\n⤴️\n${tracks.slice(1, 6).join('\n')}\n\n${nextSongs}`)
            .setThumbnail(queue.songs[0].thumbnail)

        message.reply({ embeds: [playingEmbed], ephemeral: true })
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }



        
    }
}