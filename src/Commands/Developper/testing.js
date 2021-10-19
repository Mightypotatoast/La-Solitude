
module.exports = {

    name: "testing",
    description: "Testing",
    permission: "ADMINISTRATOR",
    active: true,
    
    execute(message, client) {
    
        client.emit("guildMemberAdd", message.member)
        //client.emit("guildMemberRemove", message.member)
    
    }
}