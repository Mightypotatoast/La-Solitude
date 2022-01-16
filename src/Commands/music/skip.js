const { errorEmbed, musicEmbed} = require("../../util/Embeds")

module.exports = {
    name: "skip",
    description: "Passe la musique en cours",
    permission: "ADMINISTRATOR",
    active: true,
    options: [
        {
            name: "how-many",
            description: `Nombre de musiques à passer`,
            type: "NUMBER",
            required: false,
        }
    ],

    async execute(message, client) {

        try { 
            
            let skipNumber = (message.options.getNumber("how-many") === null) ? 1 : Math.floor(message.options.getNumber("how-many"));
            const queue = client.distube.getQueue(message)
            if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`La file d'attente est actuellement vide !`)], ephemeral: true })
            if (queue.songs[skipNumber] === undefined) return message.reply({ embeds: [errorEmbed().setDescription(`La file d'attente est actuellement vide !`)], ephemeral: true })
            
            message.reply({
                embeds: [
                musicEmbed()
                .setThumbnail(`${queue.songs[skipNumber].thumbnail}`)
                .setDescription(`La musique a été passée par ${message.user}! Musique actuelle :\n [${queue.songs[skipNumber].name}](${queue.songs[skipNumber].url})`)
                ]})

            queue.jump(skipNumber)

        } catch (e) { 
            message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }
    
    }
}
