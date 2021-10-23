const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const {musicButtonRow } = require("../../util/buttonLayout")
module.exports = {

    name: "shuffle",
    description: "Testing",
    permission: "ADMINISTRATOR",
    active: true,
    
    execute(message, client) {
        try {
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            queue.shuffle()

            message.reply({
                embeds: [
                musicEmbed()
                .setDescription(`🔀 | ${message.user} Shuffled the queue !`)
            ],components: [musicButtonRow()]})
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}