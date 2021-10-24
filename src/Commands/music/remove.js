const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const { options } = require("snekfetch");
const { errorEmbed, musicEmbed} = require("../../util/Embeds")

module.exports = {
    
    //! la commande fonctionne pour des petits nombre mais pas pour les grand (genre 300secondes)

    name: "remove",
    description: "remove a music from the queue :",
    permission: "ADMINISTRATOR",
    active: true,
        
    async execute(message, client) {        
        try {
            const queue = client.distube.getQueue(message)
            if (!queue) return message.editReply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
            
            await message.reply({
            embeds: [
            musicEmbed()
            .setDescription("⏳ Loading ...")
            ]
            })


            const optionMenu = await queue.songs.map((song, i) => {

                return {
                    label: song.name,
                    description: 'No description',
                    value: i.toString(),
                };
            })

            const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('remove')
                    .setMaxValues(1)
					.setPlaceholder('Nothing selected')
					.addOptions(optionMenu))

            message.editReply({
                embeds: [
                musicEmbed()
                .setDescription(`Select the music you want to remove from the queue below ⤵️`)
            ],components: [row], ephemeral: true})
            
            //queue.songs.splice(removeNumber, 1)
            
           
        } catch (e) {
            console.log(e)
            message.editReply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
        }

    }
}