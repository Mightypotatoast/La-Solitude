const { CommandInteraction, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { errorEmbed, successEmbed, musicEmbed } = require("../../util/Embeds");
const db = require("../../Models/commands")
const glob = require("glob");



module.exports = {
    name: "command",
    description: "Command toggle and reload",
    permission: "ADMINISTRATOR",
    active: true,

    options: [
        {
            name: "enable",
            description: "Enable a command(s)",
            type: "SUB_COMMAND",
            
        },
        {
            name: "disable",
            description: "Disable a command(s)",
            type: "SUB_COMMAND",
                        
        },
        {
            name: "reload",
            description: "Disable a command(s)",
            type: "SUB_COMMAND",
                        
        },
    ],

    /**
     * @param {CommandInteraction} interaction
     */

    async execute(message) {

        const { options, guild } = message
        
        const Sub = options.getSubcommand(["enable", "disable", "reload"]);
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({embeds :[errorEmbed().setDescription("You need to be an administrator to use this command.")]})
        
        let Commandfiles = [];

        glob(`${__dirname}/../**/*.js`, async (err, files) => {
            if (err) return message.editReply({ embed: [errorEmbed().setDescription(err)], ephemeral: true });
            
            files.forEach(file => {
                let cmd = require(file);
                Commandfiles.push({
                    label: cmd.name,
                    description: cmd.description,
                    value: file,
                })
            })
       })



        await message.reply({
            embeds: [
            musicEmbed()
            .setDescription("⏳ Loading ...")
            ]
        })
        
        switch (Sub) {
            case "enable":
                
                break;
            case "disable":

                
                const rows = []

                let i = 0, j = 1;
                do {
                    
                    let row = new MessageActionRow().addComponents(
                        new MessageSelectMenu()
                        .setCustomId(`disable-${j}`)
                        .setPlaceholder('Nothing selected')
                        .addOptions(Commandfiles.slice(i, (Commandfiles.length < i)? Commandfiles.length-1 : i + 24))
                    )
                    rows.push(row)
                    i += 25
                    j++
                }
                while(Commandfiles.length > i)
                
                    
                message.editReply({
                    embeds: [
                        musicEmbed()
                        .setDescription(`Select commands that you want to disable ⤵️`)
                    ],components: rows, ephemeral: true})

                
                /*db.findOne({ GuildID: guild.id }, (err, data) => {
                    if(err) return interaction.editReply(errorEmbed().setDescription("An error occured."))
                    if (data) {
                        if (data.CommandData.includes()) {
                            
                        }


                    } else {
                        return interaction.editReply({embeds : [errorEmbed().setDescription("This guild doesn't have any commands.")]})
                    }
                   

                    data.save().catch(err => {
                        return interaction.editReply({embeds :[errorEmbed().setDescription("An error occured.")]})
                    })
                })*/
                

                
                break;
            
            case "reload":

                if (message.member.id !== "206905331366756353") return message.editReply({ embed: [errorEmbed().setDescription("You don't have the permission to use this command **[BOT OWNER ONLY]**")], ephemeral: true });
        
                Commandfiles.forEach(file => {
                    delete require.cache[require.resolve(file)];
                    
                    const command = require(file);
                    console.log(`Reloaded ${file}`);

                    if(command.name) {
                        message.client.commands.set(command.name, command);
                    }
                });

                message.editReply({ embeds: [successEmbed().setDescription("All commands have been reloaded!")], ephemeral: true }); 
                
                break;
            
        }

    }

}