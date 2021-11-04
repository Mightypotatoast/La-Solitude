const { errorEmbed, musicEmbed} = require("../../util/Embeds")
const {musicButtonRow } = require("../../util/buttonLayout")
module.exports = {

    name: "repeat",
    description: "Cylcle throught repeat mode" ,
    permission: "ADMINISTRATOR",
    active: true,
    
    execute(message, client) {
        try {
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing to play :( !`)], ephemeral: true })
            mode = queue.setRepeatMode()
            mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"

            message.reply({
                    embeds: [
                    musicEmbed()
                    .setDescription(`🔁 | ${message.user} has set repeat mode to ${mode}`)
                ]})
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }

    }
}