const { ButtonInteraction, Client } = require("discord.js");
const { errorEmbed, musicEmbed } = require("../../util/Embeds");
const {musicButtonRow } = require("../../util/buttonLayout")


module.exports = {

    name: "interactionCreate",
    

    async execute(interaction, client) {

        
            
        if (!interaction.isButton()) return;
        //if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [errorEmbeds().setDescription("You don't have permission to use this button!")], ephemeral: true });
        

        const { guildId, customId, message } = interaction;

        switch (customId) {
                
        //! Pause Button

            case "pause":
                {
                    try{
                        const queue = client.distube.getQueue(interaction)
                        if (!queue) return interaction.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
                        if (queue.paused) {
                            queue.resume()
                            return interaction.reply({
                                embeds: [
                                musicEmbed()
                                .setDescription(`${interaction.user} Resumed the song...`)
                                ],components: [musicButtonRow()]})
                        }
                        queue.pause()
                        
                        interaction.reply({
                        embeds: [
                        musicEmbed()
                        .setDescription(`${interaction.user} Paused the song...`)
                        ],components: [musicButtonRow()]})

                    } catch (e) {
                        interaction.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
            
            
        //! Previous Button
            case "previous":
                {
                    const queue = client.distube.getQueue(interaction)
                    const previousSong = queue.previousSongs[0]
                    if (!queue) return interaction.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
                    if (previousSong === undefined) return interaction.reply({ embeds: [errorEmbed().setDescription(`Nothing has been played previously in queue right now !`)], ephemeral: true })
                    try {

                        queue.previous()

                        interaction.reply({
                        embeds: [
                        musicEmbed()
                        .setThumbnail(`${previousSong.thumbnail}`)
                        .setDescription(` Song skipped by ${interaction.user}! Now playing:\n [${previousSong.name}](${previousSong.url})`)
                        ],components: [musicButtonRow()]})
                    } catch (e) {
                        interaction.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
            
        //! Repeat Button
            case "repeat":
                {
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
                break;
        
        //! Shuffle Button
            case "shuffle":
                {
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
                break;
            
        //! Skip Button
            case "skip":
                {
                    try { 
                        const queue = client.distube.getQueue(message)
                        const nextSong = queue.songs[1] 
                        if (!queue) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })
                        if (nextSong === undefined) return message.reply({ embeds: [errorEmbed().setDescription(`There is nothing next in queue right now !`)], ephemeral: true })

                        message.reply({
                        embeds: [
                        musicEmbed()
                        .setThumbnail(`${nextSong.thumbnail}`)
                        .setDescription(` Song skipped by ${message.user}! Now playing:\n [${nextSong.name}](${nextSong.url})`)
                        ],components: [musicButtonRow()]})

                        queue.skip()

                        
                    } catch (e) { 
                        message.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
                
        }

    }

    
}