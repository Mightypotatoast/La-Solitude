
module.exports = {

    name: "testing",
    description: "Testing",
    permission: "ADMINISTRATOR",
    active: false,
    
    execute(message, client) {
    
        client.emit("guildMemberAdd", message.member)
        //client.emit("guildMemberRemove", message.member)
    
    }
}