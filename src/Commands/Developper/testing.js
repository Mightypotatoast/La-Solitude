
module.exports = {

    name: "testing",
    description: "Testing",
    permission: "ADMINISTRATOR",
    active: true,
    
    execute(message, client) {
        
        if (message.member.id !== "206905331366756353") return message.reply({ embed: [errorEmbed().setDescription("Vous devez être le propriétaire du Bot pour utiliser cette commande !")] });
        
        client.emit("guildMemberAdd", message.member)
        //client.emit("guildMemberRemove", message.member)
    
    }
}