const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {

    name: "avatar",
    type: "USER",
    permission: "ADMINISTRATOR",
    active:true,

    async execute(interaction) {
        
        const target = await interaction.guild.members.fetch(interaction.targetId);

        const userMessage = new MessageEmbed()
            .setAuthor(target.user.tag + "'s Avatar")
            .setImage(target.user.avatarURL({ dynamic: true }))
            .setTimestamp()
        
        interaction.reply({embeds : [userMessage], ephemeral : true})
        
    }
}