const { CommandInteraction } = require("discord.js");
const glob = require("glob");
const { errorEmbed, successEmbed } = require("../../util/Embeds");

module.exports = {
    name: "reload",
    description: "Reloads all commands",
    permission: "ADMINISTRATOR",
    active: true,
    
    /**
     * 
     * @param {CommandInteraction} message 
     */
    async execute(message) {
        if (message.member.id !== "206905331366756353") return message.reply({ embed: [errorEmbed().setDescription("You don't have the permission to use this command **[BOT OWNER ONLY]**")], ephemeral: true });
        
        glob(`${__dirname}/../**/*.js`, async (err, files) => {
            if (err) return message.reply({ embed: [errorEmbed().setDescription(err)],ephemeral: true });
            
            files.forEach(file => {
                delete require.cache[require.resolve(file)];
                
                const command = require(file);
                console.log(`Reloaded ${file}`);

                if(command.name) {
                    message.client.commands.set(command.name, command);
                }
            });

            message.reply({ embed: [successEmbed().setDescription("All commands have been reloaded!")], ephemeral: true });
        })
    }
}