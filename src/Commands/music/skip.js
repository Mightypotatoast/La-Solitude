const { errorEmbed, musicEmbed} = require("../../util/Embeds")

module.exports = {
    name: "skip",
    description: "Skip to the next music",
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "how-many",
            description: `how many song do you want to skip?`,
            type: "NUMBER",
            required: false,
        }
    ],

    async execute(message, client) {

        try { 
            
            let skipNumber = (message.options.getNumber("how-many") === null) ? 1 : Math.floor(message.options.getNumber("how-many"));
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            if (queue.songs[skipNumber] === undefined) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing next in queue right now !`)], ephemeral: true })
            
            message.reply({
                embeds: [
                musicEmbed()
                .setThumbnail(`${queue.songs[skipNumber].thumbnail}`)
                .setDescription(` Song skipped by ${message.user}! Now playing:\n [${queue.songs[skipNumber].name}](${queue.songs[skipNumber].url})`)
                ]})

            queue.jump(skipNumber)

        } catch (e) { 
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    
    }
}
