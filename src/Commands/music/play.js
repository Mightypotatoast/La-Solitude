const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js')

module.exports = {

    name: "play",
    description: "Play a music",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "music",
            description: `Music name or URL`,
            type: "STRING",
            required: true,
        }
    ],
  
    async execute(message, client) {
        
        channel = message.member.voice.channel
        

        let errorEmbed = new MessageEmbed().setColor("#FF0000").setTitle("⛔ **Erreur**: ⛔")
        if (!channel) return message.reply({ embeds: [errorEmbed.setDescription(`Please join a voice channel !`)], ephemeral: true })
        
        const music = message.options.getString('music')
        if (music=="") return

        try {
            await client.distube.playVoiceChannel(channel, music)
        } catch (e) {
            message.reply({ embeds: [errorEmbed.setDescription(`${e}`)], ephemeral: true })
        }

        const queue = client.distube.getQueue(message)
        let playingSong = queue.songs[0]

        let playingEmbed =  new MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`Playing ${playingSong.name}`)
            .setURL(`${playingSong.url}`)
            .setThumbnail(`${playingSong.thumbnail}`)
            .setDescription(`**|-----------------------------|**  ${queue.formattedCurrentTime}/${playingSong.formattedDuration}`)
            .addField(`Requester`, `${message.user}`, true)
            .addField(`Author`, `u`, true)
            .addField(`Volume`, `u`, true)


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
                    .setCustomId(`repeat_button`)
					.setStyle('SECONDARY'),
                
			)
        message.reply({ embeds: [playingEmbed],components: [row] , ephemeral: true })
        



        
    }
}