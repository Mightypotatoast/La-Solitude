const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const {musicButtonRow } = require("../../util/buttonLayout")

module.exports = {

    name: "pause",
    description: "Testing",
    permission: "ADMINISTRATOR",
    active: true,
    
    execute(message, client) {
        try{
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            if (queue.paused) {
                queue.resume()
                return message.reply({
                    embeds: [
                    musicEmbed()
                    .setDescription(`${message.user} Resumed the song...`)
                    ],components: [musicButtonRow()]})
            }
            queue.pause()
            
            message.reply({
            embeds: [
            musicEmbed()
            .setDescription(`${message.user} Paused the song...`)
            ],components: [musicButtonRow()]})

        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    
    }
}