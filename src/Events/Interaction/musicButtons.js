const { ButtonInteraction, Client } = require("discord.js");
const { errorEmbed, musicEmbed } = require("../../util/Embeds");
const {musicButtonRow } = require("../../util/buttonLayout")

function generateProgressBar(currentTime, duration) {
        
    //make a ASCII progress bar |------🔴--------|
        let progressBar = "|"
        let progressBarLength = 25
        let progressBarMax = duration
        let progressBarCurrent = currentTime
        let progressBarPercent = (progressBarCurrent / progressBarMax) * 100
        let progressBarPercentRounded = Math.round(progressBarPercent/(100/progressBarLength))
        for (let i = 0; i < progressBarLength; i++) {
            if (i < progressBarPercentRounded) {
                progressBar = progressBar.concat("─")
            } else  if (i == progressBarPercentRounded) {
                progressBar = progressBar.concat("🔹")
            } else {
                progressBar = progressBar.concat("─")
            }
        }
        progressBar = progressBar.concat("|")
        return progressBar

}

module.exports = {

    name: "interactionCreate",
    

    async execute(interaction, client) {

        
            
        if (!interaction.isButton()) return;
        //if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [errorEmbeds().setDescription("You don't have permission to use this button!")], ephemeral: true });
        
        
        
        const { guildId, customId, message } = interaction;
        
        buttonsID = ["pause", "skip", "shuffle", "previous", "repeat"];
        if (!buttonsID.includes(customId)) return;


        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({ embeds: [errorEmbed().setDescription(`There is nothing in the queue right now !`)], ephemeral: true })

        switch (customId) {
                
        //! Pause Button
           
            case "pause":
                {
                    try{
                        let playingSong = queue.songs[0]

                        if (queue.paused) {
                            queue.resume()
                            await interaction.message.edit({ embeds: [musicEmbed()
                                .setTitle(`Playing ${playingSong.name}`)
                                .setURL(`${playingSong.url}`)
                                .setThumbnail(`${playingSong.thumbnail}`)
                                .addField(`Requester`, `${playingSong.member}`, true)
                                .addField(`Author`, `[${playingSong.uploader.name}](${playingSong.uploader.url})`, true)
                                .addField(`Volume`, `${queue.volume}%`, true)
                            ],
                            components: [musicButtonRow()],
                            ephemeral: true })
                            return interaction.deferUpdate()
                        }
                        
                        queue.pause()
                        await interaction.message.edit({ embeds: [musicEmbed()
                                .setTitle(`${interaction.user.username} paused ${playingSong.name}`)
                                .setURL(`${playingSong.url}`)
                                .setThumbnail(`${playingSong.thumbnail}`)
                                .setDescription(`${queue.formattedCurrentTime} **${generateProgressBar(queue.currentTime, playingSong.duration )}** ${playingSong.formattedDuration}`)
                                .addField(`Requester`, `${playingSong.member}`, true)
                                .addField(`Author`, `[${playingSong.uploader.name}](${playingSong.uploader.url})`, true)
                                .addField(`Volume`, `${queue.volume}%`, true)
                            ],
                            components: [musicButtonRow()],
                            ephemeral: true })
                        interaction.deferUpdate()

                    } catch (e) {
                        interaction.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
            
            
        //! Previous Button
            case "previous":
                {
                    
                    let previousSong;
                    try {previousSong = queue.previousSongs[queue.previousSongs.length-1]} catch (e) {console.log(e)}
                
                    if (previousSong === undefined) return interaction.reply({ embeds: [errorEmbed().setDescription(`Nothing has been played previously in queue right now !`)], ephemeral: true })
                    try {

                        queue.previous()

                        interaction.message.edit({
                        embeds: [
                        musicEmbed()
                        .setThumbnail(`${previousSong.thumbnail}`)
                        .setDescription(` Song skipped by ${interaction.user}! Now playing:\n [${previousSong.name}](${previousSong.url})`)
                        ],components: [musicButtonRow()]})
                        interaction.deferUpdate()
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

                        interaction.message.edit({
                                embeds: [
                                musicEmbed()
                                .setDescription(`🔁 | ${interaction.user} has set repeat mode to ${mode}`)
                            ]})
                        interaction.deferUpdate()
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

                        interaction.message.edit({
                            embeds: [
                            musicEmbed()
                            .setDescription(`🔀 | ${interaction.user} Shuffled the queue !`)
                        ],components: [musicButtonRow()]})
                        interaction.deferUpdate()
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

                        interaction.message.edit({
                        embeds: [
                            musicEmbed()
                                .setThumbnail(`${nextSong.thumbnail}`)
                                .setDescription(` Song skipped by ${interaction.user}! Now playing:\n [${nextSong.name}](${nextSong.url})`)
                        ],components: [musicButtonRow()]})
                        interaction.deferUpdate()
                        queue.skip()

                        
                    } catch (e) { 
                        interaction.reply({ embeds: [errorEmbed().setDescription(`${e}`)], ephemeral: true })
                    }
                }
                break;
                
        }

    }

    
}