const { MessageEmbed, Message} = require('discord.js')

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

        await client.distube.playVoiceChannel(channel, music)
        
    }
}