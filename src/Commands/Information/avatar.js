const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {

    name: "avatar",
    type: "USER",
    permission: "ADMINISTRATOR",
    active:true,

    async execute(interaction) {
        
        const target = await interaction.guild.members.fetch(interaction.targetId);

        const userMessage = new MessageEmbed()
            .setAuthor("Avatar de " + target.user.tag, target.user.displayAvatarURL({ format: "png" }))
            .setImage(target.user.avatarURL({ dynamic: true, format: "png" }))
            .setTimestamp()
        
        interaction.reply({embeds : [userMessage], ephemeral : true})
        
    }
}