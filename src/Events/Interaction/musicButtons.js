const { ButtonInteraction, Client } = require("discord.js");
const { errorEmbed, musicEmbed } = require("../../util/Embeds");
const {musicButtonRow } = require("../../util/buttonLayout")


module.exports = {

    name: "interactionCreate",
    

    async execute(interaction, client) {

        
            
        if (!interaction.isButton()) return;
        //if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [errorEmbeds().setDescription("You don't have permission to use this button!")], ephemeral: true });
        

        const { guildId, customId, message } = interaction;
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })

        switch (customId) {
                
        //! Pause Button

            case "pause":
                {
                    try{
                        if (queue.paused) {
                            queue.resume()
                            return interaction.reply({
                                embeds: [
                                musicEmbed()
                                .setDescription(`${interaction.user} Resumed the song...`)
                                ], components: [musicButtonRow()]
                            })
                        }
                        queue.pause()
                        
                        interaction.reply({
                        embeds: [
                            musicEmbed()
                                .setDescription(`${interaction.user} Paused the song...`)
                            ], components: [musicButtonRow()]
                        })

                    } catch (e) {
                        interaction.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
            
            
        //! Previous Button
            case "previous":
                {
                    
                    let previousSong;
                    try {previousSong = queue.previousSongs[0]} catch (e) {console.log(e)}
                
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
                        
                        if (!queue) return interaction.reply({ embeds: [errorEmbed().setDescription(`There is nothing to play :( !`)], ephemeral: true })
                        mode = queue.setRepeatMode()
                        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"

                        interaction.reply({
                                embeds: [
                                musicEmbed()
                                .setDescription(`🔁 | ${interaction.user} has set repeat mode to ${mode}`)
                            ]})
                    } catch (e) {
                        interaction.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
        
        //! Shuffle Button
            case "shuffle":
                {
                    try {
                        
                    
                        queue.shuffle()

                        interaction.reply({
                            embeds: [
                            musicEmbed()
                            .setDescription(`🔀 | ${interaction.user} Shuffled the queue !`)
                        ],components: [musicButtonRow()]})
                    } catch (e) {
                        interaction.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
            
        //! Skip Button
            case "skip":
                {
                    try { 
                        
                        const nextSong = queue.songs[1] 
                    
                        if (nextSong === undefined) return interaction.reply({ embeds: [errorEmbed().setDescription(`There is nothing next in queue right now !`)], ephemeral: true })

                        interaction.reply({
                        embeds: [
                            musicEmbed()
                                .setThumbnail(`${nextSong.thumbnail}`)
                                .setDescription(` Song skipped by ${interaction.user}! Now playing:\n [${nextSong.name}](${nextSong.url})`)
                        ],components: [musicButtonRow()]})

                        queue.skip()

                        
                    } catch (e) { 
                        interaction.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
                
        }

    }

    
}