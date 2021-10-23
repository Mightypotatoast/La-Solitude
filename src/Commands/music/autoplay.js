const { errorEmbed, musicEmbed} = require("../../util/Embeds")

module.exports = {
    name: "autoplay",
    description: "if enabled, the bot will play recommanded music from youtuabe when the queue is empty",
    type : 1,
    inVoiceChannel: true,
    permission: "ADMINISTRATOR",
    active: true,
    
    async execute(message, client) {
        try {
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            const autoplay = queue.toggleAutoplay()
            message.reply({
                    embeds: [
                    musicEmbed()
                    .setDescription(`♻️ | ${message.user} has set autoplay mode to\`${autoplay ? "On" : "Off"}\``)
                ]})
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    }
}