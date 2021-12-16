
module.exports = {

    name: "testing",
    description: "Testing",
    permission: "ADMINISTRATOR",
    active: true,
    
    execute(message, client) {
        
        if (message.member.id !== "206905331366756353") return message.reply({ embed: [errorEmbed().setDescription("You need to be the owner of this server!")] });
        
        client.emit("guildMemberAdd", message.member)
        //client.emit("guildMemberRemove", message.member)
    
    }
}