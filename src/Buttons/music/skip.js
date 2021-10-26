const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const {musicButtonRow } = require("../../util/buttonLayout")
module.exports = {

    name: "skip",
    description: "Testing",
    permission: "ADMINISTRATOR",
    active: true,
    
    execute(message, client) {
        try { 
            const queue = client.distube.getQueue(message)
            const nextSong = queue.songs[1] 
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            if (nextSong === undefined) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing next in queue right now !`)], ephemeral: true })

            message.reply({
            embeds: [
            musicEmbed()
            .setThumbnail(`${nextSong.thumbnail}`)
            .setDescription(` Song skipped by ${message.user}! Now playing:\n [${nextSong.name}](${nextSong.url})`)
            ],components: [musicButtonRow()]})

            queue.skip()

            
        } catch (e) { 
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    
    }
}