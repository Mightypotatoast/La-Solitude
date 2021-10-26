const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const { execute } = require('../guild/guildCreate')

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
        }
    }








}