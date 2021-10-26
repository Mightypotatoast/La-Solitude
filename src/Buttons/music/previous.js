const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const {musicButtonRow } = require("../../util/buttonLayout")

module.exports = {

    name: "previous",
    description: "Testing",
    permission: "ADMINISTRATOR",
    active: true,
    
    execute(message, client) {
    
        const queue = client.distube.getQueue(message)
        const previousSong = queue.previousSongs[0]
        if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
        if (previousSong === undefined) return message.reply({ embeds: [errorEmbed().setDescription(`Nothing has been played previously in queue right now !`)], ephemeral: true })
        try {

            queue.previous()

            message.reply({
            embeds: [
            musicEmbed()
            .setThumbnail(`${previousSong.thumbnail}`)
            .setDescription(` Song skipped by ${message.user}! Now playing:\n [${previousSong.name}](${previousSong.url})`)
            ],components: [musicButtonRow()]})
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}