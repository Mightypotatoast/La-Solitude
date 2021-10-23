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
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")

        let playingEmbed =  musicEmbed()
            .addField(`Queue:`, `${q}`, true)
    
        message.reply({ embeds: [playingEmbed],components: [musicButtonRow()] , ephemeral: true })
        } catch (e) {
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }



        
    }
}