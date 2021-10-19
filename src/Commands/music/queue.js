const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')

module.exports = {

    name: "queue",
    description: "Display the queue",
    permission: "ADMINISTRATOR",
    active: true,

    async execute(message, client) {
        
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`⛔ **Erreur**: ⛔ | There is nothing in the queue right now!`)
        let playingSong = queue.songs[0]
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")

        let playingEmbed =  new MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`Playing ${playingSong.name}`)
            .setURL(`${playingSong.url}`)
            .setThumbnail(`${playingSong.thumbnail}`)
            .setDescription(`**|---------------${queue.formattedCurrentTime}/${playingSong.formattedDuration}--------------|**  `)
            .addField(`Queue:`, `${q}`, true)


        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏮️')
                    .setCustomId(`previous_button`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏯️')
                    .setCustomId(`pause_button`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⏩')
                    .setCustomId(`next_button`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('🔀')
                    .setCustomId(`shuffle_button`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('primary')
					.setLabel('🔁')
                    .setCustomId(`reapeat_button`)
					.setStyle('SECONDARY'),
                
			)
        message.reply({ embeds: [playingEmbed],components: [row] , ephemeral: true })
        



        
    }
}