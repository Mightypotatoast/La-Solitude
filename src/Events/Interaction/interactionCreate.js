const { MessageEmbed } = require('discord.js')
const { musicEmbed } = require("../../util/Embeds") //!provisoir, a retirer quand Handler pour Select menu sera présent

module.exports = {

    name: "interactionCreate",
    

    async execute(interaction, client) {
        
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setTitle("⛔⛔ **ERREUR** ⛔⛔")
                        .setDescription("There was an error while executing this command")
                ], ephemeral : true
            } ) && client.commands.delete(interaction.commandName);

            command.execute(interaction,client)
        } else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId)
            if (!button) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setTitle("⛔⛔ **ERREUR** ⛔⛔")
                        .setDescription("There is no function found for this button")
                ], ephemeral : true
            })
    
            try {
                await button.execute(interaction, client)
            } catch (e) {
                console.error(e)
                interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setTitle("⛔⛔ **ERREUR** ⛔⛔")
                        .setDescription("There was an error while executing this command")
                    ], ephemeral : true
                })
            }
        } else if (interaction.isSelectMenu()) {    //! a modifer/mettre en place un handler pour les SelectMenu
            try {

                if (interaction.customId !== 'remove') return
                await interaction.deferReply({ ephemeral: false})
                const queue = client.distube.getQueue(interaction)
                const songId = interaction.values[0]
                queue.songs.splice(songId, 1)
                
                await interaction.followUp({
                embeds: [
                musicEmbed()
                .setDescription(`${interaction.user} has removed [${queue.songs[songId].name}](${queue.songs[songId].url}) from the queue`)
                ]})
                
                interaction.message.delete()
                //interaction.message.resolveComponent(interaction.customId).setDisabled(true) //!wtf pk ca marche pas
            } catch (e) {
                console.error(e)
                interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setTitle("⛔⛔ **ERREUR** ⛔⛔")
                        .setDescription("ALED")
                    ], ephemeral : true
                })
            }
        }
    }
}